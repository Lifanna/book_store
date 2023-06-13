from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models


# admin.site.register(models.CustomUser)
@admin.register(models.CustomUser)
class CustomUserAdmin(UserAdmin):
    """Регистрация модели CustomUser в админ панели"""
    list_display = ('__str__', 'email')
    list_filter = ('email', 'first_name', 'last_name',)
    search_fields = ('email', 'first_name', 'last_name',)
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('password',)}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email',)}),
        ('Permissions', {
            'fields': ('is_active', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        ("User Details", {'fields': ('email', 'password1', 'password2')}),
    )


admin.site.register(models.Genre)
admin.site.register(models.Author)
admin.site.register(models.Book)
admin.site.register(models.Order)
admin.site.register(models.Purchase)
