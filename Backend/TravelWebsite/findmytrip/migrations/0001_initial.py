# Generated by Django 5.0.1 on 2024-02-16 19:43

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('price', models.FloatField()),
                ('duration', models.IntegerField(help_text='Duration in days')),
                ('description', models.TextField()),
                ('image', models.ImageField(blank=True, upload_to='package_images')),
            ],
        ),
        migrations.CreateModel(
            name='Activities',
            fields=[
                ('package_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='findmytrip.package')),
                ('activity', models.CharField(max_length=100)),
                ('activity_image', models.ImageField(blank=True, upload_to='activity_images')),
            ],
            bases=('findmytrip.package',),
        ),
        migrations.CreateModel(
            name='Flights',
            fields=[
                ('package_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='findmytrip.package')),
                ('flight', models.CharField(max_length=100)),
                ('flight_image', models.ImageField(blank=True, upload_to='flight_images')),
            ],
            bases=('findmytrip.package',),
        ),
        migrations.CreateModel(
            name='Hotels',
            fields=[
                ('package_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='findmytrip.package')),
                ('hotel', models.CharField(max_length=100)),
                ('hotel_image', models.ImageField(blank=True, upload_to='hotel_images')),
            ],
            bases=('findmytrip.package',),
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=15)),
                ('date', models.DateField()),
                ('persons', models.IntegerField()),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='findmytrip.package')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('review', models.TextField()),
                ('rating', models.IntegerField()),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='findmytrip.package')),
            ],
        ),
    ]
