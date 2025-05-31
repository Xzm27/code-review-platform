from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class CodeSubmission(models.Model):
    "Model class for code submission by user"
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.TextField()
    language = models.CharField(
        max_length=50,
        choices=[('python', 'Python'), ('cpp', 'C++')],
        default='python'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.language}"

    class Meta:
        ordering = ['-created_at']