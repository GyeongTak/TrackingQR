from distutils.log import error
from inspect import cleandoc
from operator import attrgetter
from random import choices
from re import T
from click import pass_context
from django import forms
from .models import User
from argon2 import PasswordHasher, exceptions


class LoginForm(forms.Form) :
    user_id = forms.CharField(
        max_length=32,
        label ='아이디',
        required=True,
        widget = forms.TextInput(
            attrs={
                'class':'user_id',
                'placeholder' :'아이디를 입력하세요 ...'
            }
        ),
        error_messages={'required':'아이디를 입력해주세요'}
    )

    user_pw = forms.CharField(
        max_length=128,
        label ='비밀번호',
        required=True,
        widget = forms.PasswordInput(
            attrs={
                'class':'user_pw',
                'placeholder' :'비밀 번호를 입력하세요'
            }
        ),
        error_messages={'required':'비밀번호를 입력해주세요'}
    )
    field_order = [
        'user_id',
        'user_pw',
    ]

    def clean(self) :
        cleaned_data = super().clean()

        user_id = cleaned_data.get('user_id','')
        user_pw = cleaned_data.get('user_pw','')

        if user_id == '':
            return self.add_error('user_id','아이디를 다시 입력해 주세요.')
        elif user_pw == '':
            return self.add_error('user_pw','비밀번호를 다시 입력해 주세요.')
        else:
            try:
                user = User.objects.get(user_id = user_id)
            except User.DoesNotExist:
                return self.add_error('user_id','아이디가 존재하지 않습니다.')
            
            try :
                PasswordHasher().verify(user.user_pw,user_pw)
            except exceptions.VerifyMismatchError :
                return self.add_error('user_pw', '아이디나 비밀번호가 다릅니다.')

            self.login_session = user.user_id

class RegisterForm(forms.ModelForm) :
    user_id = forms.CharField(
        label = '아이디',
        required=True,
        widget=forms.TextInput(
            attrs = {
                'class' : 'join_id',
                'placeholder': '아이디'
            }
        ),
        error_messages={
            'required' : '아이디를 입력해주세요.',
            'unique' : '중복된 아이디입니다.'
        }
    )
    user_pw = forms.CharField(
        label = '비밀번호',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'class' : 'join_pw',
                'placeholder' : '비밀번호'
            }
        ),
        error_messages={'required':'비밀번호를 입력해주세요'}
    )
    user_pw_check = forms.CharField(
        label ='비밀번호 확인',
        required = True,
        widget=forms.PasswordInput(
            attrs={
                'class' : 'join_pw_check',
                'placeholder' : '비밀번호 확인'
            }
        ),
        error_messages={'required' : '비밀번호가 일치하지 않습니다. '}
    )

    user_name = forms.CharField(
        label='이름',
        required=True,
        widget=forms.TextInput(
            attrs={
                'class' : 'join_name',
                'placeholder' : '이름'
            }
        ),
        error_messages={'required': '이름을 입력해주세요' }
    )
    user_email = forms.EmailField(
        label='이메일',
        required=True,
        widget=forms.TextInput(
            attrs={
                'class' : 'join_email',
                'placeholder' : '이메일'
            }
        ),
        error_messages={'required': '이메일을 입력해주세요' }
    )


    choices = {
        '1':'designer',
        '2':'client'
    }
    user_role = forms.ChoiceField(
        label='역할',
        required=True,
        widget = forms.Select(),
        choices = ([('designer','디자이너'),('client','일반 고객')]),
        initial= '2',
        error_messages={'required': '역할을 선택해주세요' }
    )

    field_order = [
        'user_id',
        'user_pw',
        'user_pw_check',
        'user_role',
        'user_name',
        'user_email'
    ]

    class Meta:
        model = User
        fields = [
            'user_id',
            'user_pw',
            'user_name',
            'user_role',
            'user_email'
        ]
    
    def clean(self) :
        cleaned_data = super().clean()

        user_id = cleaned_data.get('user_id','')
        user_pw = cleaned_data.get('user_pw','')
        user_pw_check = cleaned_data.get('user_pw_check','')
        user_name = cleaned_data.get('user_name','')
        user_email = cleaned_data.get('user_email','')
        user_role = cleaned_data.get('user_role','')

        if user_pw != user_pw_check :
            return self.add_error('user_pw_check', '비밀번호가 다릅니다.')
        elif not (4<=len(user_id) <= 16) :
            return self.add_error('user_id','아이디는 4~16 자로 입력해주세요.')
        elif 8 > len(user_pw) :
            return self.add_error('user_pw','비밀번호는 8자 이상으로 입력해주세요.')
        else :
            self.user_id = user_id
            self.user_pw = user_pw
            self.user_pw_check = user_pw_check
            self.user_name = user_name
            self.user_email = user_email
            self.user_role = user_role