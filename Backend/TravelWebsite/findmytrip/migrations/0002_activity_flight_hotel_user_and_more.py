# Generated by Django 5.0.1 on 2024-04-07 00:26

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('findmytrip', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
            options={
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='Flight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flight_number', models.CharField(max_length=100)),
                ('airline', models.CharField(max_length=100)),
            ],
            options={
                'ordering': ['flight_number'],
            },
        ),
        migrations.CreateModel(
            name='Hotel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=255)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('is_staff', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['id'],
            },
        ),
        migrations.RemoveField(
            model_name='flights',
            name='package_ptr',
        ),
        migrations.RemoveField(
            model_name='hotels',
            name='package_ptr',
        ),
        migrations.RemoveField(
            model_name='review',
            name='package',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='date',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='email',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='name',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='persons',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='phone',
        ),
        migrations.RemoveField(
            model_name='package',
            name='duration',
        ),
        migrations.RemoveField(
            model_name='package',
            name='location',
        ),
        migrations.RemoveField(
            model_name='package',
            name='price',
        ),
        migrations.AddField(
            model_name='booking',
            name='booked_on',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='booking',
            name='guest_info',
            field=models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name='booking',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bookings', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='package',
            name='duration_in_days',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='package',
            name='description',
            field=models.TextField(default='', max_length=300),
        ),
        migrations.AlterField(
            model_name='package',
            name='image',
            field=models.ImageField(blank=True, default='media/default_image.jpg', upload_to='media'),
        ),
        migrations.AddField(
            model_name='package',
            name='activities',
            field=models.ManyToManyField(to='findmytrip.activity'),
        ),
        migrations.AddField(
            model_name='package',
            name='flights',
            field=models.ManyToManyField(to='findmytrip.flight'),
        ),
        migrations.AddField(
            model_name='package',
            name='hotels',
            field=models.ManyToManyField(to='findmytrip.hotel'),
        ),
        migrations.DeleteModel(
            name='Activities',
        ),
        migrations.DeleteModel(
            name='Flights',
        ),
        migrations.DeleteModel(
            name='Hotels',
        ),
        migrations.DeleteModel(
            name='Review',
        ),
    ]
