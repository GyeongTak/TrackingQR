from asyncio.windows_events import NULL
from distutils.command.upload import upload
import os
from django.db import models
from uuid import uuid4
from users.models import Designer

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


class Projects(models.Model) :
    title = models.CharField(max_length=100 , null = False)
    description = models.TextField(max_length=500 , blank= True, null = False)
    participation_date = models.IntegerField()
    client =models.CharField(max_length=100, null = True)
    image = models.ImageField(height_field=None, width_field=None, max_length=100, upload_to=path_and_rename)

class DesignerPopol(models.Model) :
    designer = models.OneToOneField(Designer, on_delete=models.CASCADE)
    projects = models.ForeignKey(Projects,null = True, on_delete = models.SET_NULL)
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)

    def __str__(self) :
        return self.title

    class Meta :
         verbose_name = 'Portfolio'




# Create your models here.
