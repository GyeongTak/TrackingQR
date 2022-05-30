from email.policy import default
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Designer,Client

default_profile_image =  '/profile_image/user_default_image.png'

def get_and_authenticate_user(username, password):
    user = authenticate(username=username, password=password)
    if user is None:
        raise serializers.ValidationError("Invalid username/password. Please try again!")
    return user


def create_designer_account(username , email, password,password2 ,skills , phone , **extra_fields):
    if password != password2 :
        raise serializers.ValidationError("password does not match")
    user = Designer.objects.create_user(
        username = username ,email=email,profile_image= default_profile_image, password=password,  skills = skills, phone = phone, **extra_fields)
    return user

def create_client_account(username , email, password,password2, company_name , phone,**extra_fields):
    if password != password2 :
        raise serializers.ValidationError("password does not match")
    user = Client.objects.create_user(
        username = username ,email=email, profile_image= default_profile_image,password=password, phone = phone , company_name = company_name,  **extra_fields)
    return user