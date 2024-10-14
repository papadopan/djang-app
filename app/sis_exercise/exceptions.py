from rest_framework.exceptions import APIException
from rest_framework import status

class APIViewError(APIException):
    """
    Custom exception class for API views, inheriting from DRF's APIException.
    This allows for structured error responses and custom status codes.
    """
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR  # Default status code

    def __init__(self, message="An error occurred.", status_code=None):
        if status_code is not None:
            self.status_code = status_code
        self.detail = {"message": message}  # Custom error message format
        super().__init__(self.detail)