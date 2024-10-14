import requests
from celery import shared_task
from api.models import Literature
from api.serializers import LiteratureInspireSerializer
import logging

from celery.exceptions import MaxRetriesExceededError


@shared_task(bind=True, max_retries=5)
def fetch_and_save_literature(self):
    url = "https://inspirehep.net/api/literature"
    params = {
        "size": 40 , # Get the first 40 papers
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an error for bad responses

        literature_list = response.json()["hits"]["hits"]
    
        literature_metadata = [
            {
                "title": literature.get("metadata", {}).get("titles", [{}])[0].get("title"), # for the sake of the exercise, we are assuming that the first title is the main title
                "abstract": literature.get("metadata", {}).get("abstracts", [{}])[0].get("value"), # for the sake of the exercise, we are assuming that the first abstract is the main abstract
                "arxiv_id": literature.get("metadata", {}).get("arxiv_eprints", [{}])[0].get("value"), # for the sake of the exercise, we are assuming that the desired value is inside this object
                "publication_date": literature.get("metadata", {}).get("earliest_date"), # for the sake of the exercise, we are assuming that the `publication_date` is the `earliest_date` field
            }
            for literature in literature_list
        ]

        for item in literature_metadata:
            serializer = LiteratureInspireSerializer(data=item)
            if serializer.is_valid():
                serializer.save()
            else:
                print("Serialized errors", serializer.errors)

    except requests.exceptions.RequestException as exc:
        # Retry the task if there's an exception, with exponential backoff
        try:
            raise self.retry(exc=exc, countdown=2**self.request.retries)
        except MaxRetriesExceededError:
            # If max retries exceeded, handle the error (e.g., log it, notify someone)
            print(f"Max retries exceeded for task {self.name} with args: {self.args}")

        # for better visibility and error tracking we can log the errror
        # we can also add a monitoring system to track the errors   
        logger = logging.getLogger(__name__)
        logger.error(f"Error fetching and saving literature: {exc}")
        # Optionally log the error or take further action
        return {"error": "Failed to fetch data"}
