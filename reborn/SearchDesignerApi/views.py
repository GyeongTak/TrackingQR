from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from SearchDesignerApi.models import DesignerPopol
from .serializers import PopolSerializer, PopolTestSerializer
from rest_framework import status



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


# #Parsers in Django REST are used to parse the content of incoming HTTP request.
# #보낼때는 serializer
# @api_view(['POST'])
# def createPortfolio(request): 
#     try:
#         user = User.objects.get(user_id=request.data['userid'])
#     except:
#         return Response({'result':'fail', 'message': '존재하지 않는 사용자입니다.'}, status=status.HTTP_404_NOT_FOUND)

#     newPortfolio = DesignerPopol(user=user, title=request.data['title'], description=request.data['description'], portfolio_image=request.data['image'])
#     serializer = PopolTestSerializer(data=request.data) #request.data = querydict
   
#     if serializer.is_valid():
#         newPortfolio.save()
#     else:
#         print(serializer.errors)
#         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

#     return Response({'result':'success', 'message': '성공적으로 등록되었습니다.'}, status=status.HTTP_201_CREATED) #json?


# @api_view(['POST'])
# def updatePortfolio(request): 
#     try:
#         user = User.objects.get(user_id=request.data['userid'])
#     except:
#         return Response({'result':'fail', 'message': '존재하지 않는 사용자입니다.'}, status=status.HTTP_404_NOT_FOUND)

#     try:
#         portfolio = DesignerPopol.objects.get(id=request.data['id'])
#     except:
#         return Response({'result':'fail', 'message': '존재하지 않는 게시글 입니다.'}, status=status.HTTP_404_NOT_FOUND)

#     portfolio.title = request.data['title']
#     portfolio.description = request.data['description']
#     portfolio.image = request.data['image']
#     serializer = PopolTestSerializer(data=request.data) #request.data = querydict
    
#     if serializer.is_valid():
#         portfolio.save()
#     else:
#         print(serializer.errors)
#         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

#     return Response({'result':'success', 'message': '성공적으로 수정되었습니다.'}, status=status.HTTP_201_CREATED) 

# #parameter로 
# @api_view(['DELETE'])
# def deletePortfolio(request, id): 

#     try:
#         portfolio = DesignerPopol.objects.get(id=id)
#     except:
#         return Response({'result':'fail', 'message': '존재하지 않는 게시글입니다.'}, status=status.HTTP_404_NOT_FOUND)

#     print(portfolio.delete())

#     return Response({'result':'success', 'message': '성공적으로 등록되었습니다.'}, status=status.HTTP_200_OK) 
