from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import CodeSubmissionSerializer
from django.shortcuts import render
from django.http import JsonResponse
import subprocess
import tempfile
import os

# Create your views here.
class CodeAnalysisView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        code = request.data.get("code")
        language = request.data.get("language")
        
        if language != "python":
            return JsonResponse({"Only Python Supported"}, status=400)
        
        if not code:
            return JsonResponse({'error': 'Code is required'}, status=400)
        
        try:
            # Create Temporary File
            with tempfile.NamedTemporaryFile(suffix=".py", delete=False) as temp_file:
                temp_file.write(code.encode("utf-8"))
                temp_file_path = temp_file.name
             
            # Run pylint    
            result = subprocess.run(
                ['pylint', temp_file_path, "--output-format=json"],
                capture_output=True,
                text=True
            )
            
            # Remove temporary file
            os.unlink(temp_file_path)
            
            # Parse pylint output
            import json
            pylint_output = json.loads(result.stdout) if result.stdout else []
            analysis_results = [
                {
                    'line': issue['line'],
                    'message': issue['message'],
                    'type': issue['type'],
                    'symbol': issue['symbol']
                }
                for issue in pylint_output
            ]
            
            return JsonResponse({'results': analysis_results}, status=200)
        
        except Exception as e:
            return JsonResponse({"error" : str(e)}, status=500)
    

class CodeSubmissionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CodeSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)