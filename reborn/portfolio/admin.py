from django.contrib import admin
from .models import Certificate, DesignerPopol, EducationAndCareer

class EducationAndCareerPopolAdmin(admin.ModelAdmin):
    #fields = ['title']
    list_display = ('portfolio',  'company_name')
class CertificatesPopolAdmin(admin.ModelAdmin):
    #fields = ['title']
    list_display = ('portfolio',  'certificate_name')

admin.site.register(DesignerPopol)
admin.site.register(Certificate,CertificatesPopolAdmin)
admin.site.register(EducationAndCareer ,EducationAndCareerPopolAdmin)

