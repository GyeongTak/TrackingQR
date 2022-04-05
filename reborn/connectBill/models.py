from django.db import models

class User(models.Model) :
    CHOICES = (
		('admin', 'admin_member'),
        ('designer', 'designer_member'),
        ('client', 'client'),
    )
    user_id = models.CharField(max_length=100, unique=True, verbose_name = '유저 아이디')
    user_pw = models.CharField(max_length=128, verbose_name='유저 비밀번호')
    user_name = models.CharField(max_length=16 , unique =True, verbose_name = '유저 이름')
    user_role = models.CharField(max_length =8 , choices=CHOICES)
    user_email = models.EmailField(max_length=128, unique = True, verbose_name ='유저 이메일')
    updated = models.DateTimeField(auto_now= True) #정보 수정 시간 
    created = models.DateTimeField(auto_now_add=True) #생성 시간
    

    def __str__(self):
        return self.user_name

    class Meta :
        db_table = 'User'
        verbose_name = '유저'
        verbose_name_plural = '유저'

# Create your models here.
