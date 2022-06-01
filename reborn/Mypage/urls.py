from django.urls import URLPattern, path
from . import views
# from django.views.generic import TemplateView

urlpatterns = [
    path('', views.profile, name = 'Profile'),
    path('getMyInfo', views.getMyInfo),

]
