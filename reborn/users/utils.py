from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Designer,Client

def get_and_authenticate_user(username, password):
    user = authenticate(username=username, password=password)
    if user is None:
        raise serializers.ValidationError("Invalid username/password. Please try again!")
    return user


def create_designer_account(username , email, password,password2 ,**extra_fields):
    if password != password2 :
        raise serializers.ValidationError("password does not match")
    user = Designer.objects.create_user(
        username = username ,email=email, password=password,  **extra_fields)
    return user

def create_client_account(username , email, password,password2, **extra_fields):
    if password != password2 :
        raise serializers.ValidationError("password does not match")
    user = Client.objects.create_user(
        username = username ,email=email, password=password,  **extra_fields)
    return user