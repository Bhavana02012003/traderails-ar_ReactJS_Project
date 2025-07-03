
import React from 'react';
import { Shield, Lock, TrendingUp, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  variant: 'credit' | 'escrow' | 'fx-lock';
  className?: string;
  size?: 'sm' | 'md';
  isActive?: boolean;
}

const StatusBadge = ({ variant, className, size = 'md', isActive = false }: StatusBadgeProps) => {
  const configs = {
    credit: {
      icon: CreditCard,
      label: 'Credit Backed',
      description: 'This transaction is backed by verified credit facilities, ensuring secure payment processing.',
      colors: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900'
    },
    escrow: {
      icon: Shield,
      label: 'Escrow Secured',
      description: 'Funds are held in secure escrow until delivery confirmation and quality verification.',
      colors: 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900'
    },
    'fx-lock': {
      icon: TrendingUp,
      label: 'FX Rate Locked',
      description: 'Exchange rate is locked to protect against currency fluctuations during the transaction period.',
      colors: 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300 dark:hover:bg-amber-900'
    }
  };

  const config = configs[variant];
  const Icon = config.icon;

  // Add special glow effect for active escrow status
  const glowEffect = variant === 'escrow' && isActive ? 'animate-pulse shadow-lg shadow-blue-400/50' : '';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              'inline-flex items-center gap-1.5 transition-all duration-300 hover:scale-105 cursor-help border-2 relative',
              config.colors,
              size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1',
              glowEffect,
              className
            )}
          >
            {/* Add special glow ring for active escrow */}
            {variant === 'escrow' && isActive && (
              <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping"></div>
            )}
            <Icon className={cn(
              'flex-shrink-0 relative z-10',
              size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
            )} />
            <span className="font-medium relative z-10">
              {variant === 'escrow' && isActive ? 'Funds Locked' : config.label}
            </span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-xs p-3 bg-white dark:bg-gray-900 border border-stone-200 dark:border-stone-700 shadow-lg animate-fade-in"
        >
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {variant === 'escrow' && isActive 
              ? 'Funds are securely locked in escrow and will be released upon successful delivery confirmation.'
              : config.description
            }
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface StatusBadgeGroupProps {
  statuses: Array<'credit' | 'escrow' | 'fx-lock'>;
  className?: string;
  size?: 'sm' | 'md';
  activeStatuses?: Array<'credit' | 'escrow' | 'fx-lock'>;
}

const StatusBadgeGroup = ({ statuses, className, size = 'md', activeStatuses = [] }: StatusBadgeGroupProps) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {statuses.map((status, index) => (
        <div
          key={status}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <StatusBadge 
            variant={status} 
            size={size} 
            isActive={activeStatuses.includes(status)}
          />
        </div>
      ))}
    </div>
  );
};

export { StatusBadge, StatusBadgeGroup };
