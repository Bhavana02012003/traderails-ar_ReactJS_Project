
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Send, X, MoreVertical, Phone, Mail } from 'lucide-react';

interface PendingInvitesPanelProps {
  onBack: () => void;
}

const PendingInvitesPanel = ({ onBack }: PendingInvitesPanelProps) => {
  const [pendingInvites] = useState([
    {
      id: 'INV-001',
      email: 'john.doe@granite.com',
      phone: '+1 (555) 123-4567',
      role: 'Factory User',
      invitedBy: 'Sarah Chen',
      sentDate: '2024-01-15',
      expiresDate: '2024-01-18',
      status: 'Pending',
      attempts: 1,
    },
    {
      id: 'INV-002',
      email: 'maria.lopez@trader.com',
      phone: '+1 (555) 987-6543',
      role: 'Independent Trader',
      invitedBy: 'Mike Rodriguez',
      sentDate: '2024-01-14',
      expiresDate: '2024-01-17',
      status: 'Viewed',
      attempts: 2,
    },
    {
      id: 'INV-003',
      email: 'agent@buyers.com',
      phone: '+44 20 7123 4567',
      role: 'Buyer Agent',
      invitedBy: 'Sarah Chen',
      sentDate: '2024-01-13',
      expiresDate: '2024-01-16',
      status: 'Expired',
      attempts: 3,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Viewed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleResend = (inviteId: string) => {
    console.log('Resending invite:', inviteId);
    // Handle resend logic
  };

  const handleCancel = (inviteId: string) => {
    console.log('Canceling invite:', inviteId);
    // Handle cancel logic
  };

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Invite Form
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Pending Invitations</h2>
            <p className="text-stone-600">Manage and track your team invitations</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="glass-panel border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">2</p>
                <p className="text-stone-600 text-sm">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">1</p>
                <p className="text-stone-600 text-sm">Viewed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">1</p>
                <p className="text-stone-600 text-sm">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">6</p>
                <p className="text-stone-600 text-sm">Total Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invites List */}
      <Card className="glass-panel border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-stone-900">Active Invitations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingInvites.map((invite) => (
              <div key={invite.id} className="p-6 bg-white/50 rounded-xl border border-stone-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Contact Info */}
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-stone-200 to-stone-300 rounded-full flex items-center justify-center">
                        <span className="text-stone-700 font-semibold">
                          {invite.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-stone-900">{invite.role}</h4>
                          <Badge className={getStatusColor(invite.status)}>
                            {invite.status}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-stone-600">
                            <Mail className="w-3 h-3" />
                            <span>{invite.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-stone-600">
                            <Phone className="w-3 h-3" />
                            <span>{invite.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center space-x-6 text-sm text-stone-600">
                      <span>Invited by: <strong>{invite.invitedBy}</strong></span>
                      <span>Sent: {invite.sentDate}</span>
                      <span>Expires: {invite.expiresDate}</span>
                      <span>Attempts: {invite.attempts}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 ml-4">
                    {invite.status === 'Expired' ? (
                      <Button
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        onClick={() => handleResend(invite.id)}
                      >
                        <Send className="w-3 h-3 mr-1" />
                        Resend
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-stone-200 text-stone-600 hover:bg-stone-50"
                          onClick={() => handleResend(invite.id)}
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Resend
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCancel(invite.id)}
                        >
                          <X className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="ghost" className="text-stone-400 hover:text-stone-600">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingInvitesPanel;
