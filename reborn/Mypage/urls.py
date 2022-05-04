from django.urls import URLPattern, path
from . import views
# from django.views.generic import TemplateView

urlpatterns = [
    path('', views.profile, name = 'Profile'),
    path('detail-portfolio/<str:pk>/',views.detail_my_portfolio, name = 'detail-portfolio'),
    path('delete-portfolio/', views.delete_portfolio, name = 'delete_portfolio'),
]
