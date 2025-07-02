
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, UserPlus, Eye, MapPin, Heart, Quote, ClipboardList, Users, Building2, Shield } from 'lucide-react';

interface BuyerQuickActionsProps {
  onShowInviteFlow?: () => void;
  onViewQuote?: (quoteId: string) => void;
  onFinancialWorkflow?: (orderData: any) => void;
}

const BuyerQuickActions = ({ onShowInviteFlow, onViewQuote, onFinancialWorkflow }: BuyerQuickActionsProps) => {
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

  const quickAccessActions = [
    {
      title: 'Review Quotes',
      description: 'Check new pricing proposals',
      icon: Quote,
      action: () => onViewQuote?.('sample-quote-id')
    },
    {
      title: 'Track Orders',
      description: 'Monitor shipment status',
      icon: ClipboardList,
      action: () => onFinancialWorkflow?.({ invoiceId: 'sample-invoice', amount: { inr: '₹8,50,000', usd: '$10,200' }, buyer: 'Premium Stones LLC', status: 'pending' as const })
    },
    {
      title: 'View Bookmarks',
      description: 'Saved slab collections',
      icon: Heart,
      action: () => console.log('View bookmarks')
    },
    {
      title: 'My Agents',
      description: 'Assigned representatives',
      icon: Users,
      action: () => console.log('View agents')
    },
    {
      title: 'Locations',
      description: 'Delivery addresses',
      icon: Building2,
      action: () => console.log('View locations')
    },
    {
      title: 'Trust & Safety',
      description: 'Compliance status',
      icon: Shield,
      action: () => console.log('View trust badges')
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

        {/* Quick Access Accordion */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="quick-access" className="border border-stone-200 rounded-lg">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-stone-50 rounded-lg">
              <span className="text-sm font-medium text-stone-700">Quick Access Menu</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {quickAccessActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="h-auto p-3 flex flex-col items-center space-y-2 min-h-[80px] text-center border border-stone-200 hover:bg-stone-50 transition-colors"
                    onClick={action.action}
                  >
                    <action.icon className="w-4 h-4 flex-shrink-0 text-stone-600" />
                    <div className="space-y-1">
                      <div className="font-medium text-xs leading-tight text-stone-900">{action.title}</div>
                      <div className="text-xs text-stone-600 leading-tight">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default BuyerQuickActions;
