from typing import Any, Dict
from django import forms
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from main import models
from django.contrib.auth.password_validation import validate_password
import os
from uuid import uuid4
from django.core.files import File
import json
from django.core.serializers import serialize


class CustomUserRegistrationForm(UserCreationForm):
    def save(self, commit=True):
        user = super(CustomUserRegistrationForm, self).save(commit=False)
        
        user.set_password(self.cleaned_data["password1"])
        user.username = self.cleaned_data["username"]
        user.email = self.cleaned_data["username"]
        if commit:
            user.save()

        return user

    class Meta:
        model = models.CustomUser
        fields = '__all__'
        exclude = ('date_joined', 'email', 'password',)


class CustomUserProfileForm(forms.ModelForm):
    def save(self, commit=True):
        user = super(CustomUserProfileForm, self).save(commit=False)

        if commit:
            user.save()

        return user

    class Meta:
        model = models.CustomUser
        fields = ('first_name', 'last_name', 'username',)


class CustomUserPasswordChangeForm(forms.ModelForm):
    id = forms.CharField(widget=forms.HiddenInput())
    password1 = forms.CharField(label="Пароль", widget=forms.PasswordInput())
    password2 = forms.CharField(label="Повторите пароль", widget=forms.PasswordInput())

    def clean(self):
        password1 = self.cleaned_data['password1']
        password2 = self.cleaned_data['password2']

        if password1 != password2:
            raise forms.ValidationError({"password1": "Пароли должны совпадать!"})

        return super().clean()

    def save(self, commit=False):
        id = self.cleaned_data['id']
        password1 = self.cleaned_data['password1']

        models.CustomUser.objects.change_password(id, password1)

        return super(CustomUserPasswordChangeForm, self).save(commit=False)

    class Meta:
        model = models.CustomUser
        fields = ('id', 'password',)


class PurchaseCreateForm(forms.ModelForm):
    card_number = forms.CharField(label="Номер карты", widget=forms.TextInput(attrs={'data-mask':"0000-0000-0000-0000"}))

    card_expiration_date = forms.CharField(label="Срок действия", widget=forms.TextInput(attrs={'data-mask':"00/00"}))

    def clean(self):
        self.cleaned_data['card_number'] = self.cleaned_data['card_number'].replace('-', '')

        return super(PurchaseCreateForm, self).clean()

    def save(self, commit=True):
        instance = super(PurchaseCreateForm, self).save(commit=False)
        self.cleaned_data['card_number'] = self.cleaned_data['card_number'].replace('-', '')

        orders = models.Order.objects.filter(user__id=self.cleaned_data['user'], is_done=False)
        instance.orders = {'orders': list(orders.values_list('id', flat=True))}
        instance.user = models.CustomUser.objects.get(pk=self.cleaned_data['user'])

        instance.save()

        for order in orders:
            order.is_done = True
            order.save()

        return instance

    class Meta:
        model = models.Purchase
        fields = ('card_number', 'card_type', 'card_expiration_date', 'delivery',)
