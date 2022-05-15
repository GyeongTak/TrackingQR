from django.urls import path
from . import views

urlpatterns = [
    path('review-list/', views.customerReview,name='review-list'),


]