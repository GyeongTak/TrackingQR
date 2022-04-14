from re import template
from django.urls import URLPattern, path
from . import views
# from django.views.generic import TemplateView

urlpatterns = [
    path('',views.apiOverview,name = 'apiOverview'),
    path('popol-list/',views.PopolList,name='popol-list'),
    # path('popol-search/<str:pk>', views.PopolSearch, name = 'popol-search'),
    path('popol-detail/<str:pk>', views.PopolDetail, name = 'popol-detail'),
    # path('portfolio/new', views.createPortfolio, name='createPortfolio'),
    # path('portfolio/edit', views.updatePortfolio, name='updatePortfolio'),
    # path('portfolio/delete/<int:id>', views.deletePortfolio, name='deletePortfolio'),
]
