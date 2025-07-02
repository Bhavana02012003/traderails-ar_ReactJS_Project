
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  MapPin, 
  Clock, 
  Shield, 
  ChevronDown,
  AlertTriangle,
  Wifi
} from 'lucide-react';

interface Session {
  id: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  location: {
    city: string;
    country: string;
  };
  ipAddress: string;
  loginTime: Date;
  isCurrentDevice: boolean;
  lastActivity: Date;
}

interface SessionManagementProps {
  isAdmin?: boolean;
  userId?: string;
}

const SessionManagement = ({ isAdmin = false, userId }: SessionManagementProps) => {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      deviceType: 'desktop',
      browser: 'Chrome',
      os: 'macOS',
      location: { city: 'Mumbai', country: 'India' },
      ipAddress: '192.168.1.1',
      loginTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isCurrentDevice: true,
      lastActivity: new Date(),
    },
    {
      id: '2',
      deviceType: 'mobile',
      browser: 'Safari',
      os: 'iOS',
      location: { city: 'Dubai', country: 'UAE' },
      ipAddress: '10.0.0.1',
      loginTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isCurrentDevice: false,
      lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    },
    {
      id: '3',
      deviceType: 'tablet',
      browser: 'Chrome',
      os: 'Android',
      location: { city: 'Jaipur', country: 'India' },
      ipAddress: '172.16.0.1',
      loginTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      isCurrentDevice: false,
      lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    },
  ]);

  const [sessionToRevoke, setSessionToRevoke] = useState<string | null>(null);
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'mobile':
        return <Smartphone className="w-5 h-5" />;
      case 'tablet':
        return <Tablet className="w-5 h-5" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    setSessionToRevoke(null);
    console.log('Session revoked:', sessionId);
  };

  const toggleSessionExpansion = (sessionId: string) => {
    setExpandedSessions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        newSet.add(sessionId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-emerald-50/30 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 font-sora">
                {isAdmin ? 'Session Management' : 'Your Active Sessions'}
              </h1>
              <p className="text-stone-600 mt-1">
                {isAdmin 
                  ? 'Monitor and manage user sessions across the platform'
                  : 'See where you\'re logged in and manage device access'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card 
              key={session.id} 
              className={`
                bg-white/80 backdrop-blur-sm border-stone-200 shadow-sm hover:shadow-md 
                transition-all duration-300 overflow-hidden
                ${session.isCurrentDevice ? 'ring-2 ring-emerald-200 border-emerald-300' : ''}
              `}
            >
              <Collapsible
                open={expandedSessions.has(session.id)}
                onOpenChange={() => toggleSessionExpansion(session.id)}
              >
                <CollapsibleTrigger asChild>
                  <div className="w-full p-6 hover:bg-stone-50/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        {/* Device Icon */}
                        <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center">
                          {getDeviceIcon(session.deviceType)}
                        </div>

                        {/* Session Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-stone-900 truncate">
                              {session.browser} on {session.os}
                            </h3>
                            {session.isCurrentDevice && (
                              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-2 py-0">
                                This Device
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-stone-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{session.location.city}, {session.location.country}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>Active {formatTimeAgo(session.lastActivity)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        {!session.isCurrentDevice && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSessionToRevoke(session.id);
                            }}
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                          >
                            Revoke
                          </Button>
                        )}
                        <ChevronDown 
                          className={`w-4 h-4 text-stone-500 transition-transform duration-200 
                            ${expandedSessions.has(session.id) ? 'rotate-180' : ''}`} 
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-6 pb-6 pt-0 border-t border-stone-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                            Login Time
                          </label>
                          <p className="text-sm text-stone-900 mt-1">
                            {session.loginTime.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                            Last Activity
                          </label>
                          <p className="text-sm text-stone-900 mt-1">
                            {session.lastActivity.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                            IP Address
                          </label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Wifi className="w-3 h-3 text-stone-400" />
                            <p className="text-sm text-stone-900 font-mono">
                              {session.ipAddress}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                            Device Type
                          </label>
                          <p className="text-sm text-stone-900 mt-1 capitalize">
                            {session.deviceType}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Security Notice */}
        <Card className="mt-8 bg-amber-50/80 backdrop-blur-sm border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">
                  Security Tip
                </h3>
                <p className="text-sm text-amber-800">
                  Regularly review your active sessions and revoke access from devices you no longer use. 
                  If you notice suspicious activity, revoke all sessions and change your password immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revoke Confirmation Dialog */}
        <AlertDialog open={!!sessionToRevoke} onOpenChange={() => setSessionToRevoke(null)}>
          <AlertDialogContent className="bg-white/95 backdrop-blur-lg border-stone-200">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-stone-900">
                Revoke Session Access
              </AlertDialogTitle>
              <AlertDialogDescription className="text-stone-600">
                Are you sure you want to log out from this device? This action cannot be undone 
                and you'll need to log in again on that device.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-stone-200 hover:bg-stone-50">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => sessionToRevoke && handleRevokeSession(sessionToRevoke)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Revoke Access
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SessionManagement;
