import os
from django.db import models
from users.models import Client
from uuid import uuid4

def path_and_rename(instance, filename):
    upload_to = 'client_committion/committion_image'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)

class CommissionStatus(models.IntegerChoices):
    not_started  = 0
    proceeding = 1 # 진행중
    finished = 2 # 끝

class Commission(models.Model) :
    client = models.ForeignKey(Client,on_delete=models.CASCADE)
    designer_id = models.IntegerField(null = True)

    commission_image = models.ImageField(upload_to=path_and_rename, null = True)
    title = models.CharField(max_length=300)
    description = models.TextField(null=True, blank=True)

    budget = models.IntegerField(null=False,blank=False) # 예산
    finish_date = models.IntegerField(null=False, blank=False) # 작업 기한 ( 기준 : 일)
    request_count = models.IntegerField(default=0, null= False,blank=False) # 받은 제안 수
    
    Status = models.IntegerField(choices=CommissionStatus.choices, default = 0)
         

    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)

    def __str__(self) :
        return self.title

    class Meta :
         verbose_name = 'Commission'

