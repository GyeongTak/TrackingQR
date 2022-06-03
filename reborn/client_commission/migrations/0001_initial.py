# Generated by Django 4.0.4 on 2022-06-03 06:15

import client_commission.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Commission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('small_image', models.ImageField(null=True, upload_to=client_commission.models.path_and_rename_sumnail)),
                ('commission_image', models.FileField(null=True, upload_to=client_commission.models.path_and_rename_sumnail_panorama_image)),
                ('title', models.CharField(max_length=300)),
                ('description', models.TextField(null=True)),
                ('budget', models.IntegerField()),
                ('finish_date', models.IntegerField()),
                ('deadline', models.CharField(max_length=50)),
                ('current_status', models.IntegerField(blank=True, choices=[(0, 'Not Started'), (1, 'Not Started Not Selected'), (2, 'Proceeding'), (3, 'Finished')], default=0)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Commission',
            },
        ),
        migrations.CreateModel(
            name='RequestedDesigner',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(blank=True, max_length=300)),
                ('commission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='request_designer', to='client_commission.commission')),
            ],
        ),
    ]
