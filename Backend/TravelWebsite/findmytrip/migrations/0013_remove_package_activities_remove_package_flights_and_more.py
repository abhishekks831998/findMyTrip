# Generated by Django 5.0.1 on 2024-03-28 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('findmytrip', '0012_remove_package_agent_package_description_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='package',
            name='activities',
        ),
        migrations.RemoveField(
            model_name='package',
            name='flights',
        ),
        migrations.RemoveField(
            model_name='package',
            name='hotels',
        ),
        migrations.AddField(
            model_name='package',
            name='activities',
            field=models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name='package',
            name='flights',
            field=models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name='package',
            name='hotels',
            field=models.JSONField(default=dict),
        ),
    ]