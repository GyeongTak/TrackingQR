from re import template
from django.urls import URLPattern, path
from . import views
# from django.views.generic import TemplateView

urlpatterns = [
    path('',views.apiOverview,name = 'apiOverview'),
    path('popol-list/',views.PopolList,name='popol-list'),
    path('portfolio/new', views.createPortfolio, name='createPortfolio'),
    path('portfolio/edit', views.updatePortfolio, name='updatePortfolio'),
    path('portfolio/delete/<int:id>', views.deletePortfolio, name='deletePortfolio'),
]
