import { memo, lazy, Suspense, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import { cn } from '@/lib/utils';
import { ANIMATIONS, SCROLL_VIEWPORT } from '@/lib/constants';
import { useContactSEO } from '@/lib/seo';

// Layout Components
import { FloatingNav, TopNavigation, Footer } from '@/components/layout';

// Lazy-loaded sections
const PartnersSection = lazy(() => import('@/components/sections/PartnersSection').then(m => ({ default: m.PartnersSection })));

// ============================================================
// Types
// ============================================================
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

// ============================================================
// EmailJS Configuration
// Initialize with your EmailJS credentials
// ============================================================
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || 'your_admin_template_id';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

// ============================================================
// Loading Fallback
// ============================================================
const SectionLoader = memo(function SectionLoader() {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-2xl" />
    </div>
  );
});

// ============================================================
// Contact Page Component
// ============================================================
export const ContactPage = memo(function ContactPage() {
  // Apply SEO meta tags for contact page
  useContactSEO();

  return (
    <div className={cn(
      'relative flex flex-col items-center',
      'bg-[#EBE9E4] min-h-screen w-full'
    )}>
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Main Content */}
      <motion.main
        className={cn(
          'flex flex-col items-center gap-2.5',
          'min-h-min overflow-clip',
          'pt-6 sm:pt-10 px-4 sm:px-[30px]',
          'relative w-full max-w-[1500px]'
        )}
        initial={ANIMATIONS.fadeInUp.initial}
        animate={ANIMATIONS.fadeInUp.animate}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Background */}
        <div 
          className={cn(
            'absolute bg-[#f9f8f6] inset-0',
            'pointer-events-none rounded-[20px] sm:rounded-[30px]'
          )}
          aria-hidden="true"
        />

        {/* Inner Container */}
        <div className={cn(
          'box-border flex flex-col items-center',
          'max-w-[1500px] overflow-clip',
          'pt-4 sm:pt-5 px-4 sm:px-5 relative w-full'
        )}>
          {/* Top Navigation */}
          <TopNavigation />

          {/* Contact Section */}
          <ContactSection />

          {/* Partners Section + Footer */}
          <div className="w-full mt-8">
            <Suspense fallback={<SectionLoader />}>
              <PartnersSection />
            </Suspense>
            <Footer />
          </div>
        </div>
      </motion.main>
    </div>
  );
});

// ============================================================
// Contact Section
// ============================================================
const ContactSection = memo(function ContactSection() {
  return (
    <motion.section
      id="contact"
      className={cn(
        'w-full py-16 sm:py-24',
        'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'
      )}
      initial={ANIMATIONS.fadeInUp.initial}
      whileInView={ANIMATIONS.fadeInUp.animate}
      viewport={SCROLL_VIEWPORT}
      transition={ANIMATIONS.fadeInUp.transition}
    >
      {/* Left Side - Contact Info */}
      <ContactInfo />

      {/* Right Side - Contact Form */}
      <ContactForm />
    </motion.section>
  );
});

// ============================================================
// Contact Info Component
// ============================================================
const ContactInfo = memo(function ContactInfo() {
  return (
    <div className="flex flex-col justify-center">
      <h2 className={cn(
        'font-crimson font-normal italic',
        'text-2xl sm:text-3xl lg:text-4xl text-black',
        'mb-6 border-b border-gray-300 pb-2 inline-block'
      )}>
        Get In Touch
      </h2>

      <p className={cn(
        'font-dm-sans font-normal leading-relaxed',
        'text-gray-700 text-[15px] sm:text-base mb-8'
      )}
      style={{ fontVariationSettings: "'opsz' 14" }}
      >
        Have a question or want to work together? We'd love to hear from you. 
        Send us a message and we'll respond as soon as possible.
      </p>

      {/* Contact Details */}
      <div className="space-y-6">
        {/* Email */}
        <ContactDetail
          icon={<EmailIcon />}
          label="Email"
          value="info@techedge.com"
          href="mailto:info@techedge.com"
        />

        {/* Phone */}
        <ContactDetail
          icon={<PhoneIcon />}
          label="Phone"
          value="+966598898895"
          href="tel:+966598898895"
        />

        {/* Address */}
        <ContactDetail
          icon={<LocationIcon />}
          label="Address"
          value="Riyadh, Saudi Arabia"
        />
      </div>

      {/* Social Links */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className={cn(
          'font-dm-sans font-medium text-sm text-gray-500 mb-4'
        )}>
          Follow Us
        </p>
        <div className="flex gap-4">
          <SocialLink href="#" label="LinkedIn" icon={<LinkedInIcon />} />
          <SocialLink href="#" label="Twitter" icon={<TwitterIcon />} />
          <SocialLink href="#" label="Facebook" icon={<FacebookIcon />} />
        </div>
      </div>
    </div>
  );
});

// ============================================================
// Contact Detail Component
// ============================================================
interface ContactDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}

