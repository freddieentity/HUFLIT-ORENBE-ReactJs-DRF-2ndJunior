# Generated by Django 3.2 on 2021-05-23 04:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotels', '0005_hotelamenity'),
    ]

    operations = [
        migrations.CreateModel(
            name='RoomAmenity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('Facilities', 'Fac'), ('Amenities', 'Amn'), ('Others', 'Others')], default='Others', max_length=100, null=True)),
                ('name', models.CharField(max_length=100, null=True)),
            ],
        ),
    ]