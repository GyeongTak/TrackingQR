from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('signup/designer/', views.DesignerSignupView.as_view()),
    path('signup/client/', views.ClientSignupView.as_view()),
    path('login', views.CustomAuthToken.as_view(), name = 'auth-token'),
    path('logout', views.LogoutView.as_view(), name = 'logout-view'),
    path('designer/dashboard/', views.DesignerOnlyView.as_view(), name = 'Designer-dashboard'),
    path('client/dashboard/', views.ClientOnlyView.as_view(), name = 'client-dashboard'),

]
