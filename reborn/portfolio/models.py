from array import ArrayType
from asyncio.windows_events import NULL
from distutils.command.upload import upload
from multiprocessing.dummy import Array
import os
from django.db import models
from uuid import uuid4
from django.core.validators import MinValueValidator, MaxValueValidator

from torch import DictType
from users.models import Designer

from ckeditor.fields import RichTextField

def path_and_rename(instance, filename):

    upload_to = 'SearchDesignerApi/Designer_Portfolio_Image'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)



class DesignerPopol(models.Model) :
    designer = models.OneToOneField(Designer, on_delete=models.CASCADE)
    description = models.TextField(max_length=300 , blank = True) #About me

    class Meta :
         verbose_name = 'Portfolio'

class Certificate(models.Model) : 
    portfolio = models.ForeignKey(DesignerPopol,on_delete=models.CASCADE)
    acquired_date = models.CharField(max_length=40)
    certificate_name = models.CharField(max_length=40)
    time = models.IntegerField()

class EducationAndCareer(models.Model) :
    portfolio = models.ForeignKey(DesignerPopol, on_delete=models.CASCADE)
    working_period = models.CharField(max_length=40)
    company_name = models.CharField(max_length=50)
    description = models.CharField(max_length=50)


class Projects(models.Model) :
    title = models.CharField(max_length=100 , null = False)
    description = RichTextField()
    participation_date = models.IntegerField()
    portfolio = models.ForeignKey(DesignerPopol,blank= True, on_delete = models.CASCADE, related_name='portfolio')
    client =models.CharField(max_length=100, null = True,blank=True)
    # image = models.ImageField(height_field=None, width_field=None, max_length=100, upload_to=path_and_rename)
    score = models.IntegerField(default = 0,validators=[MinValueValidator(0), MaxValueValidator(5)],blank=True)



# Create your models here.
