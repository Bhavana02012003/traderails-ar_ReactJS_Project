
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, MessageSquare, MapPin, Star } from 'lucide-react';

const AssignedAgents = () => {
  const agents = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Quality Inspector',
      location: 'Mumbai Port',
      status: 'On-site',
      rating: 4.9,
      activeOrders: 3,
      phone: '+91 98765 43210',
      avatar: '/placeholder.svg',
      specialization: 'Marble & Granite QC'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Logistics Coordinator',
      location: 'Chennai Factory',
      status: 'Available',
      rating: 4.8,
      activeOrders: 2,
      phone: '+91 87654 32109',
      avatar: '/placeholder.svg',
      specialization: 'Export Documentation'
    },
    {
      id: 3,
      name: 'Ahmed Hassan',
      role: 'Technical Inspector',
      location: 'Bangalore Facility',
      status: 'Inspection',
      rating: 4.7,
      activeOrders: 4,
      phone: '+91 76543 21098',
      avatar: '/placeholder.svg',
      specialization: 'Surface Finishing'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On-site': return 'bg-green-100 text-green-800';
      case 'Available': return 'bg-blue-100 text-blue-800';
      case 'Inspection': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-stone-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-stone-900">Assigned Buyer Agents</CardTitle>
          <Button variant="outline" size="sm">
            Add Agent
          </Button>
        </div>
      </CardHeader>
     <CardContent className="space-y-4">
  {agents.map((agent) => (
    <div key={agent.id} className="border border-stone-200 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={agent.avatar} alt={agent.name} />
          <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-stone-900">{agent.name}</h3>
              <p className="text-sm text-stone-600">{agent.role}</p>
            </div>
            <Badge className={getStatusColor(agent.status)}>
              {agent.status}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-stone-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {agent.location}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              {agent.rating}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="text-sm">
              <span className="text-stone-600">Specialization: </span>
              <span className="font-medium">{agent.specialization}</span>
            </div>
            <div className="text-sm">
              <span className="text-stone-600">Active Orders: </span>
              <span className="font-medium">{agent.activeOrders}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button variant="outline" size="sm" className="w-full sm:flex-1">
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:flex-1">
              <MessageSquare className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  ))}
</CardContent>

    </Card>
  );
};

export default AssignedAgents;
