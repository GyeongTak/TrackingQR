from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics , status

from .models import customerReview
from .serializer import BriefReviewSerializer

@api_view(['GET']) 
def customerReviewList(request) :
    reviews = customerReview.objects.all()
    serializer =BriefReviewSerializer(reviews, many = True)
    return Response(serializer.data)

    