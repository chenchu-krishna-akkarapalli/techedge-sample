// ============================================================
// Type Definitions for Area Landing Page
// ============================================================

import type { ReactNode, HTMLAttributes, AnchorHTMLAttributes } from 'react';

// ============================================================
// Navigation Types
// ============================================================
export interface NavItem {
  label: string;
  sectionId: string;
  ariaLabel?: string;
  route?: string; // Optional route for page navigation
}

// ============================================================
// Button Types
// ============================================================
export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends HTMLAttributes<HTMLElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  children: ReactNode;
  className?: string;
}

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  children: ReactNode;
}

// ============================================================
// Icon Types
// ============================================================
export type IconName = 
  | 'arrow'
  | 'cable'
  | 'earth'
  | 'account'
  | 'chart'
  | 'check'
  | 'close'
  | 'logo';

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
}

// ============================================================
// Logo Types
// ============================================================
export interface LogoData {
  id: string;
  src: string;
  alt: string;
}

export interface PartnerLogoProps {
  logo: LogoData;
  className?: string;
}

// ============================================================
// Benefit/Feature Types
// ============================================================
export interface Benefit {
  id: string;
  icon: IconName;
  title: string;
  description: string;
}

export interface BenefitCardProps {
  benefit: Benefit;
  index: number;
}

// ============================================================
// Feature List Types
// ============================================================
export interface FeatureItem {
  id: string;
  number: string;
  text: string;
}

export interface FeatureListProps {
  items: FeatureItem[];
}

// ============================================================
// Comparison Table Types
// ============================================================
export type FeatureStatus = 'included' | 'partial' | 'excluded';

export interface ComparisonFeature {
  id: string;
  label: string;
  status: FeatureStatus;
}

export interface ComparisonColumn {
  id: string;
  name: string;
  isHighlighted?: boolean;
  features: ComparisonFeature[];
}

export interface ComparisonTableProps {
  columns: ComparisonColumn[];
}

// ============================================================
// Testimonial Types
// ============================================================
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  image: string;
  imageAlt: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

// ============================================================
// Step Types (How It Works)
// ============================================================
export interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface StepCardProps {
  step: Step;
  index: number;
}

// ============================================================
// Section Types
// ============================================================
export interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

// ============================================================
// Animation Types
// ============================================================
export interface AnimationConfig {
  initial: Record<string, number>;
  animate: Record<string, number>;
  transition: {
    duration: number;
    delay?: number;
    type?: string;
    stiffness?: number;
    damping?: number;
  };
}

export interface ScrollAnimationConfig extends AnimationConfig {
  viewport?: {
    once?: boolean;
    margin?: string;
  };
}
