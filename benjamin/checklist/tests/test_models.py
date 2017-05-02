from datetime import date
from django.test import TestCase

from benjamin.checklist.factories import VirtueEntryFactory
from benjamin.checklist.models import VirtueEntry


class VirtueEntryTests(TestCase):

    def setUp(self):
        # self.user = UserFactory.create()
        # self.virtue_set = VirtueSetFactory.create(user=self.user)
        self.virtue_entry = VirtueEntryFactory.create(date=date.today(), value=1)

    def test_update(self):
        """A virtue_entry with the same virtue_id, user_id, and date
        as an existing virtue_entry should update the existing row
        """
        VirtueEntryFactory(
            date=self.virtue_entry.date,
            user=self.virtue_entry.user,
            virtue=self.virtue_entry.virtue,
            value=0
        )
        self.assertEqual(VirtueEntry.objects.count(), 1)
        self.assertEqual(self.virtue_entry.value, 1)

    def test_create(self):
        VirtueEntryFactory.create()
        self.assertEqual(VirtueEntry.objects.count(), 2)

