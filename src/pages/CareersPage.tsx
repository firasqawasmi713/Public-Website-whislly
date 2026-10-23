import React, { useState, useRef } from 'react';
import { PageType, ApplicationFormData } from '../types';
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Compass,
  Laptop,
  AlertCircle,
  Loader2,
  Building2,
} from 'lucide-react';
import { JobListings } from '../components/JobListings';
import { useLanguage } from '../context/LanguageContext';

interface CareersPageProps {
  onNavigate: (page: PageType) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openPositionsEn = [
    'Senior Brand & Visual Designer',
    'Social Media Content Specialist & Strategist',
    'Creative Art Director & Photographer',
    'Video Producer & Motion Animator',
    'Full-Stack Web Developer (React & Node.js)',
    'E-Commerce & Performance Marketing Manager',
    'Business Solutions & Operations Consultant',
  ];

  const openPositionsAr = [
    'مصمم بصري وهوية تجارية أول',
    'أخصائي واستراتيجي محتوى سوشيال ميديا',
    'مدير فني إبداعي ومصور تجاري',
    'منتج فيديو ومصمم موشن جرافيكس',
    'مطور برمجيات ويب متكامل (React & Node.js)',
    'مدير نمو التجارة الإلكترونية والأداء الرقمي',
    'مستشار حلول وعمليات الأعمال',
  ];

