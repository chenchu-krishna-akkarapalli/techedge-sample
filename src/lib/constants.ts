// ============================================================
// Constants and Configuration
// ============================================================

import type { NavItem, Benefit, FeatureItem, ComparisonColumn, Step, Testimonial } from '../types';

// ============================================================
// Navigation Items
// ============================================================
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', sectionId: 'top', ariaLabel: 'Go to home', route: '/' },
  { label: 'About Us', sectionId: 'about', ariaLabel: 'Learn about us', route: '/about' },
  { label: 'Services & Solutions', sectionId: 'benefits', ariaLabel: 'View services and solutions', route: '/services' },
  { label: 'Contact Us', sectionId: 'contact', ariaLabel: 'Contact us', route: '/contact' },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
  { label: 'Home', sectionId: 'top', route: '/' },
  { label: 'About Us', sectionId: 'about', route: '/about' },
  { label: 'Services & Solutions', sectionId: 'benefits', route: '/services' },
  { label: 'Contact Us', sectionId: 'contact', route: '/contact' },
];

// ============================================================
// Partner Logos
// ============================================================
export const PARTNER_LOGOS = [
  { id: 'logo-1', alt: 'Logoipsum' },
  { id: 'logo-2', alt: 'Logoipsum' },
  { id: 'logo-3', alt: 'Logoipsum' },
  { id: 'logo-4', alt: 'Logoipsum' },
  { id: 'logo-5', alt: 'Logoipsum' },
  { id: 'logo-6', alt: 'Logoipsum' },
] as const;

// ============================================================
// Benefits Data
// ============================================================
export const BENEFITS: Benefit[] = [
  {
    id: 'saas-development',
    icon: 'cable',
    title: 'SaaS Product Development',
    description: 'Build scalable, cloud-native SaaS applications with modern architecture and best practices.',
  },
  {
    id: 'api-microservices',
    icon: 'earth',
    title: 'API & Microservices Architecture',
    description: 'Design and implement robust APIs and microservices for seamless system integration.',
  },
  {
    id: 'digital-transformation',
    icon: 'account',
    title: 'Digital Transformation & Consulting',
    description: 'Business-aligned roadmaps, process automation, and compliance solutions that drive meaningful change.',
  },
  {
    id: 'cloud-implementation',
    icon: 'chart',
    title: 'Cloud Environment Implementation',
    description: 'Multi-cloud management, DevOps excellence, and infrastructure automation for scalable operations.',
  },
  {
    id: 'integration-services',
    icon: 'cable',
    title: 'Integration & Transformation Services',
    description: 'Seamless data flow and system interoperability across enterprise platforms.',
  },
  {
    id: 'ipaas-solutions',
    icon: 'earth',
    title: 'iPaaS & App Integration Solutions',
    description: 'Integration Platform as a Service with real-time data synchronization and automation.',
  },
  {
    id: 'staff-augmentation',
    icon: 'account',
    title: 'Staff Augmentation & Talent',
    description: 'Flexible delivery models (onshore, offshore, hybrid) with skilled certified professionals.',
  },
  {
    id: 'qa-testing',
    icon: 'chart',
    title: 'Quality Assurance & Testing',
    description: 'Comprehensive QA, test automation, and performance optimization for reliable applications.',
  },
];

// ============================================================
// Our Goals Data
// ============================================================
export const OUR_GOALS = [
  {
    id: 'global-leadership',
    icon: 'globe',
    title: 'Global Leadership',
    description: 'become the most trusted digital transformation partner in the Middle East and beyond',
  },
  {
    id: 'client-success',
    icon: 'handshake',
    title: 'Client Success',
    description: 'deliver measurable growth and operational efficiency to every client',
  },
  {
    id: 'innovation-first',
    icon: 'lightbulb',
    title: 'Innovation First',
    description: 'continuously evolve our technology stack to stay ahead of market trends',
  },
  {
    id: 'sustainability',
    icon: 'leaf',
    title: 'Sustainability',
    description: 'build scalable, secure, and environmentally responsible IT systems',
  },
] as const;

