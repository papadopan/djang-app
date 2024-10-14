import pytest
from unittest.mock import patch, MagicMock
from rest_framework import status
from django.urls import reverse

from sis_exercise.exceptions import APIViewError


@pytest.mark.django_db  # This will use the test database
class TestElasticSearchAPIView:
    @pytest.fixture(autouse=True)
    def setup(self, client):
        self.client = client
        self.url = reverse('api-search')

    @patch('api.documents.LiteratureDocument.search')
    def test_invalid_search_query(self, mock_search):
        """Test invalid search query."""
        
        # Execute a GET request with an invalid (empty) query
        response = self.client.get(self.url, {"query": "", "limit": 10, "offset": 0})
        
        # Assert the response code and message
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert "message" in response.data
        assert "may not be blank" in response.data["message"]  

    @patch('api.documents.LiteratureDocument.search')
    def test_internal_server_error(self, mock_search):
        """Test handling of unexpected exceptions."""
        
        # Setup mock to raise an unexpected exception
        mock_search.side_effect = Exception("Something went wrong")

        response = self.client.get(self.url, {"query": "Test", "limit": 10, "offset": 0})

        assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
        assert "Error during fetching data:" in response.data

    @patch('api.documents.LiteratureDocument.search')
    def test_empty_valid_search_query(self, mock_search):
        """Test returning empty results if there is nothing to fetch from ElasticSearch."""
    
        # Setup mock to return an empty list of hits
        mock_search.return_value.query.return_value.execute.return_value.hits = []

        response = self.client.get(self.url, {"query": "Test", "limit": 10, "offset": 0})

        assert response.status_code == status.HTTP_200_OK
        assert response.data["results"] == []


    @patch('api.documents.LiteratureDocument.search')
    @patch('sis_exercise.openai.generate_summary_text')
    def test_get_search_results(self, mock_generate_summary, mock_search):
        """Test valid search query and summary generation."""
        from api.documents import LiteratureDocument
        from api.serializers import LiteratureSerializer
        # Create sample data to return from Elasticsearch
        literature_data = [
            LiteratureDocument(index='literature', id='1', title="Test Title 1", abstract="Abstract 1"),
            LiteratureDocument(index='literature', id='2', title="Test Title 2", abstract="Abstract 2"),
        ]
        
        # Mock the search response from Elasticsearch
        mock_search_instance = MagicMock()
        mock_search.return_value = mock_search_instance
        mock_search_instance.query.return_value = mock_search_instance
        mock_search_instance.__getitem__.return_value = mock_search_instance

        # Mock the execute method to return hits
        mock_search_instance.execute.return_value.hits = literature_data
        
        # Prepare serialized data
        serializer = LiteratureSerializer(literature_data, many=True)
        
        # Mock the summary generation
        mock_generate_summary.return_value = "Generated Summary"

        # Execute a GET request with a valid query
        response = self.client.get(self.url, {"query": "Test", "limit": 10, "offset": 0})

        # Assert the response code and data 
        assert response.status_code == status.HTTP_200_OK
        assert "results" in response.data
        assert len(response.data["results"]) == len(serializer.data)  # Check length

