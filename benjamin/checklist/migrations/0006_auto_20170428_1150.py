# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-28 18:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('checklist', '0005_virtuestar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='virtueentry',
            name='date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='virtuestar',
            name='date',
            field=models.DateField(),
        ),
    ]
