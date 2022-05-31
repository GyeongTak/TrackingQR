from django.urls import URLPattern, path
from . import views
# from django.views.generic import TemplateView

urlpatterns = [
    path('', views.profile, name = 'Profile'),
    path('getMyInfo', views.getMyInfo),
    path('detail-portfolio/<str:pk>/',views.detail_my_portfolio, name = 'detail-portfolio'),
    path('delete-portfolio/', views.delete_portfolio, name = 'delete_portfolio'),
    path('delete_commission/<int:pk>', views.delete_my_commission),
    path('detail_commission/<int:pk>/',views.detail_my_commission),
    path('designer_selected_for_commission',views.designer_selected_for_commission),

]
