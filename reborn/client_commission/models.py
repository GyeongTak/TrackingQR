from distutils.command.upload import upload
import os
from django.db import models
from django.forms import JSONField
from tomlkit import datetime
from users.models import Client
from uuid import uuid4

datetime_format = ["%Y-%m-%d"]


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
    not_started_not_selected = 1 # 마감기한 종료 후 디자이너 셀렉트 단계
    proceeding = 2 # 진행중
    finished = 3 # 끝

class Commission(models.Model) :
    client = models.ForeignKey(Client,on_delete=models.CASCADE)
    designer_id = models.IntegerField(null = True, blank = True)

    small_image = models.ImageField(upload_to = path_and_rename ,null = True ) # 썸네일용 이미지
    commission_image = models.ImageField(upload_to=path_and_rename, null = True) # 파노라마 이미지\

    title = models.CharField(max_length=300)    #의뢰서 제목
    description = models.TextField(null=True)   #의뢰서 상세 내용

    budget = models.IntegerField(null=False,blank=False) # 예산
    finish_date = models.IntegerField(null=False, blank=False) # 작업 기한 ( 기준 : 일)
    deadline = models.CharField(max_length=50) #모집 마감 기한

    request_designer_id =models.CharField(max_length=100) # id , id , id 형식의 문자열
    request_count = models.IntegerField(default=0, null= False,blank=True) # 받은 제안 수
    
    Status = models.IntegerField(choices=CommissionStatus.choices, default = 0) # 현재 상태 
    messageFlag = models.BooleanField(default=0, blank= True)    

    updated = models.DateTimeField(auto_now = True)
    created = models.DateTimeField(auto_now_add = True)



    def __str__(self) :
        return self.title

    class Meta :
         verbose_name = 'Commission'

