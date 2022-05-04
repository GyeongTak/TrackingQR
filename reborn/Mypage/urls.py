from django.urls import URLPattern, path
from . import views
# from django.views.generic import TemplateView

urlpatterns = [
    path('', views.profile, name = 'Profile'),
    path('', views.delete_portfolio, name = 'delete_portfolio'),
]
