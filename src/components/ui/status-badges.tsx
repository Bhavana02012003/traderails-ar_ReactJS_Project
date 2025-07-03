
import React from 'react';
import { Shield, Lock, TrendingUp, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  variant: 'credit' | 'escrow' | 'fx-lock';
  className?: string;
  size?: 'sm' | 'md';
}

const StatusBadge = ({ variant, className, size = 'md' }: StatusBadgeProps) => {
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

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              'inline-flex items-center gap-1.5 transition-all duration-200 hover:scale-105 cursor-help border-2',
              config.colors,
              size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1',
              className
            )}
          >
            <Icon className={cn(
              'flex-shrink-0',
              size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
            )} />
            <span className="font-medium">{config.label}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-xs p-3 bg-white dark:bg-gray-900 border border-stone-200 dark:border-stone-700 shadow-lg"
        >
          <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {config.description}
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
}

const StatusBadgeGroup = ({ statuses, className, size = 'md' }: StatusBadgeGroupProps) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {statuses.map((status) => (
        <StatusBadge key={status} variant={status} size={size} />
      ))}
    </div>
  );
};

export { StatusBadge, StatusBadgeGroup };
