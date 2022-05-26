# Generated by Django 4.0.4 on 2022-05-26 14:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('portfolio', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='designerpopol',
            name='designer',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='users.designer'),
        ),
        migrations.AddField(
            model_name='certificate',
            name='portfolio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portfolio.designerpopol'),
        ),
    ]
