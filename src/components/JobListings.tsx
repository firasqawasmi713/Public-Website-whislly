import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Job } from '../types';
import {
  MapPin,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FALLBACK_JOBS_EN: Job[] = [
  {
    id: 'job-01',
    title: 'Graphic Designer',
    department: 'Creative & Design',
    location: 'Amman, Jordan (Remote / Hybrid)',
    employment_type: 'Project-based / Commission',
    description: 'Join our creative roster to deliver high-quality visual assets, social media graphics, and brand collateral on a project-by-project basis. Highly rewarding commission structure per delivered project.',
    is_active: true,
  },
  {
    id: 'job-02',
    title: 'Sales Representative',
    department: 'Growth & Sales',
    location: 'Amman, Jordan (Field / Remote)',
    employment_type: 'Commission-based',
    description: 'Drive business growth by acquiring new clients for our digital marketing, technology, and production services. Enjoy a highly lucrative commission structure for every successfully closed deal.',
    is_active: true,
  }
];

const FALLBACK_JOBS_AR: Job[] = [
  {
    id: 'job-01',
    title: 'مصمم جرافيك',
    department: 'التصميم والإبداع',
    location: 'عمّان، الأردن (عن بُعد / هجين)',
    employment_type: 'بالقطعة / عمولة',
    description: 'انضم إلى فريقنا الإبداعي لتصميم مواد بصرية عالية الجودة، ومحتوى لمنصات التواصل الاجتماعي، وهوية العلامات التجارية بنظام المشاريع مع نظام عمولة مجزية لكل مشروع.',
    is_active: true,
  },
  {
    id: 'job-02',
    title: 'مندوب مبيعات',
    department: 'المبيعات والنمو',
    location: 'عمّان، الأردن (ميداني / عن بُعد)',
    employment_type: 'مبني على العمولة',
    description: 'ساهم في نمو أعمالنا من خلال استقطاب عملاء جدد لخدمات التسويق الرقمي، والتكنولوجيا، والإنتاج. تمتع بنظام عمولة مجزية جداً لكل صفقة ناجحة يتم إغلاقها.',
    is_active: true,
  }
];

export const JobListings: React.FC = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  const fallbackList = isRTL ? FALLBACK_JOBS_AR : FALLBACK_JOBS_EN;

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);

    try {
      const { data, error: supabaseError } = await supabase
        .from('jobs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      if (data && data.length > 0) {
        setJobs(data as Job[]);
      } else {
        setJobs(fallbackList);
        setUsingFallback(true);
      }
    } catch {
      setJobs(fallbackList);
      setUsingFallback(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [isRTL]);

  const handleApply = (jobId: string) => {
    navigate(`/careers/apply/${jobId}`);
  };

  return (
    <div className="w-full space-y-8 text-start">
      {/* Header and Filter Info */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {t('careersPage.openingsTitle', 'Active Job Openings')}
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 font-display mt-1">
            {t('careersPage.openingsTitle', 'Active Job Openings')}
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            {t(
              'careersPage.openingsSubtitle',
              'Join Whislly’s creative and engineering teams in Amman. Filtered directly from our live recruitment database.'
            )}
          </p>
        </div>

        <button
          onClick={fetchJobs}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors self-start sm:self-auto cursor-pointer"
          title="Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{t('careersPage.refresh', 'Refresh Listings')}</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm animate-pulse space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-5 w-24 bg-neutral-200 rounded" />
                <div className="h-4 w-16 bg-neutral-100 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-neutral-200 rounded" />
              <div className="h-4 w-full bg-neutral-100 rounded" />
              <div className="h-4 w-2/3 bg-neutral-100 rounded" />
              <div className="pt-4 border-t border-neutral-100 flex justify-between items-center">
                <div className="h-4 w-20 bg-neutral-100 rounded" />
                <div className="h-9 w-24 bg-neutral-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Listings Grid */}
      {!loading && jobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between hover:border-neutral-900 hover:shadow-lg transition-all duration-200 shadow-sm text-start"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-500 uppercase tracking-wider">
                    {job.department}
                  </span>
                  {job.employment_type && (
                    <span className="text-[11px] font-medium text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                      {job.employment_type}
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-bold tracking-tight text-neutral-950 font-display group-hover:text-neutral-900 transition-colors">
                  {job.title}
                </h4>

                {job.description && (
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>
                )}

                {job.location && (
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{job.location}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400">
                  REF: {job.id.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={() => handleApply(job.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all cursor-pointer shadow-sm group-hover:bg-neutral-950"
                >
                  <span>{t('careersPage.applyNow', 'Apply Now')}</span>
                  {isRTL ? (
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
