from . import views

from django.urls import URLPattern, path
# from django.views.generic import TemplateView

urlpatterns = [
    path('create_review', views.create_review),
   
]

