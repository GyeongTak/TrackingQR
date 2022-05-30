# Generated by Django 4.0.4 on 2022-05-29 12:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client_commission', '0003_alter_commission_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='commission',
            name='Status',
        ),
        migrations.AddField(
            model_name='commission',
            name='current_status',
            field=models.IntegerField(blank=True, choices=[(0, 'Not Started'), (1, 'Not Started Not Selected'), (2, 'Proceeding'), (3, 'Finished')], default=0),
        ),
    ]
