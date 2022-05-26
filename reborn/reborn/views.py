
from django.core.exceptions import ImproperlyConfigured
from html5lib import serialize
from django.db.models import  Count
from rest_framework import viewsets, status

from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model, logout, login

from rest_framework.decorators import api_view
from portfolio.models import Projects

from users.models import Designer
from portfolio.models import DesignerPopol
from userReview.models import customerReview

from .serializers import designerSerializer as dS, reviewSerializer as rS


User = get_user_model()

@api_view(['GET'])
def index(request):
      tmpportfolio = DesignerPopol.objects.all()
      tmpportfolio = tmpportfolio.reverse()[:5]
      portfolio_list = dS(tmpportfolio , many= True)

      reviews = customerReview.objects.all().reverse()[:5]
      reviews_list = rS(reviews , many= True)

      return Response(
         {
         'designer' :portfolio_list.data,
         
         'reviews':reviews_list.data,
         
         }
      )