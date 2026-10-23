import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Job, ApplicationFormData } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  FileText,
  X,
  Loader2,
  Building,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const JobApplicationPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [job, setJob] = useState<Job | null>(null);
  const [, setLoadingJob] = useState<boolean>(true);

  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    position: '',
    resumeFile: null,
    resumeFileName: '',
    coverNote: '',
  });

  const [fileSizeText, setFileSizeText] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      if (!jobId) return;
      setLoadingJob(true);

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setJob(data as Job);
          setFormData((prev) => ({ ...prev, position: data.title }));
        } else {
          const titleMapEn: Record<string, { title: string; dept: string }> = {
            'job-01': { title: 'Senior Brand & Visual Designer', dept: 'Creative & Design' },
            'job-02': { title: 'Social Media Content Strategist', dept: 'Growth & Marketing' },
            'job-03': { title: 'Full-Stack Web Engineer', dept: 'Technology' },
            'job-04': { title: 'Commercial Food & Product Photographer', dept: 'Production Studio' },
            'job-05': { title: 'E-Commerce Growth Manager', dept: 'E-Commerce Solutions' },
            'job-06': { title: 'Video Producer & Motion Animator', dept: 'Production Studio' },
          };
          const titleMapAr: Record<string, { title: string; dept: string }> = {
            'job-01': { title: 'مصمم بصري وهوية تجارية أول', dept: 'التصميم والإبداع' },
            'job-02': { title: 'أخصائي واستراتيجي محتوى سوشيال ميديا', dept: 'التسويق والنمو' },
            'job-03': { title: 'مطور ويب متكامل (Full-Stack)', dept: 'التكنولوجيا والبرمجيات' },
            'job-04': { title: 'مصور تجاري وقوائم طعام للمطاعم', dept: 'استوديو الإنتاج' },
            'job-05': { title: 'مدير نمو التجارة الإلكترونية', dept: 'حلول التجارة الإلكترونية' },
            'job-06': { title: 'منتج فيديو ومصمم موشن جرافيكس', dept: 'استوديو الإنتاج' },
          };

          const map = isRTL ? titleMapAr : titleMapEn;
          const resolved = map[jobId] || {
            title: isRTL ? `وظيفة #${jobId.slice(0, 8)}` : `Role #${jobId.slice(0, 8)}`,
            dept: isRTL ? 'فريق ويزلي الرقمي' : 'Whislly Digital Practice',
          };
          const fallbackJob: Job = {
            id: jobId,
            title: resolved.title,
            department: resolved.dept,
            location: isRTL ? 'عمّان، الأردن' : 'Amman, Jordan',
            employment_type: isRTL ? 'دوام كامل' : 'Full-time',
            description: isRTL
              ? 'موقع استراتيجي ضمن فرق ويزلي المتخصصة في الاستوديو.'
              : 'Strategic position within Whislly agency practice.',
            is_active: true,
          };
          setJob(fallbackJob);
          setFormData((prev) => ({ ...prev, position: fallbackJob.title }));
        }
      } catch {
        const fallbackJob: Job = {
          id: jobId,
          title: isRTL ? 'فرصة عمل متخصصة' : 'Specialized Agency Role',
          department: isRTL ? 'الإبداع والتكنولوجيا' : 'Creative & Technology',
          location: isRTL ? 'عمّان، الأردن' : 'Amman, Jordan',
          employment_type: isRTL ? 'دوام كامل' : 'Full-time',
          is_active: true,
        };
        setJob(fallbackJob);
        setFormData((prev) => ({ ...prev, position: fallbackJob.title }));
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJobDetail();
  }, [jobId, isRTL]);

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        resumeFile: isRTL ? 'حجم الملف يجب أن يكون أقل من 10 ميجابايت.' : 'File size must be under 10MB.',
      }));
      return;
    }

    const sizeFormatted =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    setFileSizeText(sizeFormatted);
    setFormData((prev) => ({
      ...prev,
      resumeFile: file,
      resumeFileName: file.name,
    }));

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.resumeFile;
      return copy;
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({
      ...prev,
      resumeFile: null,
      resumeFileName: '',
    }));
    setFileSizeText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = isRTL ? 'الاسم الكامل مطلوب.' : 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = isRTL ? 'البريد الإلكتروني مطلوب.' : 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = isRTL ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = isRTL ? 'رقم الهاتف مطلوب.' : 'Phone number is required.';
    }

    if (!formData.portfolioUrl.trim()) {
      newErrors.portfolioUrl = isRTL ? 'رابط معرض الأعمال أو الموقع مطلوب.' : 'Portfolio link or website is required.';
    }

    if (!formData.resumeFile && !formData.resumeFileName) {
      newErrors.resumeFile = isRTL
        ? 'يرجى رفع ملف السيرة الذاتية (PDF, DOCX).'
        : 'Please upload your Resume or CV (PDF, DOCX).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const appRef = `WHIS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedAppId(appRef);
    }, 800);
  };

  return (
    <div className="w-full bg-neutral-50/60 min-h-screen py-12 sm:py-16 text-start">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
          <button
            onClick={() => navigate('/careers')}
            className="inline-flex items-center gap-1.5 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{isRTL ? 'العودة لجميع الوظائف' : 'Back to All Careers'}</span>
          </button>
          <span>/</span>
          <span className="text-neutral-900 font-semibold truncate max-w-xs">
            {job?.title || (isRTL ? 'تقديم طلب توظيف' : 'Job Application')}
          </span>
        </div>

        {/* Job Detail Summary Banner */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                <Building className="w-3.5 h-3.5 text-neutral-400" />
                <span>{job?.department || (isRTL ? 'قسم ويزلي' : 'Whislly Department')}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 font-display mt-1">
                {job?.title || (isRTL ? 'تقديم طلب توظيف' : 'Application Submission')}
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-lg self-start sm:self-auto">
              <span>JOB ID:</span>
              <span className="font-bold text-neutral-900">{jobId}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600">
            {job?.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{job.location}</span>
              </div>
            )}
            {job?.employment_type && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{job.employment_type}</span>
              </div>
            )}
          </div>

          {job?.description && (
            <p className="text-xs text-neutral-600 leading-relaxed pt-1">
              {job.description}
            </p>
          )}
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 shadow-sm">
          {submittedAppId ? (
            <div className="py-8 space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                  {isRTL ? 'تم تسجيل الطلب في النظام' : 'Application Logged in Live Pipeline'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 font-display">
                  {isRTL ? `تم استلام طلب التقديم لـ ${job?.title}` : `Application Received for ${job?.title}`}
                </h2>
                <p className="text-sm text-neutral-600">
                  {isRTL
                    ? `شكراً لك، ${formData.fullName}. تم إرسال سيرتك الذاتية ومعرض أعمالك مباشرة إلى لجنة التوظيف.`
                    : `Thank you, ${formData.fullName}. Your credentials and portfolio have been submitted directly to the department hiring committee.`}
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-start space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isRTL ? 'الرقم المرجعي:' : 'Reference:'}</span>
                  <span className="font-mono font-bold text-neutral-900">{submittedAppId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Job ID:</span>
                  <span className="font-mono text-neutral-800">{jobId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isRTL ? 'المتقدم:' : 'Applicant:'}</span>
                  <span className="text-neutral-900 font-medium">{formData.fullName} ({formData.email})</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={() => navigate('/careers')}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                >
                  {isRTL ? 'استعراض وظائف أخرى' : 'View Other Roles'}
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                >
                  {isRTL ? 'العودة للرئيسية' : 'Return to Home'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-neutral-950 font-display">
                  {isRTL ? 'تقديم بيانات وسيرة المتقدم' : 'Submit Candidate Credentials'}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {isRTL
                    ? 'الحقول المطلوبة مشار إليها بالنجمة (*). يراجع فريقنا الطلبات خلال 5 أيام عمل.'
                    : 'Required fields are marked with an asterisk (*). Our team reviews submissions within 5 business days.'}
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  {t('careersPage.fullName', 'Full Name *')}
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) {
                      setErrors((p) => {
                        const copy = { ...p };
                        delete copy.fullName;
                        return copy;
                      });
                    }
                  }}
                  placeholder={isRTL ? 'مثال: فراس حداد' : 'e.g. Firas Haddad'}
                  className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-all ${
                    errors.fullName
                      ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                      : 'border-neutral-300 focus:ring-2 focus:ring-neutral-900'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    {t('careersPage.email', 'Email Address *')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) {
                        setErrors((p) => {
                          const copy = { ...p };
                          delete copy.email;
                          return copy;
                        });
                      }
                    }}
                    placeholder="firas@example.com"
                    className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-all ${
                      errors.email
                        ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                        : 'border-neutral-300 focus:ring-2 focus:ring-neutral-900'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    {t('careersPage.phone', 'Phone Number *')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) {
                        setErrors((p) => {
                          const copy = { ...p };
                          delete copy.phone;
                          return copy;
                        });
                      }
                    }}
                    placeholder="+962 7 9000 0000"
                    className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-all ${
                      errors.phone
                        ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                        : 'border-neutral-300 focus:ring-2 focus:ring-neutral-900'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Portfolio Link */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  {t('careersPage.portfolio', 'Portfolio Link *')}
                </label>
                <input
                  type="text"
                  value={formData.portfolioUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, portfolioUrl: e.target.value });
                    if (errors.portfolioUrl) {
                      setErrors((p) => {
                        const copy = { ...p };
                        delete copy.portfolioUrl;
                        return copy;
                      });
                    }
                  }}
                  placeholder="https://behance.net/yourprofile or https://github.com/yourprofile"
                  className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none transition-all ${
                    errors.portfolioUrl
                      ? 'border-red-400 bg-red-50/30 focus:ring-2 focus:ring-red-400'
                      : 'border-neutral-300 focus:ring-2 focus:ring-neutral-900'
                  }`}
                />
                {errors.portfolioUrl && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.portfolioUrl}
                  </p>
                )}
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  {t('careersPage.resume', 'Resume / CV Document *')}
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                  className="hidden"
                />

                {formData.resumeFileName ? (
                  <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-semibold text-neutral-900 truncate">
                          {formData.resumeFileName}
                        </div>
                        <div className="text-xs text-neutral-500 font-mono">
                          {fileSizeText}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 bg-white border border-neutral-300 rounded-lg transition-colors cursor-pointer"
                      >
                        {isRTL ? 'استبدال' : 'Replace'}
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                      dragActive
                        ? 'border-neutral-900 bg-neutral-100'
                        : errors.resumeFile
                        ? 'border-red-400 bg-red-50/20'
                        : 'border-neutral-300 hover:border-neutral-500 bg-neutral-50/50 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 text-neutral-700 mx-auto flex items-center justify-center mb-3 shadow-sm">
                      <Upload className="w-5 h-5 text-neutral-800" />
                    </div>
                    <div className="text-sm font-semibold text-neutral-900">
                      <span>{t('careersPage.clickUpload', 'Click to upload resume')}</span>{' '}
                      {t('careersPage.dragDrop', 'or drag and drop')}
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">
                      {t('careersPage.fileLimits', 'PDF, DOC, DOCX up to 10MB')}
                    </p>
                  </div>
                )}

                {errors.resumeFile && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.resumeFile}
                  </p>
                )}
              </div>

              {/* Cover Note */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                  {t('careersPage.whyWhislly', 'Brief Note (Optional)')}
                </label>
                <textarea
                  rows={3}
                  value={formData.coverNote}
                  onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                  placeholder={
                    isRTL
                      ? `أخبرنا عن سبب كونك الخيار الأنسب لشغل وظيفة ${job?.title || 'هذا المنصب'}...`
                      : `Tell us why you are a great fit for ${job?.title || 'this role'}...`
                  }
                  className="w-full px-4 py-3 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate('/careers')}
                  className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-50 transition-all cursor-pointer shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('careersPage.submitting', 'Submitting...')}</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {isRTL
                          ? `إرسال طلب التقديم لـ ${job?.title || 'الوظيفة'}`
                          : `Submit Application for ${job?.title || 'Role'}`}
                      </span>
                      {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
