from django.contrib import admin

# Register your models here.
from .models import CodeSubmission

@admin.register(CodeSubmission)
class CodeSubmissionAdmin(admin.ModelAdmin):
    list_display = ('user', 'language', 'created_at')
    list_filter = ('language', 'created_at')
    search_fields = ['user__username', 'code']
    readonly_fields = ('created_at',)