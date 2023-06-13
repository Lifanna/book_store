from typing import Any, Dict
from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib import messages
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from . import models

from . import forms


class MainView(ListView):
    model = models.Book
    queryset = models.Book.objects.all()
    template_name = 'main/index.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['recent'] = self.model.objects.all().order_by('-id')[:15]

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

        # context['recent'] = self.model.objects.all().order_by('-id')[:15]

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


