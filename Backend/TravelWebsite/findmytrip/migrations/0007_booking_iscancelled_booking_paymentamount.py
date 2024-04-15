# Generated by Django 5.0.2 on 2024-04-15 01:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('findmytrip', '0006_package_created_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='isCancelled',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='booking',
            name='paymentamount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
