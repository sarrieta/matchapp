from django.apps import AppConfig


class MatchappConfig(AppConfig):
    name = 'matchapp'

    def ready(self):
        import matchapp.signals.signals