# Generated by Django 4.0.4 on 2022-06-01 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0003_projects_small_image_alter_projects_portfolio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projects',
            name='description',
            field=models.TextField(),
        ),
    ]
