## api/urls.py

from django.urls import path, include

urlpatterns = [
    path('request_commission', include('swagger.urls')),
    path('summernote/', include('django_summernote.urls')),
]