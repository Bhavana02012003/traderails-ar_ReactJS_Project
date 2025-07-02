
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Clock, ChevronRight } from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  type: 'Factory' | 'Exporter' | 'Buyer' | 'Trader';
  location: string;
  logo?: string;
  lastAccessed?: Date;
}

interface ChooseOrganizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizations: Organization[];
  onOrganizationSelect: (orgId: string) => void;
  userType: 'buyer' | 'exporter' | 'agent' | 'trader';
}

const ChooseOrganizationModal = ({
  open,
  onOpenChange,
  organizations,
  onOrganizationSelect,
  userType
}: ChooseOrganizationModalProps) => {
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [rememberChoice, setRememberChoice] = useState(false);

  // Only show modal for traders and agents
  const shouldShowModal = userType === 'trader' || userType === 'agent';

  // If user type doesn't support org switching, auto-select first org
  if (!shouldShowModal && organizations.length > 0) {
    onOrganizationSelect(organizations[0].id);
    return null;
  }

  const getOrgTypeColor = (type: string) => {
    switch (type) {
      case 'Factory':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Exporter':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Buyer':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Trader':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatLastAccessed = (date?: Date) => {
    if (!date) return null;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleEnterWorkspace = () => {
    if (selectedOrg) {
      if (rememberChoice) {
        localStorage.setItem('preferredOrganization', selectedOrg);
      }
      onOrganizationSelect(selectedOrg);
    }
  };

  const handleOrgSelect = (orgId: string) => {
    setSelectedOrg(orgId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-white/95 backdrop-blur-lg border-0 shadow-2xl overflow-hidden">
        <DialogTitle className="sr-only">Choose Organization</DialogTitle>
        
        {/* Header */}
        <div className="text-center py-6 px-6 bg-gradient-to-br from-stone-50 to-white border-b border-stone-100">
          <div className="w-16 h-16 emerald-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Choose your Organization</h2>
          <p className="text-stone-600">
            You're associated with multiple organizations. Select which workspace to enter.
          </p>
        </div>

        {/* Organization List */}
        <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
          {organizations.map((org) => (
            <div
              key={org.id}
              onClick={() => handleOrgSelect(org.id)}
              className={`
                relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md
                ${selectedOrg === org.id 
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-lg' 
                  : 'border-stone-200 bg-white hover:border-stone-300'
                }
              `}
            >
              <div className="flex items-center space-x-4">
                {/* Logo/Avatar */}
                <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                  <AvatarImage src={org.logo} alt={org.name} />
                  <AvatarFallback className="bg-gradient-to-br from-stone-500 to-stone-600 text-white font-semibold">
                    {getInitials(org.name)}
                  </AvatarFallback>
                </Avatar>

                {/* Organization Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-stone-900 truncate">{org.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={`text-xs px-2 py-0.5 ${getOrgTypeColor(org.type)}`}
                    >
                      {org.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-stone-600 space-x-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{org.location}</span>
                    </div>
                    
                    {org.lastAccessed && (
                      <div className="flex items-center space-x-1 text-stone-500">
                        <Clock className="w-3 h-3" />
                        <span className="whitespace-nowrap">{formatLastAccessed(org.lastAccessed)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selection Indicator */}
                <div className="flex items-center">
                  {selectedOrg === org.id ? (
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-stone-300 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 space-y-4">
          {/* Remember Choice */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberChoice}
              onChange={(e) => setRememberChoice(e.target.checked)}
              className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="remember" className="text-sm text-stone-600">
              Remember my choice for next time
            </label>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleEnterWorkspace}
            disabled={!selectedOrg}
            className="w-full h-12 emerald-gradient text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enter Workspace
          </Button>

          {/* Help Text */}
          <p className="text-xs text-stone-500 text-center">
            Need to switch later? Use the organization switcher in your sidebar.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseOrganizationModal;
