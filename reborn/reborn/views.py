
from django.core.exceptions import ImproperlyConfigured
from html5lib import serialize
from rest_framework import viewsets, status

from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model, logout, login

from rest_framework.decorators import api_view

from users.models import Designer
from userReview.models import customerReview

from .serializers import designerSerializer as dS, reviewSerializer as rS


User = get_user_model()

@api_view(['GET'])
def index(request):
    designers =Designer.objects.all().reverse()[:5] #id 0~4 까지 입력
    designers_list = dS(designers, many= True)
    reviews = customerReview.objects.all().reverse()[:5]
    reviews_list = rS(reviews , many= True)

    return Response(

           {'designer' :designers_list.data,
           'reviews':reviews_list.data}
    )