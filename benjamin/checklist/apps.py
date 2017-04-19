from django.apps import AppConfig


class ChecklistConfig(AppConfig):
    name = 'benjamin.checklist'

    def ready(self):
        import benjamin.checklist.signals # noqa
