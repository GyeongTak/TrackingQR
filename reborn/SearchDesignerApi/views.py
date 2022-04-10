from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from SearchDesignerApi.models import DesignerPopol
from .serializers import PopolSerializer

@api_view(['GET'])
def apiOverview(request) :
    api_urls = {
        'Popol-List' : '/popol-list/',
    }

    return Response(api_urls)

@api_view(['GET'])
def PopolList(request) :
    ListPopol = DesignerPopol.objects.all()
    serializer = PopolSerializer(ListPopol, many = True)
    return Response(serializer.data)



# Create your views here.


