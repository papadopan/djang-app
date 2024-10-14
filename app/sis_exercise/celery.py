from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sis_exercise.settings')

app = Celery('sis_exercise')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'run-this-task-every-day': {
        'task': 'sis_exercise.tasks.fetch_and_save_literature',
        # 'schedule': crontab(minute="*", hour='*/1'),  # Executes every minute just to validate results
        'schedule': crontab(minute=0, hour=0),  # Executes every day at midnight 
    },
}