const ContactDetail = memo(function ContactDetail({ icon, label, value, href }: ContactDetailProps) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-10 h-10 bg-[#485C11]/10 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className={cn(
          'font-dm-sans font-medium text-sm text-gray-500'
        )}>
          {label}
        </p>
        <p className={cn(
          'font-dm-sans font-normal text-base text-gray-900',
          href && 'hover:text-[#485C11] transition-colors'
        )}
        style={{ fontVariationSettings: "'opsz' 14" }}
        >
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
});

// ============================================================
// Social Link Component
// ============================================================
interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SocialLink = memo(function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        'w-10 h-10 bg-gray-100 rounded-full',
        'flex items-center justify-center',
        'hover:bg-[#485C11] hover:text-white transition-colors',
        'text-gray-600'
      )}
    >
      {icon}
    </a>
  );
});

// ============================================================
// Contact Form Component
// ============================================================
const ContactForm = memo(function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('sending');

    try {
      // Prepare template parameters
      const templateParams = {
        // Sender information (matches template variables)
        name: formData.name,
        email: formData.email,
        title: formData.subject || 'General Inquiry',
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        message: formData.message,
        // Reply-to email
        reply_to: formData.email,
      };

      // Send two emails in parallel:
      // 1. Auto-reply to user (existing template)
      // 2. Notification to admin with form data (admin template)
      await Promise.all([
        // Auto-reply to user
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        ),
        // Admin notification with all form data
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_ADMIN_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        ),
      ]);

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      });

      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }, [formData, validateForm]);

  return (
    <motion.div
      className={cn(
        'bg-white rounded-2xl p-6 sm:p-8 lg:p-10',
        'shadow-sm border border-gray-100'
      )}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={SCROLL_VIEWPORT}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className={cn(
        'font-crimson font-normal italic',
        'text-xl sm:text-2xl text-black mb-6'
      )}>
        Send Us a Message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Full Name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
        </div>

        {/* Phone & Company Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="+966 XX XXX XXXX"
            value={formData.phone}
            onChange={handleChange}
          />
          <FormField
            label="Company"
            name="company"
            type="text"
            placeholder="Your Company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        {/* Subject */}
        <FormSelect
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          options={[
            { value: '', label: 'Select a subject' },
            { value: 'general', label: 'General Inquiry' },
            { value: 'services', label: 'Services & Solutions' },
            { value: 'partnership', label: 'Partnership' },
            { value: 'support', label: 'Technical Support' },
            { value: 'other', label: 'Other' },
          ]}
        />

        {/* Message */}
        <FormTextarea
          label="Message"
          name="message"
          placeholder="How can we help you?"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className={cn(
            'w-full py-3 px-6 rounded-full',
            'font-dm-sans font-medium text-white',
            'bg-[#485C11] hover:bg-[#3a4a0e]',
            'transition-colors duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'flex items-center justify-center gap-2'
          )}
        >
          {status === 'sending' ? (
            <>
              <LoadingSpinner />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 text-sm text-center font-dm-sans"
          >
            ✓ Message sent successfully! We'll get back to you soon.
          </motion.p>
        )}

        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 text-sm text-center font-dm-sans"
          >
            ✗ Failed to send message. Please try again or email us directly.
          </motion.p>
        )}
      </form>
    </motion.div>
  );
});

// ============================================================
// Form Field Component
// ============================================================
interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const FormField = memo(function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  required,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className={cn(
          'block font-dm-sans text-sm font-medium text-gray-700 mb-1.5'
        )}
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg',
          'border border-gray-200 bg-gray-50',
          'font-dm-sans text-sm text-gray-900',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-[#485C11]/20 focus:border-[#485C11]',
          'transition-colors duration-200',
          error && 'border-red-300 focus:ring-red-200 focus:border-red-500'
        )}
        style={{ fontVariationSettings: "'opsz' 14" }}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 font-dm-sans">{error}</p>
      )}
    </div>
  );
});

// ============================================================
// Form Select Component
// ============================================================
interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const FormSelect = memo(function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
}: FormSelectProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className={cn(
          'block font-dm-sans text-sm font-medium text-gray-700 mb-1.5'
        )}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg',
          'border border-gray-200 bg-gray-50',
          'font-dm-sans text-sm text-gray-900',
          'focus:outline-none focus:ring-2 focus:ring-[#485C11]/20 focus:border-[#485C11]',
          'transition-colors duration-200',
          'appearance-none cursor-pointer'
        )}
        style={{ fontVariationSettings: "'opsz' 14" }}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

// ============================================================
// Form Textarea Component
// ============================================================
interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
}

const FormTextarea = memo(function FormTextarea({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required,
}: FormTextareaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className={cn(
          'block font-dm-sans text-sm font-medium text-gray-700 mb-1.5'
        )}
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={5}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg',
          'border border-gray-200 bg-gray-50',
          'font-dm-sans text-sm text-gray-900',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-[#485C11]/20 focus:border-[#485C11]',
          'transition-colors duration-200 resize-none',
          error && 'border-red-300 focus:ring-red-200 focus:border-red-500'
        )}
        style={{ fontVariationSettings: "'opsz' 14" }}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 font-dm-sans">{error}</p>
      )}
    </div>
  );
});

// ============================================================
// Icons
// ============================================================
const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#485C11]">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#485C11]">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#485C11]">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export default ContactPage;
