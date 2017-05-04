from celery import shared_task

from benjamin.registration.models import User


@shared_task(name='checklist.tasks.send_morning_reminder_emails')
def send_morning_reminder_emails():
    users = User.objects.all()
    [user.send_morning_reminder_email() for user in users]


@shared_task(name='checklist.tasks.send_evening_reminder_emails')
def send_evening_reminder_emails():
    users = User.objects.all()
    [user.send_evening_reminder_email() for user in users]
