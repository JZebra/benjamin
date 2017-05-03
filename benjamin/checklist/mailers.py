from django.core.mail import send_mail

send_mail(
    subject='',
    message='',
    from_email='',
    recipient_list='',
    fail_silently=False,
    auth_user=None,
    auth_password=None,
    connection=None,
    html_message=None
)
