from email.policy import default
from pyexpat import model
from ssl import create_default_context
from django.db import models

from django.db.models.signals import post_save
from django.core.validators import MinValueValidator, MaxValueValidator


from django.contrib.auth.models import AbstractUser
from django.forms import IntegerField
from rest_framework.authtoken.models import Token



class User(AbstractUser) :
    is_Designer = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    profile_image = models.ImageField(null=True)


# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)

class Designer(User) :
    phone = models.CharField(max_length=100, blank=True)
    skills = models.CharField(max_length=100,blank=True)
    description = models.TextField(null=True, blank=True)
    prccessing_commission_id = models.IntegerField(null= True)
    average_stars = models.FloatField(default = 0)

    USERNAME_FIELD: User.username


    def __str__(self) :
        return self.username
    
    class Meta :
        verbose_name = 'Designer'
    # def __unicode__(self):

class Message(models.Model) :
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add = True)


class DesignerReview(models.Model) :
    review = models.TextField(max_length=200)
    designer = models.ForeignKey(Designer,on_delete=models.CASCADE)
    score = models.IntegerField(default = 0,validators=[MinValueValidator(0), MaxValueValidator(5)],blank=True)


class Client(User) :
    company_name=models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    description =models.TextField(null= True)


    USERNAME_FIELD: User.username


    def __str__(self):
        return self.username 

    class Meta :
        verbose_name = 'Client'
    # def __unicode__(self):
    #     return self.user.username+"Client"   

# Create your models here.
