
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, UserPlus, Eye, MapPin, ChevronDown, ChevronRight } from 'lucide-react';

interface BuyerQuickActionsProps {
  onShowInviteFlow?: () => void;
}

const BuyerQuickActions = ({ onShowInviteFlow }: BuyerQuickActionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mainActions = [
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
    <Card className="bg-white/80 backdrop-blur-sm border border-stone-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-stone-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {mainActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className={`h-auto p-4 flex flex-col items-center space-y-2 min-h-[90px] text-center transition-all hover:scale-105 ${action.className || ''}`}
              onClick={action.onClick}
            >
              <action.icon className="w-5 h-5 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-medium text-sm leading-tight">{action.title}</div>
                <div className="text-xs opacity-80 leading-tight">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Collapsible More Actions */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-3 h-auto border border-stone-200 hover:bg-stone-50 transition-colors"
            >
              <span className="text-sm font-medium text-stone-700">More Dashboard Sections</span>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-stone-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-stone-500" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-0">
            <div className="pt-4 text-center">
              <p className="text-sm text-stone-600 mb-2">Additional sections will appear below</p>
              <div className="w-12 h-px bg-stone-300 mx-auto"></div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default BuyerQuickActions;
