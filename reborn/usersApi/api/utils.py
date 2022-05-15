import jwt

from django.http import JsonResponse

from usersApi.models import User
from reborn.settings import JWT_AUTH


def get_secret_key(model):
    return model.secret

