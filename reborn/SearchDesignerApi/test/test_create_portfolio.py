from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient, APIRequestFactory
from connectBill.models import User
from django.core.files.base import File
import os
class DesignerPortfolioTestCase(APITestCase):

    def setUp(self):
        user = User.objects.create(user_id = 'test_user', user_pw = 'testuserpassword', user_name = 'testuser', user_role = 'client',user_email = 'testuser@test.com')
        self.test_url = "http://127.0.0.1:8000/sda/api/portfolio/new"
        self.client = APIClient()

    def test_if_data_post_done(self):
        # prepare data
        testimage = open(os.path.join(os.path.dirname(__file__), 'test.png'))
        document = File(testimage)
        data = {
            'userid': 'test_user',
            'title': 'test제목',
            'description':'게시글 내용',
            'image': document,
        }
        # make request
        response = self.client.post(reverse('createPortfolio'), data=data, format='multipart')

        # check status response
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
