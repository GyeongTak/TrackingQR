from asyncio.windows_events import NULL
import os
from django.db import models
from uuid import uuid4
from client_commission.models import Commission
from users.models import Designer, Client

def path_and_rename(instance, filename):
    upload_to = 'userReview/customerReview_Image'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)

class customerReview(models.Model) :
    title = models.CharField(max_length=200 )
    image = models.ImageField( height_field=None, width_field=None, max_length=100, upload_to=path_and_rename)
    client_id = models.IntegerField()
    designer_id = models.IntegerField()
    description = models.TextField(null =True)
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now = True)


    def __str__(self) :
        return self.title

    class Meta :
         verbose_name = 'customerReview'
