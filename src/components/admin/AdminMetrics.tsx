
import { TrendingUp, Users, DollarSign, Truck, AlertCircle, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AdminMetrics = () => {
  const metrics = [
    {
      title: 'Active Exporters',
      value: '1,247',
      change: '+12%',
      positive: true,
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Active Buyers',
      value: '892',
      change: '+8%',
      positive: true,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Volume in Escrow',
      value: '$2.4M',
      change: '+24%',
      positive: true,
      icon: DollarSign,
      color: 'bg-emerald-500'
    },
    {
      title: 'In-Transit Shipments',
      value: '156',
      change: '-3%',
      positive: false,
      icon: Truck,
      color: 'bg-orange-500'
    },
    {
      title: 'Pending Disputes',
      value: '23',
      change: '+2',
      positive: false,
      icon: AlertCircle,
      color: 'bg-red-500'
    },
    {
      title: 'Platform Revenue',
      value: '$127K',
      change: '+18%',
      positive: true,
      icon: BarChart3,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${metric.color} flex items-center justify-center`}>
                <metric.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-sm font-medium ${
                metric.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
            <div className="text-sm text-slate-600">{metric.title}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminMetrics;
