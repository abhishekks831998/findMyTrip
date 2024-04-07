# Generated by Django 5.0.2 on 2024-04-03 04:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('findmytrip', '0008_remove_booking_activity_info_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='package',
            name='agent',
        ),
        migrations.AddField(
            model_name='package',
            name='description',
            field=models.TextField(default='', max_length=300),
        ),
        migrations.AddField(
            model_name='package',
            name='image',
            field=models.ImageField(blank=True, default='media/default_image.jpg', upload_to=''),
        ),
    ]