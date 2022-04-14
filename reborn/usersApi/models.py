import re
from django.db import models
from SearchDesignerApi.models import DesignerPopol

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token


class User(AbstractUser) :
    is_Designer = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)

    def __str__(self):
        return self.username

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Designer(models.Model) :
    user = models.OneToOneField(User, related_name="Designer", on_delete=models.CASCADE)
    phone = models.CharField(max_length=100, blank=True)
    skills = models.CharField(max_length=100,blank=True)
    description = models.TextField(null=True, blank=True)
    portfolio = models.OneToOneField(DesignerPopol, related_name="DesignerPortfolio", on_delete=models.CASCADE, null=True)

    def __str__(self) :
        return self.user.username

class Client(models.Model) :
    user = models.OneToOneField(User, related_name="employer", on_delete =models.CASCADE)
    company_name=models.CharField(max_length=100, blank= True)
    description =models.TextField(null= True, blank=True)

    def __str__(self):
        return self.company_name

# Create your models here.
