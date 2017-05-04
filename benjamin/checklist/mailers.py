from django.core.mail import EmailMessage
from django.template import Context, Template

from datetime import date

from benjamin.checklist.constants import EMAIL_DATE_FORMAT


def create_morning_reminder_email(to_email):
    subject = "Good morning! Time to be virtuous!"
    body = Template('Hello World! Today is {{ today }}')
    body_context = Context({
        'today': date.today().strftime(EMAIL_DATE_FORMAT)
    })

    email = EmailMessage(
        subject=subject,
        body=body.render(body_context),
        from_email='benjamin@benjamin.com',
        to=[to_email],
    )

    return email


def create_evening_reminder_email(to_email):
    subject = "How virtuous were you today?"
    body = "Sign in to track your virtues"

    email = EmailMessage(
        subject=subject,
        body=body,
        from_email='benjamin@benjamin.com',
        to=[to_email],
    )

    return email
