"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# -*- coding: utf-8 -*-
from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.MainView.as_view(), name="index"),
    path('books/<int:pk>', views.BookDetailView.as_view(), name="book_detail"),
    path('login', views.CustomLoginView.as_view(), name="login"),
    path('logout', views.CustomLogoutView.as_view(), name="logout"),
    path('registration', views.CustomRegistrationView.as_view(), name="registration"),
    path('profile/<int:pk>', views.CustomProfileView.as_view(), name="profile"),
    path('users/edit/password/<int:pk>', views.CustomUserPasswordChangeView.as_view(), name='users_change_password'),
    path('cart', views.CartListView.as_view(), name="cart"),
    path('orders/add', views.OrderCreateView.as_view(), name="order_add"),
    path('purchase/add', views.PurchaseCreateView.as_view(), name="purchase_add"),
    path('purchase/success', views.PurchaseSuccessView.as_view(), name="purchase_success"),
    path('catalog', views.CatalogListView.as_view(), name="catalog_list"),
    path('genres/<int:pk>', views.GenreDetailView.as_view(), name="genre_detail"),
    path('orders/history', views.OrderHistoryListView.as_view(), name="order_history_list"),
    path('search', views.MainView.as_view(), name="search"),
    path('set_rating', views.SetRatingAPIView.as_view(), name="set_rating"),
    path('set_review', views.SetReviewAPIView.as_view(), name="set_review"),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
