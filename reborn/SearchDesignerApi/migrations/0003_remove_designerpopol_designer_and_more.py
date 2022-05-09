# Generated by Django 4.0.4 on 2022-05-09 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SearchDesignerApi', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='designerpopol',
            name='designer',
        ),
        migrations.AddField(
            model_name='designerpopol',
            name='designer_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='designerpopol',
            name='designer_name',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
