# Generated by Django 5.0.4 on 2024-04-09 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('findmytrip', '0003_activity_activity_price_flight_flight_price_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='activity_price',
            field=models.PositiveIntegerField(default=100),
        ),
        migrations.AlterField(
            model_name='flight',
            name='flight_price',
            field=models.PositiveIntegerField(default=100),
        ),
        migrations.AlterField(
            model_name='hotel',
            name='hotel_price',
            field=models.PositiveIntegerField(default=100),
        ),
    ]