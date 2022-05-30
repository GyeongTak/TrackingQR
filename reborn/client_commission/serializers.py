from xml.dom import ValidationErr
from attr import field
from numpy import source
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from users.models import *
from .models import *
from django.forms import ValidationError

class EmptySerializer(serializers.Serializer):
    pass

class CommissionSerializer(serializers.ModelSerializer):

    class Meta:
         model = Commission
         fields = ('title','finish_date','budget','description','small_image','commission_image')
        #  read_only_fields = ('id', 'is_client')
    
    # def get_panorama_image(self,obj):
    def validate_title(self, value):
        if value=='' or len(value)> 30 :
            raise ValidationError('Not Validate title')
        return value        
    def validate_images(self,value):
        if len(value) == 0 or len(value) > 30 :
            raise ValidationError('Not Validate images')
        return value

class CommissionViewSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.username')
    client_company_name = serializers.CharField(source='client.company_name')
    class Meta :
        model = Commission
        fields = ('title','deadline','budget','finish_date','small_image','client_company_name','client_name','request_count')

    




    # def get_brief_description(self, obj) :
    #     return obj.description[:50] 
        # description 을 50 글자만 표시할 수 있도록 바꾼다.