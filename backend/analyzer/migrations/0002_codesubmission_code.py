# Generated by Django 5.2.1 on 2025-05-31 20:22

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analyzer', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='codesubmission',
            name='code',
            field=models.TextField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
