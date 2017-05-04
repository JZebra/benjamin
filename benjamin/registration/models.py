from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

from benjamin.checklist.mailers import create_morning_reminder_email, create_evening_reminder_email


class BenjaminUserManager(UserManager):

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = models.CharField(unique=False, default="", max_length=255)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = BenjaminUserManager()

    def send_morning_reminder_email(self):
        email = create_morning_reminder_email(self.email)
        email.send()

    def send_evening_reminder_email(self):
        email = create_evening_reminder_email(self.email)
        email.send()
