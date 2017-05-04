from django.test import TestCase
from unittest.mock import patch, call

from benjamin.registration.factories import UserFactory
# from benjamin.checklist.mailers import create_morning_reminder_email, create_evening_reminder_email


class UserModelTest(TestCase):

    def setUp(self):
        self.user = UserFactory.create()

    @patch('benjamin.registration.models.create_morning_reminder_email')
    def test_send_morning_reminder_email(self, mock_create_morning_reminder_email):
        self.user.send_morning_reminder_email()
        mock_create_morning_reminder_email.assert_called_with(self.user.email)
        self.assertIn(call().send(), mock_create_morning_reminder_email.mock_calls)
