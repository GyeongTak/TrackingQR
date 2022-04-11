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

def createPortfolio(request): # request multipart/form-data
    #{ userid : 회원 아이디, title: 게시글 제목, description: 게시글 내용, image: 이미지파일 }
    try:
        user = User.objects.get(user_id=request.data.id) # 에러처리
    except:
        return Response({'result':'fail', 'message': '존재하지 않는 사용자입니다.'}, status=status.HTTP_404_NOT_FOUND)
    newPorfolio = DesignerPopol(portfolio_image=request.data.image, title=request.data.title, description=request.data.description)
    newPorfolio.user = user
    newPorfolio.save()

    return Response({'result':'success', 'message': '성공적으로 등록되었습니다.'}, status=HTTP_201_CREATED)
:

