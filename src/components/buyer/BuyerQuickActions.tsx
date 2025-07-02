import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Eye, MapPin, Quote, ExternalLink } from 'lucide-react';

interface BuyerQuickActionsProps {
  onShowInviteFlow?: () => void;
  onViewQuote?: (quoteId: string) => void;
  onFinancialWorkflow?: (orderData: any) => void;
}

const BuyerQuickActions = ({ onShowInviteFlow, onViewQuote, onFinancialWorkflow }: BuyerQuickActionsProps) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const mainActions = [
    {
      id: 'quotes',
      title: 'Review Quotes',
      description: 'Check new pricing proposals',
      icon: Quote,
      category: 'main'
    },
    {
      id: 'invite',
      title: 'Invite Team Member',
      description: 'Add agents or partners',
      icon: UserPlus,
      category: 'main',
      onClick: onShowInviteFlow
    },
    {
      id: 'inspection',
      title: 'Request Inspection',
      description: 'Schedule shipment check',
      icon: Eye,
      category: 'main'
    },
    {
      id: 'locations',
      title: 'Manage Locations',
      description: 'Update delivery ports',
      icon: MapPin,
      category: 'main'
    }
  ];

  const handleActionClick = (action: any) => {
    if (action.onClick) {
      action.onClick();
      return;
    }
    
    setSelectedAction(action.id);
    
    // Handle specific actions
    if (action.id === 'quotes') {
      onViewQuote?.('sample-quote-id');
    }
  };

  const handleRecordClick = (record: any, actionId: string) => {
    switch (actionId) {
      case 'quotes':
        onViewQuote?.(record.id);
        break;
      case 'inspection':
        console.log('Opening inspection details for:', record.id);
        // Add inspection detail navigation logic here
        break;
      case 'locations':
        console.log('Opening location details for:', record.id);
        // Add location detail navigation logic here
        break;
      default:
        console.log('Record clicked:', record);
    }
  };

  const getRecordsForAction = (actionId: string) => {
    switch (actionId) {
      case 'quotes':
        return [
          { id: 'Q-001', title: 'Carrara White Marble - 24 slabs', exporter: 'StoneX International', amount: '$42,500', status: 'Pending Review' },
          { id: 'Q-002', title: 'Nero Marquina Granite - 18 slabs', exporter: 'Granite Masters Ltd', amount: '$31,200', status: 'Approved' },
          { id: 'Q-003', title: 'Calacatta Gold Marble - 36 slabs', exporter: 'Premium Stone Co', amount: '$78,900', status: 'Under Negotiation' }
        ];
      case 'inspection':
        return [
          { id: 'INS-001', title: 'Carrara White Inspection', location: 'Mumbai Port', date: 'Dec 20, 2024', status: 'Scheduled' },
          { id: 'INS-002', title: 'Granite Quality Check', location: 'Delhi Warehouse', date: 'Dec 18, 2024', status: 'Completed' }
        ];
      case 'locations':
        return [
          { id: 'LOC-001', name: 'New York Warehouse', address: '123 Industrial Ave, Brooklyn, NY', type: 'Primary' },
          { id: 'LOC-002', name: 'Miami Distribution Center', address: '456 Port Blvd, Miami, FL', type: 'Secondary' },
          { id: 'LOC-003', name: 'Los Angeles Facility', address: '789 Commerce St, LA, CA', type: 'Backup' }
        ];
      default:
        return [];
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-stone-200 shadow-sm">
      <CardContent className="p-6 space-y-6">
        {/* Main Action Buttons - Always visible */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mainActions.map((action) => (
            <Button
              key={action.id}
              variant={selectedAction === action.id ? "default" : "outline"}
              className={`h-auto p-3 flex flex-col items-center space-y-2 min-h-[80px] text-center transition-all hover:scale-105 ${
                action.id === 'quotes' ? 'emerald-gradient text-white' : ''
              }`}
              onClick={() => handleActionClick(action)}
            >
              <action.icon className="w-4 h-4 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-medium text-xs leading-tight">{action.title}</div>
                <div className="text-xs opacity-80 leading-tight">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Records Display */}
        {selectedAction && (
          <div className="border-t border-stone-200 pt-6">
            <h3 className="text-sm font-medium text-stone-800 mb-4">
              {mainActions.find(a => a.id === selectedAction)?.title} Records
            </h3>
            <div className="space-y-3">
              {getRecordsForAction(selectedAction).map((record: any) => (
                <div 
                  key={record.id} 
                  className="flex items-center justify-between p-3 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer group"
                  onClick={() => handleRecordClick(record, selectedAction)}
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm text-stone-900 group-hover:text-emerald-700 transition-colors">
                      {record.title || record.name}
                    </p>
                    <p className="text-xs text-stone-600">
                      {record.exporter || record.location || record.address || record.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-medium text-stone-900">
                        {record.amount || record.status || record.type}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BuyerQuickActions;
