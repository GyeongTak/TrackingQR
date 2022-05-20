from email.policy import default
from django.db import models

from django.db.models.signals import post_save


from django.contrib.auth.models import AbstractUser
from django.forms import IntegerField
from rest_framework.authtoken.models import Token

from client_commission.models import Commission


class User(AbstractUser) :
    is_Designer = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)


# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)

class Designer(User) :
    phone = models.CharField(max_length=100, blank=True)
    skills = models.CharField(max_length=100,blank=True)
    description = models.TextField(null=True, blank=True)
    prccessing_commission_id = models.IntegerField()

    USERNAME_FIELD: User.username


    def __str__(self) :
        return self.username
    
    class Meta :
        verbose_name = 'Designer'
    # def __unicode__(self):


class Client(User) :
    company_name=models.CharField(max_length=100, blank= True)
    phone = models.CharField(max_length=100, blank=True)
    description =models.TextField(null= True, blank=True)
    commission_id= models.IntegerField( null = True)

    USERNAME_FIELD: User.username


    def __str__(self):
        return self.username 

    class Meta :
        verbose_name = 'Client'
    # def __unicode__(self):
    #     return self.user.username+"Client"   

# Create your models here.
