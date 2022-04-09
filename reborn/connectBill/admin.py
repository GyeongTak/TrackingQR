from django.contrib import admin
from .models import User
from .models import Portfolio

@admin.register(User)
class UserAdmin(admin.ModelAdmin) :
    list_display = (
        'user_id',
        'user_pw',
        'user_name',
        'user_role',
        'user_email',
        'updated',
        'created'
    )

admin.site.register(Portfolio)