# Generated by Django 4.0.3 on 2022-04-10 06:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connectBill', '0003_alter_user_options_user_profile_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.ImageField(null=True, upload_to='connectBill'),
        ),
    ]
