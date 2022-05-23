from django.contrib import admin
from .models import Designer, Client, User
from rest_framework.authtoken.admin import TokenAdmin

# TokenAdmin.raw_id_fields = ['user']
class DesignerAdmin(admin.ModelAdmin):
    list_display = ['username', 'email','phone']
class ClientAdmin(admin.ModelAdmin):
    list_display = ['username', 'email','phone']
class UserAdmin(admin.ModelAdmin):
    list_display = ['username','is_client']

admin.site.register(Designer, DesignerAdmin)
admin.site.register(User,UserAdmin)
admin.site.register(Client, ClientAdmin)

# Register your models here.
