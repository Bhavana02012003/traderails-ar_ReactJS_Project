
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, UserPlus, Eye, MapPin } from 'lucide-react';

interface BuyerQuickActionsProps {
  onShowInviteFlow?: () => void;
}

const BuyerQuickActions = ({ onShowInviteFlow }: BuyerQuickActionsProps) => {
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
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className={`h-auto p-4 flex flex-col items-center space-y-3 min-h-[100px] ${action.className || ''}`}
              onClick={action.onClick}
            >
              <action.icon className="w-6 h-6 flex-shrink-0" />
              <div className="text-center space-y-1">
                <div className="font-medium text-sm leading-tight">{action.title}</div>
                <div className="text-xs opacity-75 leading-tight">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerQuickActions;
