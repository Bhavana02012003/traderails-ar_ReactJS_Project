
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, UserPlus, Eye, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface BuyerQuickActionsProps {
  onShowInviteFlow?: () => void;
  children?: React.ReactNode;
}

const BuyerQuickActions = ({ onShowInviteFlow, children }: BuyerQuickActionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      title: 'Browse Marketplace',
      description: 'Discover premium slabs',
      icon: Search,
      variant: 'default' as const,
      className: 'emerald-gradient text-white'
    },
    {
      title: 'Invite Team Member',
      description: 'Add agents or partners',
      icon: UserPlus,
      variant: 'outline' as const,
      onClick: onShowInviteFlow
    },
    {
      title: 'Request Inspection',
      description: 'Schedule shipment check',
      icon: Eye,
      variant: 'outline' as const
    },
    {
      title: 'Manage Locations',
      description: 'Update delivery ports',
      icon: MapPin,
      variant: 'outline' as const
    }
  ];

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-stone-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-stone-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className={`h-auto p-3 flex flex-col items-center space-y-2 min-h-[80px] text-center ${action.className || ''}`}
              onClick={action.onClick}
            >
              <action.icon className="w-5 h-5 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-medium text-xs leading-tight">{action.title}</div>
                <div className="text-xs opacity-75 leading-tight">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Collapsible Menu for Other Sections */}
        {children && (
          <div className="border-t border-stone-200 pt-4">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full justify-between p-2 h-auto"
            >
              <span className="text-sm font-medium text-stone-700">View More Sections</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-stone-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-stone-500" />
              )}
            </Button>
            
            {isExpanded && (
              <div className="mt-4 space-y-4">
                {children}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BuyerQuickActions;
