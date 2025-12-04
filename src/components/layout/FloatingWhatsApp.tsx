import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa6";
import { cn } from '@/lib/utils';

// WhatsApp contact details
const WHATSAPP_CONFIG = {
  phone: '966598898895', // Without + for wa.me
  displayPhone: '+966 598 898 895', // For display
  message: 'Hi! I am interested in learning more about your services. Can you help me?',
};

// ============================================================
// Floating WhatsApp Component
// ============================================================

export const FloatingWhatsApp = memo(function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use web.whatsapp.com for desktop browsers
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const whatsappUrl = isMobile 
    ? `whatsapp://send?phone=${WHATSAPP_CONFIG.phone}&text=${encodeURIComponent(WHATSAPP_CONFIG.message)}`
    : `https://web.whatsapp.com/send?phone=${WHATSAPP_CONFIG.phone}&text=${encodeURIComponent(WHATSAPP_CONFIG.message)}`;

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Message Tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className={cn(
              'bg-white rounded-2xl shadow-2xl p-4 mb-2',
              'border border-gray-100',
              'max-w-xs z-50 relative'
            )}
          >
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-sm font-dm-sans font-bold text-gray-900">
                  Chat with us on WhatsApp
                </p>
                <p className="text-xs font-dm-sans text-gray-600 mt-1">
                  Average response time: 5 minutes
                </p>
              </div>
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  'w-full px-4 py-2 rounded-lg',
                  'bg-linear-to-r from-green-500 to-green-600',
                  'text-white font-dm-sans font-bold text-sm',
                  'hover:shadow-lg hover:from-green-600 hover:to-green-700',
                  'transition-all duration-200',
                  'flex items-center justify-center gap-2',
                  'cursor-pointer! select-none'
                )}
                style={{ cursor: 'pointer' }}
              >
                <FaWhatsapp size={16} />
                Start Chat
              </a>

              <p className="text-xs text-gray-500 text-center">
                {WHATSAPP_CONFIG.displayPhone}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={cn(
          'w-14 h-14 rounded-full',
          'bg-linear-to-br from-green-500 to-green-600',
          'text-white shadow-2xl',
          'flex items-center justify-center',
          'hover:shadow-green-500/50 hover:scale-110',
          'active:scale-95',
          'transition-all duration-200',
          'relative overflow-hidden'
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing background animation */}
        <motion.div
          className="absolute inset-0 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ opacity: 0.2 }}
        />

        {/* Icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaWhatsapp size={28} className="relative z-10" />
        </motion.div>

        {/* Floating label on hover */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 60 }}
              exit={{ opacity: 0, x: 40 }}
              className="absolute right-full mr-3 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-lg whitespace-nowrap"
            >
              Chat with us
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop overlay when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30"
          />
        )}
      </AnimatePresence>
    </div>
  );
});

export default FloatingWhatsApp;