// ============================================================
// Feature List Data
// ============================================================
export const FEATURE_LIST: FeatureItem[] = [
  { id: 'trend-spotting', number: '01', text: 'Spot Trends in Seconds: No more digging through numbers.' },
  { id: 'team-alignment', number: '02', text: 'Get Everyone on the Same Page: Share easy-to-understand reports with your team.' },
  { id: 'presentations', number: '03', text: 'Make Presentations Pop: Interactive maps and dashboards keep your audience engaged.' },
  { id: 'global-snapshot', number: '04', text: 'Your Global Snapshot: Get a quick, clear overview of your entire operation.' },
];

// ============================================================
// Comparison Table Data
// ============================================================
export const COMPARISON_COLUMNS: ComparisonColumn[] = [
  {
    id: 'area',
    name: 'Area',
    isHighlighted: true,
    features: [
      { id: 'ultra-fast', label: 'Ultra-fast browsing', status: 'included' },
      { id: 'ai-insights', label: 'Advanced AI insights', status: 'included' },
      { id: 'integration', label: 'Seamless integration', status: 'included' },
      { id: 'utf8', label: 'Full UTF-8 support', status: 'included' },
      { id: 'customization', label: 'Full customization', status: 'included' },
      { id: 'browsing', label: 'Ultra-fast browsing', status: 'included' },
    ],
  },
  {
    id: 'websurge',
    name: 'WebSurge',
    isHighlighted: false,
    features: [
      { id: 'fast', label: 'Fast browsing', status: 'included' },
      { id: 'basic-ai', label: 'Basic AI recommendations', status: 'included' },
      { id: 'restricted', label: 'Restricts customization', status: 'included' },
      { id: 'basic-insights', label: 'Basic AI insights', status: 'excluded' },
      { id: 'fast-2', label: 'Fast browsing', status: 'included' },
      { id: 'display-errors', label: 'Potential display errors', status: 'excluded' },
    ],
  },
  {
    id: 'hyperview',
    name: 'HyperView',
    isHighlighted: false,
    features: [
      { id: 'moderate', label: 'Moderate speeds', status: 'excluded' },
      { id: 'no-ai', label: 'No AI assistance', status: 'excluded' },
      { id: 'learning-curve', label: 'Steep learning curve', status: 'excluded' },
      { id: 'no-ai-2', label: 'No AI assistance', status: 'excluded' },
      { id: 'moderate-2', label: 'Moderate speeds', status: 'excluded' },
      { id: 'partial-utf8', label: 'Partial UTF-8 support', status: 'excluded' },
    ],
  },
];

// ============================================================
// How It Works Steps
// ============================================================
export const STEPS: Step[] = [
  {
    id: 'get-started',
    number: '01',
    title: 'Get Started',
    description: "With our intuitive setup, you're up and running in minutes.",
  },
  {
    id: 'customize',
    number: '02',
    title: 'Customize and Configure',
    description: 'Adapt Area to your specific requirements and preferences.',
  },
  {
    id: 'grow',
    number: '03',
    title: 'Grow Your Business',
    description: 'Make informed decisions to exceed your goals.',
  },
];

// ============================================================
// Testimonials
// ============================================================
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'john-smith',
    quote: "I was skeptical, but Area has completely transformed the way I manage my business. The data visualizations are so clear and intuitive, and the platform is so easy to use. I can't imagine running my company without it.",
    author: 'John Smith',
    role: 'Head of Data',
    image: 'testimonial-john',
    imageAlt: 'A image of a concrete sphere, balanced between two other larger spheres',
  },
];

// ============================================================
// External Links
// ============================================================
export const EXTERNAL_LINKS = {
  figmaSites: 'https://www.figma.com/sites',
  figmaDesign: 'https://www.figma.com/design/4nnaytlkE8BcfkFc0xLkRE?node-id=0-3',
} as const;

// ============================================================
// Animation Configurations
// ============================================================
export const ANIMATIONS = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8 },
  },
  buttonHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  },
  navHide: {
    transition: { duration: 0.3 },
  },
} as const;

// ============================================================
// Viewport Options for Scroll Animations
// ============================================================
export const SCROLL_VIEWPORT = {
  once: true,
  margin: '-100px',
} as const;

// ============================================================
// Company Info
// ============================================================
export const COMPANY_INFO = {
  name: 'Tech Edge',
  year: '2025',
  copyright: '© Tech Edge.',
  rights: 'All Rights Reserved',
} as const;
