# Generated by Django 4.0.4 on 2022-05-26 14:02

import client_commission.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Commission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('designer_id', models.IntegerField(blank=True, null=True)),
                ('small_image', models.ImageField(null=True, upload_to=client_commission.models.path_and_rename)),
                ('commission_image', models.ImageField(null=True, upload_to=client_commission.models.path_and_rename)),
                ('title', models.CharField(max_length=300)),
                ('description', models.TextField(blank=True, null=True)),
                ('budget', models.IntegerField()),
                ('finish_date', models.IntegerField()),
                ('deadline', models.CharField(max_length=50)),
                ('request_designer_id', models.CharField(max_length=100)),
                ('request_count', models.IntegerField(default=0)),
                ('Status', models.IntegerField(choices=[(0, 'Not Started'), (1, 'Not Started Not Selected'), (2, 'Proceeding'), (3, 'Finished')], default=0)),
                ('messageFlag', models.BooleanField(default=0)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Commission',
            },
        ),
    ]
