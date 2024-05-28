# Generated by Django 5.0.4 on 2024-05-24 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0006_alter_event_recurrence_frequency'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='recurrence_frequency',
            field=models.CharField(blank=True, choices=[('NONE', 'none'), ('DAILY', 'daily'), ('WEEKLY', 'weekly'), ('BIWEEKLY', 'biweekly'), ('MONTHLY', 'monthly'), ('QUARTERLY', 'quarterly'), ('YEARLY', 'yearly')], max_length=10, null=True),
        ),
    ]