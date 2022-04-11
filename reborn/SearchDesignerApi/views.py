from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from connectBill.models import User
from SearchDesignerApi.models import DesignerPopol
from .serializers import PopolSerializer
from rest_framework import status

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

@api_view(['POST'])
def createPortfolio(request): # request multipart/form-data
    try:
        user = User.objects.get(user_id=request.data.id) 
    except:
        return Response({'result':'fail', 'message': '존재하지 않는 사용자입니다.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = PopolSerializer(data=request.data)
    if serializer.is_valid():
        newPorfolio = DesignerPopol(portfolio_image=request.data.image, title=request.data.title, description=request.data.description)
        newPorfolio.user = user
        newPorfolio.save()
    else:
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

    

    return Response({'result':'success', 'message': '성공적으로 등록되었습니다.'}, status=HTTP_201_CREATED)

#validation 필요
