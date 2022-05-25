from dataclasses import field
from msilib.schema import Class
from pydoc import describe
from django.forms import ValidationError
from nbformat import read
from rest_framework import serializers
from users.models import User,Designer,Client
from userReview.models import customerReview
from portfolio.models import DesignerPopol

class designerSerializer(serializers.ModelSerializer):
    class Meta : 
        model = Designer
        fields = ['profile_image','username', 'average_stars']




class reviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='client.username')
    userProfileImage = serializers.ImageField(source = 'client.profile_image')
    companyName = serializers.CharField(source= 'client.company_name')
    class Meta :
        model = customerReview
        fields = ['small_image','client','username','userProfileImage','companyName','score']
