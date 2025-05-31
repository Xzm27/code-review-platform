from rest_framework import serializers
from ..models import CodeSubmission

class CodeSubmissionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = CodeSubmission
        fields = ['id', 'user', 'code', 'language', 'created_at']
        read_only_fields = ['user', 'created_at']