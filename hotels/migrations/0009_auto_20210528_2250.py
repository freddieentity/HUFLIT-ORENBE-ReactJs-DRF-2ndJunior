# Generated by Django 3.2 on 2021-05-28 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotels', '0008_booking'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='checkin',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='booking',
            name='checkout',
            field=models.DateField(),
        ),
    ]