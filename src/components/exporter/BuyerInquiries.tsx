
import { MessageSquare, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BuyerInquiriesProps {
  detailed?: boolean;
}

const BuyerInquiries = ({ detailed = false }: BuyerInquiriesProps) => {
  const inquiries = [
    {
      id: 'INQ-001',
      buyer: 'Stone Imports LLC',
      slabId: 'SX-4201',
      message: 'Interested in bulk order of Imperial Red granite. Can you provide better pricing for 50+ slabs?',
      timestamp: '2 hours ago',
      urgent: true,
      country: 'USA'
    },
    {
      id: 'INQ-002',
      buyer: 'European Stone Co.',
      slabId: 'SX-4203',
      message: 'Please confirm availability and shipping timeline to Hamburg port.',
      timestamp: '5 hours ago',
      urgent: false,
      country: 'Germany'
    },
    {
      id: 'INQ-003',
      buyer: 'Middle East Stones',
      slabId: 'SX-4202',
      message: 'Need technical specifications and certificates for this Calacatta Gold quartz.',
      timestamp: '1 day ago',
      urgent: false,
      country: 'UAE'
    }
  ];

  return (
    <Card className="glass-panel border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            Buyer Inquiries
          </span>
          <Badge className="bg-emerald-100 text-emerald-800">
            {inquiries.filter(i => i.urgent).length} urgent
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {inquiries.map((inquiry, index) => (
          <div key={inquiry.id}>
            <div className="space-y-3 p-4 bg-white/50 rounded-xl">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-stone-900">{inquiry.buyer}</h4>
                    {inquiry.urgent && (
                      <Badge className="bg-red-100 text-red-800 text-xs">Urgent</Badge>
                    )}
                  </div>
                  <p className="text-sm text-stone-600">
                    Re: Slab {inquiry.slabId} • {inquiry.country} • {inquiry.timestamp}
                  </p>
                </div>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed">
                {inquiry.message}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <Button size="sm" className="emerald-gradient text-white">
                  Accept
                </Button>
                <Button size="sm" variant="outline">
                  Negotiate
                </Button>
                <Button size="sm" variant="ghost" className="text-stone-500">
                  Ignore
                </Button>
                <Button size="sm" variant="outline" className="ml-auto flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  WhatsApp
                </Button>
              </div>
            </div>
            {index < inquiries.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BuyerInquiries;
