from __future__ import absolute_import, unicode_literals

# Ensures that app is imported when django starts. Used for celery
from .celery_conf import app as celery_app
__all__ = ['celery_app']
