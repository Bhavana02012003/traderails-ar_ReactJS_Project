
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Zap, Award, Lock } from 'lucide-react';

const TrustBadges = () => {
  const trustFeatures = [
    {
      icon: Shield,
      title: 'Escrow Protected',
      description: 'Your payments are secure until delivery confirmation',
      partner: 'YesBank Escrow'
    },
    {
      icon: Lock,
      title: 'FX Hedged',
      description: 'Currency rates locked at time of order',
      partner: 'WiseFX'
    },
    {
      icon: Award,
      title: 'AI-Graded Slabs',
      description: 'Every slab verified by advanced AI quality assessment',
      partner: 'TradeRails AI'
    },
    {
      icon: Zap,
      title: 'Express Shipping',
      description: 'Premium logistics with real-time tracking',
      partner: 'Global Freight'
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-stone-50 border border-emerald-200">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-stone-900 mb-2">Your Trade is Protected</h3>
          <p className="text-sm text-stone-600">Every order includes comprehensive protection and verification</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="inline-flex p-3 bg-emerald-100 rounded-full">
                <feature.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="font-medium text-stone-900">{feature.title}</h4>
              <p className="text-xs text-stone-600">{feature.description}</p>
              <p className="text-xs font-medium text-emerald-600">{feature.partner}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustBadges;
