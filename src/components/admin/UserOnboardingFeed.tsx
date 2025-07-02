
import { UserPlus, Building, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const UserOnboardingFeed = () => {
  const newUsers = [
    {
      id: 'USR-001',
      name: 'Sarah Chen',
      email: 'sarah@stonecraft.com',
      org: 'Stone Craft Co.',
      role: 'Factory Manager',
      status: 'Pending Approval',
      joinedDate: '2024-01-15'
    },
    {
      id: 'USR-002',
      name: 'Mike Rodriguez',
      email: 'mike@graniteworld.com',
      org: 'Granite World Ltd.',
      role: 'Trader',
      status: 'Invite Sent',
      joinedDate: '2024-01-14'
    },
    {
      id: 'USR-003',
      name: 'Priya Sharma',
      email: 'priya@marbleplus.in',
      org: 'Marble Plus India',
      role: 'Export Manager',
      status: 'Active',
      joinedDate: '2024-01-13'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Invite Sent': return 'bg-blue-100 text-blue-800';
      case 'Active': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">User Onboarding Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newUsers.map((user) => (
            <div key={user.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{user.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600 mt-1">
                      <Building className="w-3 h-3" />
                      <span>{user.org} • {user.role}</span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(user.status)}>
                  {user.status}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  Approve
                </Button>
                <Button size="sm" variant="destructive">
                  Deactivate
                </Button>
                <Button size="sm" variant="outline">
                  Assign Role
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserOnboardingFeed;
