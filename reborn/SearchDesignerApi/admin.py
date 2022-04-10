from django.contrib import admin
from .models import DesignerPopol

@admin.register(DesignerPopol)
class UserAdmin(admin.ModelAdmin) :
    list_display = (
        'portfolio_image',
        'user',
        'title',
        'description',
        'updated',
        'created'
    )
# Register your models here.
