from django.contrib import admin
from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('signup/designer', views.DesignerSignupView.as_view()),
    path('signup/client', views.ClientSignupView.as_view()),
    path('login', views.CustomAuthToken.as_view(), name = 'auth-token'),
    path('logout', csrf_exempt(views.LogoutView.as_view()), name = 'logout'),
    # path('designer/dashboard', views.DesignerOnlyView.as_view(), name = 'Designer-dashboard'),
    # path('client/dashboard', views.ClientOnlyView.as_view(), name = 'client-dashboard'),


]
