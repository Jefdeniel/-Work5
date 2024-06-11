# Generated by Django 5.0.4 on 2024-06-11 16:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0011_calendar_users_calendarpermissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Prompt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prompt', models.TextField(max_length=255)),
            ],
            options={
                'db_table': 'prompts',
                'db_table_comment': 'Stores information about the prompts.',
            },
        ),
        migrations.AddField(
            model_name='notification',
            name='calendar',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='calendar_app.calendar'),
        ),
    ]
