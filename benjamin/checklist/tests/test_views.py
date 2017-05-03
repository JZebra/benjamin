from datetime import date
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from benjamin.registration.factories import UserFactory
from benjamin.checklist.factories import VirtueEntryFactory, VirtueSetFactory


class VirtueSetViewSetTest(APITestCase):

    def setUp(self):
        self.user = UserFactory.create(
            email='testuser@benjamin.com',
            first_name='Benjamin',
            last_name='Franklin',
        )

        self.user.set_password('test_password')
        self.user.save()
        self.client.login(username=self.user.email, password='test_password')

    def test_get_virtue_sets_for_user(self):
        VirtueSetFactory.create(user=self.user)
        VirtueSetFactory.create(user=self.user)
        # create a virtue_set that does not belong to self.user
        VirtueSetFactory.create()

        url = reverse('virtue_set-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)


class VirtueEntryViewSetTest(APITestCase):

    def setUp(self):
        self.user = UserFactory.create(
            email='testuser@benjamin.com',
            first_name='Benjamin',
            last_name='Franklin',
        )

        self.user.set_password('test_password')
        self.user.save()
        self.client.login(username=self.user.email, password='test_password')

    def test_get_virtue_entries_in_date_range(self):
        in_date = date(2017, 1, 15)
        out_date = date(2017, 4, 4)
        start_date = '2017-01-10'
        end_date = '2017-1-20'
        VirtueEntryFactory.create(user=self.user, date=in_date, value=0)
        VirtueEntryFactory.create(user=self.user, date=out_date, value=1)

        url = reverse('virtue_entry-list')
        response = self.client.get(url, {'startDate': start_date, 'endDate': end_date})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0].get('value'), 0)
