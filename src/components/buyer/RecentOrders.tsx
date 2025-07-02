import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Eye, Truck, Shield, CreditCard } from 'lucide-react';

interface RecentOrdersProps {
  expanded?: boolean;
  onFinancialWorkflow?: (orderData: {
    invoiceId: string;
    amount: { inr: string; usd: string };
    buyer: string;
    status: 'approved' | 'pending' | 'rejected';
  }) => void;
  onTrackShipment?: (shipmentId: string) => void;
}

const RecentOrders = ({ expanded = false, onFinancialWorkflow, onTrackShipment }: RecentOrdersProps) => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const orders = [
    {
      id: 'INV-2024-0156',
      exporter: 'StoneX International',
      slabSummary: '24x Carrara White Quartz',
      status: 'In Transit',
      statusColor: 'bg-blue-100 text-blue-800',
      deliveryDate: 'Dec 15, 2024',
      escrowAmount: '$125,000',
      fxLocked: true,
      buyer: 'Rohan Marble Imports (NY, USA)',
      amount: {
        inr: "₹18,45,000",
        usd: "USD $22,100"
      },
      workflowStatus: 'approved' as const,
      timeline: [
        { step: 'Order Placed', completed: true, date: 'Nov 20' },
        { step: 'Factory QC', completed: true, date: 'Nov 25' },
        { step: 'Shipped', completed: true, date: 'Dec 1' },
        { step: 'In Transit', completed: true, date: 'Dec 5' },
        { step: 'Delivered', completed: false, date: 'Dec 15' }
      ]
    },
    {
      id: 'INV-2024-0148',
      exporter: 'Granite Masters Ltd',
      slabSummary: '18x Nero Marquina Granite',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800',
      deliveryDate: 'Completed',
      escrowAmount: '$89,500',
      fxLocked: true,
      buyer: 'Premium Stone Trading Co. (Dubai, UAE)',
      amount: {
        inr: "₹12,35,000",
        usd: "USD $14,800"
      },
      workflowStatus: 'approved' as const,
      timeline: [
        { step: 'Order Placed', completed: true, date: 'Oct 15' },
        { step: 'Factory QC', completed: true, date: 'Oct 20' },
        { step: 'Shipped', completed: true, date: 'Oct 28' },
        { step: 'In Transit', completed: true, date: 'Nov 5' },
        { step: 'Delivered', completed: true, date: 'Nov 12' }
      ]
    },
    {
      id: 'INV-2024-0142',
      exporter: 'Premium Stone Co',
      slabSummary: '36x Calacatta Gold Marble',
      status: 'Booked',
      statusColor: 'bg-yellow-100 text-yellow-800',
      deliveryDate: 'Jan 10, 2025',
      escrowAmount: '$245,000',
      fxLocked: false,
      buyer: 'Marble Palace Inc. (Los Angeles, USA)',
      amount: {
        inr: "₹32,80,000",
        usd: "USD $39,300"
      },
      workflowStatus: 'pending' as const,
      timeline: [
        { step: 'Order Placed', completed: true, date: 'Dec 1' },
        { step: 'Factory QC', completed: false, date: 'Dec 12' },
        { step: 'Shipped', completed: false, date: 'Dec 20' },
        { step: 'In Transit', completed: false, date: 'Dec 28' },
        { step: 'Delivered', completed: false, date: 'Jan 10' }
      ]
    }
  ];

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleFinancialWorkflowClick = (order: typeof orders[0]) => {
    if (onFinancialWorkflow) {
      onFinancialWorkflow({
        invoiceId: order.id,
        amount: order.amount,
        buyer: order.buyer,
        status: order.workflowStatus
      });
    }
  };

  const handleTrackClick = (orderId: string) => {
    if (onTrackShipment) {
      onTrackShipment(orderId);
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-stone-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-stone-900">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.slice(0, expanded ? orders.length : 3).map((order) => (
          <div key={order.id} className="border border-stone-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium text-stone-900">{order.id}</span>
                  <Badge className={order.statusColor}>{order.status}</Badge>
                  {order.fxLocked && (
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                      <Shield className="w-3 h-3 mr-1" />
                      FX Locked
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-stone-600">{order.exporter} · {order.slabSummary}</p>
                <p className="text-sm text-stone-500">Delivery: {order.deliveryDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleTrackClick(order.id)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Track
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFinancialWorkflowClick(order)}
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <CreditCard className="w-4 h-4 mr-1" />
                  Workflow
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleOrderExpansion(order.id)}
                >
                  {expandedOrders.includes(order.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {expandedOrders.includes(order.id) && (
              <div className="border-t border-stone-200 pt-3 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Escrow Amount:</span>
                  <span className="font-medium">{order.escrowAmount}</span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-stone-700">Order Timeline:</p>
                  <div className="flex items-center justify-between">
                    {order.timeline.map((step, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          step.completed 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : 'bg-stone-100 border-stone-300 text-stone-400'
                        }`}>
                          {index + 1}
                        </div>
                        <p className="text-xs text-center mt-1 text-stone-600">{step.step}</p>
                        <p className="text-xs text-stone-500">{step.date}</p>
                        {index < order.timeline.length - 1 && (
                          <div className={`h-0.5 w-full mt-2 ${
                            step.completed ? 'bg-emerald-500' : 'bg-stone-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {!expanded && orders.length > 3 && (
          <Button variant="outline" className="w-full">
            View All Orders ({orders.length})
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
