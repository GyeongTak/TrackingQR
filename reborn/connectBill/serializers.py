from rest_framework import serializers
from .models import Portfolio

class PortfolioSerializer(serializers.ModelSerializer) : 
    class Meta :
        model = Portfolio #Portfolio 모델 사용
        fields = '__all__' #모든 필드 포함