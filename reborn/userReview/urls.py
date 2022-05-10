from re import template
from django.urls import URLPattern, path
from . import views
urlpatterns = [
    path('',views.customerReviewList, name='review-list'),
]