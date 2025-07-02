
import { Card, CardContent } from '@/components/ui/card';
import { Package, Shield, Users, AlertTriangle } from 'lucide-react';

const BuyerSummaryCards = () => {
  const summaryData = [
    {
      title: 'Upcoming Deliveries',
      value: '12',
      subtitle: 'Next: Dec 15, 2024',
      icon: Package,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Orders in Escrow',
      value: '$1.2M',
      subtitle: '8 active orders',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Agents Assigned',
      value: '5',
      subtitle: '3 on-site inspections',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Unresolved Disputes',
      value: '1',
      subtitle: 'Grade verification pending',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => (
        <Card key={index} className="bg-white/70 backdrop-blur-sm border border-stone-200 hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-stone-600">{item.title}</p>
                <p className="text-2xl font-bold text-stone-900">{item.value}</p>
                <p className="text-xs text-stone-500">{item.subtitle}</p>
              </div>
              <div className={`p-3 rounded-lg ${item.bgColor}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BuyerSummaryCards;
