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

# @api_view(['GET'])
# def PopolSearch(request,pk) :
#     print(pk)
#     if self.request.
#         SearchResult = DesignerPopol.objects.all().filter(title__contains= pk)
#     serializer = PopolSerializer(SearchResult, many = True)
#     return Response(serializer.data)

@api_view(['GET'])
def PopolDetail(request,pk) :
    Popol = DesignerPopol.objects.get(id =pk)
    serializer = PopolSerializer(Popol, many = False)
    return Response(serializer.data)




# Create your views here.


