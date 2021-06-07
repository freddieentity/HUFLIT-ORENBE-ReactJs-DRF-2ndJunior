from django.contrib import admin
from .models import UserAccount


class UserAccountAdmin(admin.ModelAdmin):
    search_fields = ('name', 'email')
    list_per_page = 25

admin.site.register(UserAccount, UserAccountAdmin)
