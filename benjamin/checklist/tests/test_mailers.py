from django.test import TestCase

from benjamin.checklist.mailers import create_morning_reminder_email, create_evening_reminder_email


class ChecklistMailerTest(TestCase):

    def test_create_morning_reminder_email(self):
        to_email = "test@test.com"
        email = create_morning_reminder_email(to_email)
        self.assertEqual(email.subject, "Good morning! Time to be virtuous!")

    def test_create_evening_reminder_email(self):
        to_email = "test@test.com"
        email = create_evening_reminder_email(to_email)
        self.assertEqual(email.subject, "How virtuous were you today?")
