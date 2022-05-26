from dataclasses import field
from msilib.schema import Class
from pydoc import describe
from django.forms import ValidationError
from nbformat import read
from numpy import average, source
from rest_framework import serializers
from users.models import User,Designer,Client
from userReview.models import customerReview
from portfolio.models import DesignerPopol

class designerSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(source='designer.profile_image')
    username = serializers.CharField(source='designer.username')
    average_stars = serializers.IntegerField(source='designer.average_stars')
    the_number_of_projects = serializers.IntegerField(source='designer.projects')
    class Meta : 
        model = DesignerPopol
        fields = ['profile_image','designer','username', 'average_stars','projects__count']




class reviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='client.username')
    userProfileImage = serializers.ImageField(source = 'client.profile_image')
    companyName = serializers.CharField(source= 'client.company_name')
    class Meta :
        model = customerReview
        fields = ['small_image','client','username','userProfileImage','companyName','score']
