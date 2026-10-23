import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Job } from '../types';
import {
  MapPin,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  RefreshCw,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FALLBACK_JOBS_EN: Job[] = [
  {
    id: 'job-01',
    title: 'Senior Brand & Visual Designer',
    department: 'Creative & Design',
    location: 'Amman, Jordan (Hybrid)',
    employment_type: 'Full-time',
    description: 'Lead visual identity systems, packaging guidelines, and client brand architectures.',
    is_active: true,
  },
  {
    id: 'job-02',
    title: 'Social Media Content Strategist',
    department: 'Growth & Marketing',
    location: 'Amman, Jordan (On-site)',
    employment_type: 'Full-time',
    description: 'Drive high-converting content roadmaps, reel productions, and campaign analytics.',
    is_active: true,
  },
  {
    id: 'job-03',
    title: 'Full-Stack Web Engineer',
    department: 'Technology',
    location: 'Amman, Jordan / Remote',
    employment_type: 'Full-time',
    description: 'Architect modern React/Vite interfaces, headless e-commerce, and high-performance apps.',
    is_active: true,
  },
  {
    id: 'job-04',
    title: 'Commercial Food & Product Photographer',
    department: 'Production Studio',
    location: 'Amman, Jordan (On-site Studio)',
    employment_type: 'Contract / Project-based',
    description: 'High-end studio food photography, lighting composition, and delivery menu styling.',
    is_active: true,
  },
  {
    id: 'job-05',
    title: 'E-Commerce Growth Manager',
    department: 'E-Commerce Solutions',
    location: 'Amman, Jordan (Hybrid)',
    employment_type: 'Full-time',
    description: 'Scale direct-to-consumer storefronts, optimize conversion funnels, and manage Meta Ads.',
    is_active: true,
  },
  {
    id: 'job-06',
    title: 'Video Producer & Motion Animator',
    department: 'Production Studio',
    location: 'Amman, Jordan (On-site)',
    employment_type: 'Full-time',
    description: 'Produce cinematic short-form social reels, 3D typography animations, and video edits.',
    is_active: true,
  },
];

const FALLBACK_JOBS_AR: Job[] = [
  {
    id: 'job-01',
    title: 'مصمم بصري وهوية تجارية أول',
    department: 'التصميم والإبداع',
    location: 'عمّان، الأردن (هجين)',
    employment_type: 'دوام كامل',
    description: 'قيادة أنظمة الهوية البصرية، أدلة التغليف، والهندسة التصميمية للعلامات التجارية.',
    is_active: true,
  },
  {
    id: 'job-02',
    title: 'أخصائي واستراتيجي محتوى سوشيال ميديا',
    department: 'التسويق والنمو',
    location: 'عمّان، الأردن (ميداني)',
    employment_type: 'دوام كامل',
    description: 'إدارة خطط المحتوى عالي التحويل، إنتاج الريلز، وتحليلات الحملات الرقمية.',
    is_active: true,
  },
  {
    id: 'job-03',
    title: 'مطور ويب متكامل (Full-Stack)',
    department: 'التكنولوجيا والبرمجيات',
    location: 'عمّان، الأردن / عن بُعد',
    employment_type: 'دوام كامل',
    description: 'بناء واجهات React/Vite الحديثة، منصات التجارة الإلكترونية، وتطبيقات الويب عالية السرعة.',
    is_active: true,
  },
  {
    id: 'job-04',
    title: 'مصور تجاري وقوائم طعام للمطاعم',
    department: 'استوديو الإنتاج',
    location: 'عمّان، الأردن (استوديو)',
    employment_type: 'عقد / بالقطعة',
    description: 'تصوير استوديو للأطعمة، توزيع الإضاءة الاحترافية، وتنسيق أطباق قوائم تطبيقات التوصيل.',
    is_active: true,
  },
  {
    id: 'job-05',
    title: 'مدير نمو التجارة الإلكترونية',
    department: 'حلول التجارة الإلكترونية',
    location: 'عمّان، الأردن (هجين)',
    employment_type: 'دوام كامل',
    description: 'توسيع المتاجر الرقمية المباشرة، تحسين مسار الشراء، وإدارة إعلانات ميتا الممولة.',
    is_active: true,
  },
  {
    id: 'job-06',
    title: 'منتج فيديو ومصمم موشن جرافيكس',
    department: 'استوديو الإنتاج',
    location: 'عمّان، الأردن (ميداني)',
    employment_type: 'دوام كامل',
    description: 'إنتاج ريلز سينمائية قصيرة، رسوم متحركة 3D، ومونتاج إعلانات تجارية ديناميكية.',
    is_active: true,
  },
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
          {[1, 2, 3, 4, 5, 6].map((idx) => (
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
