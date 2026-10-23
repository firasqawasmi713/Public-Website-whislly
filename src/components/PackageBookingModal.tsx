import React, { useState } from 'react';
import { PricingPackage } from '../types';
import { X, CheckCircle2, ArrowRight, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PackageBookingModalProps {
  pkg: PricingPackage | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PackageBookingModal: React.FC<PackageBookingModalProps> = ({
  pkg,
  isOpen,
  onClose,
}) => {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    socialHandle: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen || !pkg) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 800);
  };

  const handleDone = () => {
    setSuccess(false);
    setFormData({
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      socialHandle: '',
      notes: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col text-start">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 bg-neutral-50/70">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              {t('bookingModal.onboarding', 'Subscription Onboarding')}
            </span>
            <h3 className="text-lg font-bold text-neutral-900 font-display">
              {pkg.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-neutral-900 font-display">
                  {t('bookingModal.requestPlaced', 'Subscription Request Placed')}
                </h4>
                <p className="text-sm text-neutral-600 max-w-md mx-auto">
                  {t('contactModal.thankYou', 'Thank you,')}{' '}
                  <strong>{formData.contactName || (isRTL ? 'العميل العزيز' : 'Valued Client')}</strong>!{' '}
                  {isRTL
                    ? `لقد طلبت الاشتراك في ${pkg.name} (${pkg.price} ${pkg.currency}) لصالح `
                    : `You have requested the ${pkg.name} (${pkg.price} ${pkg.currency}) for `}
                  <strong>{formData.businessName || (isRTL ? 'مشروعك' : 'your brand')}</strong>.
                </p>
                <div className="mt-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 text-start space-y-2">
                  <div className="font-semibold text-neutral-900">
                    {t('bookingModal.nextStepsTitle', 'What happens next:')}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                    <span>{t('bookingModal.step1', 'Our Social Media Lead will review your Instagram / TikTok accounts.')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                    <span>{t('bookingModal.step2', 'We schedule a 30-minute creative alignment session & asset handover.')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                    <span>{t('bookingModal.step3', 'First design drafts are delivered within 48–72 hours.')}</span>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleDone}
                  className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {t('bookingModal.returnPlans', 'Return to Plans')}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Plan Summary Card */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-neutral-900">{pkg.name}</h4>
                    {pkg.isPopular && (
                      <span className="text-[10px] font-semibold bg-neutral-900 text-white px-2 py-0.5 rounded">
                        {isRTL ? 'الأكثر طلباً' : 'Most Popular'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm line-clamp-2">
                    {pkg.objective}
                  </p>
                </div>
                <div className="text-end shrink-0">
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span className="text-2xl font-bold font-mono text-neutral-950 tabular-nums">
                      {pkg.price}
                    </span>
                    <span className="text-xs font-semibold text-neutral-600">
                      {pkg.currency} {pkg.billingPeriod === 'month' ? (isRTL ? '/ شهر' : '/ mo') : ''}
                    </span>
                  </div>
                  {pkg.originalPrice && (
                    <div className="text-xs text-neutral-400 line-through tabular-nums">
                      {isRTL ? 'بدلاً من' : 'instead of'} {pkg.originalPrice} {pkg.currency}
                    </div>
                  )}
                </div>
              </div>

              {/* Onboarding Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      {t('bookingModal.businessName', 'Business or Brand Name *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder={isRTL ? 'مثال: بلوم كافيه ومخبز' : 'e.g. Bloom Cafe & Bakery'}
                      className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      {t('bookingModal.contactName', 'Contact Name *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder={isRTL ? 'اسمك الكريم' : 'Your name'}
                      className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      {t('bookingModal.email', 'Email Address *')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="marketing@yourbrand.com"
                      className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                      {t('bookingModal.phone', 'Phone / WhatsApp *')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+962 7 9000 0000"
                      className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    {t('bookingModal.socialHandles', 'Social Media Handles (Instagram / TikTok / LinkedIn)')}
                  </label>
                  <input
                    type="text"
                    value={formData.socialHandle}
                    onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                    placeholder="@yourbrand.jo"
                    className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    {t('bookingModal.notes', 'Specific Goals / Remarks')}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={t(
                      'bookingModal.notesPlaceholder',
                      'Tell us what you aim to achieve, target launch date, or current challenges...'
                    )}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{t('bookingModal.noBillingNotice', 'No upfront billing until kickoff alignment.')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
                    >
                      {t('contactModal.cancel', 'Cancel')}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t('bookingModal.processing', 'Processing...')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('bookingModal.confirmBtn', 'Confirm Plan Selection')}</span>
                          {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
