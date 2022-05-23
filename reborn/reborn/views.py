
from django.core.exceptions import ImproperlyConfigured
from rest_framework import viewsets, status
from django.core import serializers

from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model, logout, login

from rest_framework.decorators import api_view

from users.models import Designer
from userReview.models import customerReview
User = get_user_model()

@api_view(['GET'])
def index(request):
    designers =Designer.objects.all().reverse()[:5] #id 0~4 까지 입력
    designers_list = serializers.serialize('json',designers)
    reviews = customerReview.objects.all().reverse()[:5]
    reviews_list = serializers.serialize('json',reviews)

    return Response(
        {
            "designers" : designers_list,
            "reviews" : reviews_list
        
        }, content_type="text/json-comment-filtered"
    )