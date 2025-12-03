import { memo } from 'react';
import { Section, SecondaryButton, CheckIcon, CloseIcon } from '@/components/common';
import { COMPARISON_COLUMNS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { ComparisonColumn, ComparisonFeature } from '@/types';

// ============================================================
// Specifications Table Section
// ============================================================

export const SpecificationsSection = memo(function SpecificationsSection() {
  return (
    <Section 
      id="specifications"
      className="flex flex-col gap-5 items-start overflow-clip"
      maxWidth="lg"
    >
      {/* Header Content */}
      <SpecsHeader />

      {/* Comparison Table */}
      <ComparisonTable />
    </Section>
  );
});

// ============================================================
// Specs Header
// ============================================================

const SpecsHeader = memo(function SpecsHeader() {
  return (
    <div className="relative shrink-0 w-full">
      {/* Top border */}
      <div
        aria-hidden="true"
        className="absolute border-t border-gray-400 inset-0 pointer-events-none"
      />

      <div className="flex flex-col items-center size-full">
        <div 
          className={cn(
            'box-border flex flex-col gap-8 sm:gap-10',
            'items-center px-4 sm:px-20 lg:px-60 py-12 sm:py-20',
            'relative w-full'
          )}
        >
          <div className="flex flex-col gap-8 sm:gap-10 items-center relative shrink-0 w-full">
            {/* Label */}
            <h2 
              className={cn(
                'font-roboto-mono font-normal leading-relaxed',
                'text-brand-green text-xs text-center tracking-tight'
              )}
            >
              Specs
            </h2>

            {/* Title */}
            <p 
              className={cn(
                'font-crimson leading-[0.9]',
                'text-[36px] sm:text-[48px] lg:text-[60px] text-black text-center',
                'tracking-[-1.08px] sm:tracking-[-1.44px] lg:tracking-[-1.8px]'
              )}
            >
              Why Choose Area?
            </p>

            {/* Description */}
            <p 
              className={cn(
                'font-dm-sans font-normal leading-relaxed',
                'text-gray-500 text-[15px] text-center tracking-tight',
                'max-w-2xl'
              )}
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              {`You need a solution that keeps up. That's why we developed Area. A developer-friendly approach to streamline your business.`}
            </p>

            {/* CTA */}
            <SecondaryButton>Discover More</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
});

// ============================================================
// Comparison Table
// ============================================================

const ComparisonTable = memo(function ComparisonTable() {
  return (
    <div 
      aria-label="Table comparing and contrasting the feature offerings of Area, WebSurge, and HyperView"
      className={cn(
        'box-border flex flex-col md:flex-row',
        'items-start overflow-x-auto',
        'p-0 relative rounded-[20px] shrink-0 w-full'
      )}
      role="table"
    >
      {COMPARISON_COLUMNS.map((column) => (
        <ComparisonColumnComponent key={column.id} column={column} />
      ))}
    </div>
  );
});

// ============================================================
// Comparison Column
// ============================================================

interface ComparisonColumnProps {
  column: ComparisonColumn;
}

const ComparisonColumnComponent = memo(function ComparisonColumnComponent({ 
  column 
}: ComparisonColumnProps) {
  const isHighlighted = column.isHighlighted;

  return (
    <section
      aria-label={`The features that are and are not included in ${column.name}'s offering`}
      className={cn(
        'basis-0 grow min-h-px min-w-[180px] sm:min-w-[200px]',
        'relative shrink-0',
        isHighlighted && 'bg-white rounded-[20px]'
      )}
      role="rowgroup"
    >
      <div 
        className={cn(
          'flex flex-col items-start min-w-inherit',
          'overflow-clip relative rounded-[inherit] w-full'
        )}
      >
        {/* Column Header */}
        <div 
          className="h-20 sm:h-24 relative shrink-0 w-full"
          role="columnheader"
        >
          <div
            aria-hidden="true"
            className="absolute border-b border-gray-400 inset-0 pointer-events-none"
          />
          <div className="flex flex-row justify-center size-full">
            <div 
              className={cn(
                'box-border flex gap-4 h-20 sm:h-24',
                'items-start justify-center px-4 sm:px-[30px] py-6 sm:py-10',
                'relative w-full'
              )}
            >
              <span 
                className={cn(
                  'font-dm-sans font-medium leading-none',
                  'text-lg sm:text-[25.714px] whitespace-nowrap',
                  'tracking-[-1.5px] sm:tracking-[-2.0571px]',
                  isHighlighted ? 'text-black' : 'text-gray-500'
                )}
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                {column.name}
              </span>
            </div>
          </div>
        </div>

        {/* Feature Rows */}
        {column.features.map((feature) => (
          <FeatureRow 
            key={feature.id} 
            feature={feature}
            isHighlighted={isHighlighted ?? false}
          />
        ))}
      </div>

      {/* Highlighted column border */}
      {isHighlighted && (
        <div
          aria-hidden="true"
          className={cn(
            'absolute border border-gray-200',
            'inset-0 pointer-events-none rounded-[20px]',
            'shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]'
          )}
        />
      )}
    </section>
  );
});

// ============================================================
// Feature Row
// ============================================================

interface FeatureRowProps {
  feature: ComparisonFeature;
  isHighlighted: boolean;
}

const FeatureRow = memo(function FeatureRow({ feature, isHighlighted }: FeatureRowProps) {
  const showCheck = feature.status === 'included';

  return (
    <div 
      className="relative shrink-0 w-full"
      role="row"
    >
      {/* Bottom border */}
      <div
        aria-hidden="true"
        className="absolute border-b-[0.5px] border-gray-200 inset-0 pointer-events-none"
      />

      <div className="flex flex-row items-center size-full" role="cell">
        <div 
          className={cn(
            'box-border flex gap-2',
            'items-center px-4 sm:px-[30px] py-6 sm:py-8',
            'relative w-full'
          )}
        >
          {/* Icon */}
          {showCheck ? (
            <CheckIcon 
              size={14} 
              color={isHighlighted ? '#485C11' : '#6F6F6F'} 
            />
          ) : (
            <CloseIcon size={14} color="#6F6F6F" />
          )}

          {/* Label */}
          <p 
            className={cn(
              'font-roboto-mono font-normal leading-relaxed',
              'text-xs text-black text-center whitespace-nowrap tracking-tight'
            )}
          >
            {feature.label}
          </p>
        </div>
      </div>
    </div>
  );
});
