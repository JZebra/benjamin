from django.core import mail
from django.test import TestCase

from benjamin.registration.factories import UserFactory
from benjamin.checklist.tasks import send_morning_reminder_emails, send_evening_reminder_emails


class RemindersTests(TestCase):

    def setUp(self):
        self.active_user_one = UserFactory()
        self.active_user_two = UserFactory()

    def test_send_morning_reminders_to_correct_users(self):
        send_morning_reminder_emails()
        self.assertEquals(len(mail.outbox), 2)

    def test_send_evening_reminders_to_correct_users(self):
        send_evening_reminder_emails()
        self.assertEquals(len(mail.outbox), 2)
