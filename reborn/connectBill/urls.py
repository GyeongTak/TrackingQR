from unicodedata import name
from django.urls import URLPattern, path
from . import views
from connectBill.views import PortfolioListAPI

urlpatterns = [
    path('',views.home, name="home"),
    path('login/',views.loginPage, name='login'),
    path('register/',views.register, name ='register'),
    path('logout/',views.logout, name = 'logout'),
    path('portfolios/', PortfolioListAPI.as_view(), name = 'portfolios'),
]
