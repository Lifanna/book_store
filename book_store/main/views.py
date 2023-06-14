from typing import Any, Dict
from django.db.models.query import QuerySet
from django.forms.models import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView, TemplateView
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib import messages
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from . import models
from . import forms
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Avg


class MainView(ListView):
    model = models.Book
    queryset = models.Book.objects.all()
    template_name = 'main/index.html'

    def get_queryset(self):
        q = self.request.GET.get("q")
        queryset = super().get_queryset()

        if q != None:
            queryset = models.Book.objects.filter(name__icontains=q)

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['recent'] = self.model.objects.all().order_by('-id')[:15]

        return context


class CatalogListView(ListView):
    model = models.Genre
    queryset = models.Genre.objects.all()
    template_name = 'main/catalog.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # context['recent'] = self.model.objects.all().order_by('-id')[:15]

        return context


class CartListView(ListView):
    model = models.Book
    queryset = models.Book.objects.all()
    template_name = 'main/cart.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class BookDetailView(DetailView):
    model = models.Book
    template_name = 'main/detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if self.request.user.is_authenticated:
            context['book_rated'] = models.BookRating.objects.filter(book__id=self.kwargs.get('pk'), user=self.request.user).exists()
        else:
            context['book_rated'] = False
        return context


class CustomLoginView(LoginView):
    redirect_authenticated_user = True
    template_name='account/login.html'

    def get_success_url(self):
        return reverse_lazy('index')
    
    def form_invalid(self, form):
        messages.error(self.request,'Неправильный логин или пароль')
        return self.render_to_response(self.get_context_data(form=form))


class CustomLogoutView(LogoutView):
    next_page = reverse_lazy('login')


class CustomRegistrationView(CreateView):
    template_name = "account/registration.html"
    model = models.CustomUser
    form_class = forms.CustomUserRegistrationForm

    def get_success_url(self):
        return reverse_lazy('index')


class CustomProfileView(UpdateView):
    template_name = "account/profile.html"
    model = models.CustomUser
    form_class = forms.CustomUserProfileForm

    def get_success_url(self):
        return reverse_lazy('index')


class CustomUserPasswordChangeView(LoginRequiredMixin, UpdateView):
    template_name = "account/change_password.html"
    model = models.CustomUser
    form_class = forms.CustomUserPasswordChangeForm

    def get_success_url(self):
        return reverse_lazy('index')

    def get_form(self, *args, **kwargs):
        form = super(CustomUserPasswordChangeView, self).get_form(*args, **kwargs)
        form.fields['password'].required = False

        return form


class OrderCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        success = 'created'
        order = request.data.get('order')
        print(order, self.request.user.pk)

        statusCode = status.HTTP_200_OK

        if request.user.is_authenticated == False:
            return Response({'success': 'unauthorized'}, status=statusCode)

        for bookItem in order:
            order = models.Order(
                user = request.user,
                book = models.Book.objects.get(pk=bookItem.get("bookId")),
                quantity = bookItem.get("quantity"),
                totalPrice = bookItem.get("totalPrice"),
            )

            order.save()

        statusCode = status.HTTP_201_CREATED

        return Response({'success': success}, status=statusCode)


class PurchaseCreateView(CreateView):
    model = models.Purchase
    form_class = forms.PurchaseCreateForm
    template_name = 'main/purchase.html'

    def get_success_url(self):
        return reverse_lazy('purchase_success')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # context['orders'] = models.Order.objects.filter(user=self.request.user)

        return context

    def form_valid(self, form):
        form.cleaned_data['user'] = self.request.user.id

        return super().form_valid(form)


class PurchaseSuccessView(TemplateView):
    template_name = 'main/purchase_success.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        return context


class GenreDetailView(ListView):
    model = models.Book
    template_name = 'main/genre_detail.html'

    def get_queryset(self):
        queryset = models.Book.objects.filter(genre=self.kwargs.get('pk'))

        return queryset


class OrderHistoryListView(ListView):
    model = models.Order
    template_name = 'main/order_history.html'

    def get_queryset(self):
        queryset = models.Order.objects.filter(user=self.request.user)

        return queryset


class SetRatingAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        book_id = request.data.get('book')
        rating = request.data.get('rating')

        statusCode = status.HTTP_200_OK

        if request.user.is_authenticated == False:
            return Response({'success': 'unauthorized'}, status=statusCode)
        
        book = models.Book.objects.get(pk=book_id)

        book_rating = models.BookRating(
            user = request.user,
            book = book,
            rating = rating,
        )

        book_rating.save()

        existing_book_rating = models.BookRating.objects.filter(book=book)

        if existing_book_rating.exists():
            rating = existing_book_rating.aggregate(Avg('rating')).get('rating__avg')

        book.rating = rating
        book.save()

        statusCode = status.HTTP_201_CREATED

        return Response({'new_rating': round(rating, 1)}, status=statusCode)
