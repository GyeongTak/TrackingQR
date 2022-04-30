from asyncio.windows_events import NULL
import os
from django.db import models
from uuid import uuid4
from usersApi.models import Designer

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
    user = models.OneToOneField(Designer, related_name="Designer", default = NULL ,on_delete=models.CASCADE)
    portfolio_image = models.ImageField(upload_to=path_and_rename, null = True)
    title = models.CharField(max_length=300)
    description = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)

    def __str__(self) :
        return self.title

    class Meta :
         db_table = 'Portfolio'
         verbose_name = '포트폴리오'





# Create your models here.
