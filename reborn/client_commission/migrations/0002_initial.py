# Generated by Django 4.0.4 on 2022-05-25 09:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('client_commission', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='commission',
            name='client',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.client'),
        ),
    ]
