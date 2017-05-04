from __future__ import absolute_import, unicode_literals
import os

from celery import Celery

# set the default Django settings for celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'benjamin.settings')

app = Celery('benjamin')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.timezone = 'America/Los_Angeles'

# Django will autodiscover tasks defined in a tasks.py
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'send_morning_reminder_emails': {
        'task': 'checklist.tasks.send_morning_reminder_emails',
        'schedule': 1.0
    },
    'send_evening_reminder_emails': {
        'task': 'checklist.tasks.send_evening_reminder_emails',
        'schedule': 1.0
    }
}
