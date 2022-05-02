from dataclasses import field
from pydoc import describe
from django.forms import ValidationError
from nbformat import read
from rest_framework import serializers


from . models import DesignerPopol
from usersApi.models import User,Designer

class PopolSerializer(serializers.ModelSerializer):
    class Meta :
        model = DesignerPopol
        fields = '__all__'

    def validate_title(self, value):
        if value=='':
            raise ValidationError('제목은 필수 항목입니다.')
        return value

class BriefPopolSerializer(serializers.ModelSerializer):
    class Meta : 
        model = DesignerPopol
        fields = ['portfolio_image','title','created','user','id']



class ProfileSerializer(serializers.ModelSerializer) :
    #popols = serializers.RelatedField(many=True,read_only=True)
    designer = serializers.StringRelatedField(many=False,read_only=True)
    employer  = serializers.StringRelatedField(many=False,read_only=True)
    class Meta:
        model = User
        fields = ['username','email','designer','employer']


# class PopolTestSerializer(serializers.ModelSerializer):
#     class Meta :
#         model = DesignerPopol
#         # exclude = ('user', )
