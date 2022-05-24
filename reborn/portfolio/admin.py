from django.contrib import admin
from .models import DesignerPopol, Projects

# class DesignerPopolAdmin(admin.ModelAdmin):
#     #fields = ['title']
#     list_display = ('title',  'created')

admin.site.register(DesignerPopol)
admin.site.register(Projects)