  const openPositions = isRTL ? openPositionsAr : openPositionsEn;

  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    position: openPositions[0],
    resumeFile: null,
    resumeFileName: '',
    coverNote: '',
  });

  const [fileSizeText, setFileSizeText] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

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

    if (!formData.position) {
      newErrors.position = isRTL ? 'يرجى اختيار الوظيفة.' : 'Please select a position.';
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
      const generatedId = `WHIS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedAppId(generatedId);
    }, 900);
  };

  const handleResetApplication = () => {
    setSubmittedAppId(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      portfolioUrl: '',
      position: openPositions[0],
      resumeFile: null,
      resumeFileName: '',
      coverNote: '',
    });
    setFileSizeText('');
    setErrors({});
  };

  return (
    <div className="w-full text-start">
      {/* =========================================================================
          HERO SECTION: CAREERS AT WHISLLY
          ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-neutral-900 transition-colors"
              >
                {t('nav.home', 'Home')}
              </button>
              <span aria-hidden="true">/</span>
              <span className="text-neutral-900 font-bold">
                {t('careersPage.breadcrumb', 'Careers')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 font-display leading-[1.1] text-balance">
              {t('careersPage.title', 'Join the Team at Whislly')}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
              {t(
                'careersPage.subtitle',
                'We are a passionate team of designers, strategists, filmmakers, and technologists building remarkable brand experiences. We are always looking for ambitious talent to join our studio in Amman.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ACTIVE JOB OPENINGS
          ========================================================================= */}
      <section className="py-16 sm:py-20 bg-neutral-50/50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <JobListings />
        </div>
      </section>

      {/* =========================================================================
          APPLICATION FORM & CULTURE GRID
          ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Application Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200 shadow-sm p-8 sm:p-12">
              {submittedAppId ? (
                /* Success View */
                <div className="py-8 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                      {t('careersPage.submittedTitle', 'Application Submitted Successfully')}
                    </span>
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-950 font-display">
                      {t('careersPage.submittedTitle', 'We’ve Received Your Application')}
                    </h2>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {t('careersPage.submittedMsg', 'Your application has been logged in our recruitment pipeline.')}
                    </p>
                  </div>

                  {/* Reference Ticket Card */}
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-medium">
                        {t('careersPage.refLabel', 'Application Reference:')}
                      </span>
                      <span className="font-mono font-bold text-neutral-900 bg-white px-2.5 py-1 rounded border border-neutral-200">
                        {submittedAppId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-medium">Position:</span>
                      <span className="font-semibold text-neutral-900">{formData.position}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-500 font-medium">Resume File:</span>
                      <span className="font-mono text-neutral-700 truncate max-w-[200px]">
                        {formData.resumeFileName} ({fileSizeText})
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={handleResetApplication}
                      className="w-full sm:w-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                    >
                      {t('careersPage.submitAnother', 'Submit Another Application')}
                    </button>
                    <button
                      onClick={() => onNavigate('home')}
                      className="w-full sm:w-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                    >
                      {t('careersPage.returnHome', 'Return to Home')}
                    </button>
                  </div>
                </div>
              ) : (
                /* Primary Application Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-neutral-950 font-display">
                      {t('careersPage.formTitle', 'Candidate Application Form')}
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                      {t('careersPage.formSubtitle', 'Please fill out your details and link your portfolio or past projects.')}
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
                          setErrors((prev) => {
                            const c = { ...prev };
                            delete c.fullName;
                            return c;
                          });
                        }
                      }}
                      placeholder={isRTL ? 'مثال: ليلى الكسرواني' : 'e.g. Layla Qasrawi'}
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

                  {/* Row: Email & Phone */}
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
                            setErrors((prev) => {
                              const c = { ...prev };
                              delete c.email;
                              return c;
                            });
                          }
                        }}
                        placeholder="layla@example.com"
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
                            setErrors((prev) => {
                              const c = { ...prev };
                              delete c.phone;
                              return c;
                            });
                          }
                        }}
                        placeholder="+962 7 9123 4567"
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

                  {/* Row: Portfolio & Position */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            setErrors((prev) => {
                              const c = { ...prev };
                              delete c.portfolioUrl;
                              return c;
                            });
                          }
                        }}
                        placeholder="behance.net/username"
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

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                        {t('careersPage.position', 'Position Applied For *')}
                      </label>
                      <select
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full px-4 py-3 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
                      >
                        {openPositions.map((pos, idx) => (
                          <option key={idx} value={pos}>
                            {pos}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Resume Upload Dropzone */}
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
                            {isRTL ? 'تغيير' : 'Change'}
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                            aria-label="Remove file"
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
                        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
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
                          {t('careersPage.fileLimits', 'Supported formats: PDF, DOC, DOCX (Max file size: 10MB)')}
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

                  {/* Optional Note */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                      {t('careersPage.whyWhislly', 'Why Whislly? (Optional Brief Note)')}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.coverNote}
                      onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                      placeholder={
                        isRTL
                          ? 'شاركنا ما يحمسك لبناء العلامات التجارية مع ويزلي...'
                          : 'Tell us what excites you about building brands with Whislly...'
                      }
                      className="w-full px-4 py-3 text-sm border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t('careersPage.submitting', 'Uploading & Processing Application...')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('careersPage.submitBtn', 'Submit Application')}</span>
                          {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-neutral-400 mt-3">
                      {t(
                        'careersPage.privacyNotice',
                        'We protect your candidate privacy. We do not share your details with third parties.'
                      )}
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Life at Whislly & Values */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white border border-neutral-800 space-y-6 shadow-xl">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Culture of Craft
                  </span>
                  <h3 className="text-2xl font-bold font-display text-white mt-1">
                    {t('careersPage.cultureTitle', 'Why Build Your Career at Whislly?')}
                  </h3>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {t(
                    'careersPage.cultureSubtitle',
                    'We don’t do corporate bureaucracy or cookie-cutter templates. We are a multidisciplinary studio where designers, videographers, and engineers work directly with visionary founders.'
                  )}
                </p>

                <div className="space-y-4 pt-2 border-t border-white/10 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {t('careersPage.freedomTitle', 'Creative Freedom & Ownership')}
                      </h4>
                      <p className="text-neutral-400 mt-0.5">
                        {t('careersPage.freedomDesc', 'You lead design decisions, creative shoots, and engineering architecture.')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-indigo-400">
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {t('careersPage.gearTitle', 'Top-Tier Tooling & Gear')}
                      </h4>
                      <p className="text-neutral-400 mt-0.5">
                        {t('careersPage.gearDesc', 'High-spec MacBooks, cinema cameras, lighting equipment, and modern software stacks.')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {t('careersPage.hybridTitle', 'Hybrid Flexibility in Amman')}
                      </h4>
                      <p className="text-neutral-400 mt-0.5">
                        {t('careersPage.hybridDesc', 'Based at King Hussein Business Park with flexible remote working options.')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Freelance FAQ Card */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                  <Building2 className="w-4 h-4 text-neutral-700" />
                  <span>{t('careersPage.freelancePrompt', 'General Freelance or Partnership Inquiries?')}</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {t(
                    'careersPage.freelanceEmailText',
                    'Are you a freelance motion designer, photographer, or copywriter interested in collaborating on project sprints? Email us directly at'
                  )}{' '}
                  <a href="mailto:careers@whislly.com" className="font-semibold text-neutral-900 underline">
                    careers@whislly.com
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
