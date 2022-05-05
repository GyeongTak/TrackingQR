from django.contrib import admin
from .models import User ,Designer, Client
from rest_framework.authtoken.admin import TokenAdmin

TokenAdmin.raw_id_fields = ['user']
class DesignerAdmin(admin.ModelAdmin):
    list_display = ['user']
class ClientAdmin(admin.ModelAdmin):
    list_display = ['user']

admin.site.register(Designer, DesignerAdmin)

admin.site.register(User)
admin.site.register(Client, ClientAdmin)
# Register your models here.
