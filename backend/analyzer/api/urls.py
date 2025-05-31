from django.urls import path
from .views import CodeSubmissionView

urlpatterns = [
    path("submit-code/", CodeSubmissionView.as_view(), name='submit_code')
]