from django.urls import path
from .views import CodeSubmissionView, CodeAnalysisView

urlpatterns = [
    path("submit-code/", CodeSubmissionView.as_view(), name='submit_code'),
    path('analyze/', CodeAnalysisView.as_view(), name='analyze'),
]