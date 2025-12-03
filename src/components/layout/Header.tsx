import { memo } from 'react';
import { motion } from 'motion/react';
import { DeviceFrameImage } from '@/components/common';
import { imgInnerScreen } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { ANIMATIONS } from '@/lib/constants';

// ============================================================
// Header Component
// ============================================================

export const Header = memo(function Header() {
    return (
        <header
            className={cn(
                "box-border content-stretch flex flex-col gap-[240px] items-start max-w-[1500px] overflow-clip p-0 relative shrink-0 w-full"
            )}
        >
            {/* Main Headline */}
            <motion.h1
                className={cn(
                    "block font-crimson font-normal text-center content-center self-center",
                    "text-8xl leading-[85px]",
                    "[text-shadow:0px_4px_4px_rgb(0_0_0_/_0.25)]",
                    "text-black"
                )}
                initial={ANIMATIONS.fadeInUp.initial}
                animate={ANIMATIONS.fadeInUp.animate}
                transition={{ ...ANIMATIONS.fadeInUp.transition, duration: 0.8 }}
            >
                ENGINEERING<br />
                TRUST<br />
                IN EVERY<br />
                SOLUTION.
            </motion.h1>

            {/* Hero Image with iPad Mockup */}
            <HeroImageSection />

        </header>

    );
});

// ============================================================
// Hero Image Section
// ============================================================

const HeroImageSection = memo(function HeroImageSection() {
    return (
        <motion.div
            className={cn(
                'bg-[#8e9c78]  relative rounded-[20px] sm:rounded-[30px]',
                'shrink-0 w-full overflow-visible',
                // Responsive height
                'h-[250px] sm:h-[300px] md:h-[362px]'
            )}
            initial={ANIMATIONS.fadeInUp.initial}
            animate={ANIMATIONS.fadeInUp.animate}
            transition={{ ...ANIMATIONS.fadeInUp.transition, duration: 0.8, delay: 0.3 }}
        >
            {/* iPad Device Frame */}
            <DeviceFrameImage
                innerSrc={imgInnerScreen}
                innerAlt="Data points on top of landscape"
            />
        </motion.div>
    );
});
