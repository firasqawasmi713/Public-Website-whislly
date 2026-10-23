export type PageType =
  | 'home'
  | 'social-media'
  | 'careers'
  | 'creative-production'
  | 'business-solutions'
  | 'about';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  isClickable?: boolean;
  linkPage?: PageType;
}

export interface ProofItem {
  id: string;
  title: string;
  category: string;
  client: string;
  metric: string;
  metricLabel: string;
  description: string;
  tags: string[];
  visualType: 'food' | 'social' | 'branding';
}

export interface PricingPackage {
  id: string;
  name: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  billingPeriod: 'one-time' | 'month';
  description: string;
  includes: string[];
  objective: string;
  isPopular?: boolean;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl: string;
  position: string;
  resumeFile: File | null;
  resumeFileName?: string;
  coverNote?: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location?: string;
  employment_type?: string;
  description?: string;
  requirements?: string[];
  is_active: boolean;
  created_at?: string;
}

