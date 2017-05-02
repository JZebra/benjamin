from datetime import date
from django.test import TestCase

from benjamin.checklist.factories import VirtueEntryFactory, VirtueStarFactory, VirtueFactory
from benjamin.checklist.models import VirtueEntry, VirtueStar


class VirtueEntryTests(TestCase):

    def setUp(self):
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
        virtue_entry = VirtueEntry.objects.first()
        self.assertEqual(virtue_entry.value, 0)

    def test_create(self):
        VirtueEntryFactory.create()
        self.assertEqual(VirtueEntry.objects.count(), 2)


class VirtueStarTests(TestCase):

    def setUp(self):
        self.virtue_star = VirtueStarFactory.create(date=date.today())

    def test_update(self):
        """A virtue_star with the same virtue_id, user_id, and date
        as an existing virtue_star should update the existing row
        """
        new_virtue = VirtueFactory.create()
        VirtueStarFactory(
            date=self.virtue_star.date,
            user=self.virtue_star.user,
            virtue=new_virtue,
        )
        self.assertEqual(VirtueStar.objects.count(), 1)
        virtue_star = VirtueStar.objects.first()
        self.assertEqual(virtue_star.virtue_id, new_virtue.id)

    def test_create(self):
        VirtueStarFactory.create()
        self.assertEqual(VirtueStar.objects.count(), 2)
