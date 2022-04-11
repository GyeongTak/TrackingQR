from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from connectBill.models import User
from SearchDesignerApi.models import DesignerPopol
from .serializers import PopolSerializer

@api_view(['GET'])
def apiOverview(request) : #무슨 용도?????
    api_urls = {
        'Popol-List' : '/popol-list/',
    }

    return Response(api_urls)

@api_view(['GET']) #Other methods will respond with "405 Method Not Allowed" method 여러개 일때는 if로 분기
def PopolList(request) :
    ListPopol = DesignerPopol.objects.all()
    serializer = PopolSerializer(ListPopol, many = True)
    return Response(serializer.data)

def createPortfolio(request):
    #{ userid : 회원 아이디 }
    user = User
    newPorfolio = DesignerPopol(portfolio_image=, , title=, description=)
    newPorfolio.user = 
