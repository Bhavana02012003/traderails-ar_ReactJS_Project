
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Building, MapPin, ChevronDown, Check } from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  type: 'Factory' | 'Exporter' | 'Buyer' | 'Trader';
  location: string;
  logo?: string;
}

interface OrganizationSwitcherProps {
  currentOrg: Organization;
  organizations: Organization[];
  onOrganizationChange: (orgId: string) => void;
  className?: string;
}

const OrganizationSwitcher = ({ 
  currentOrg, 
  organizations, 
  onOrganizationChange,
  className = ""
}: OrganizationSwitcherProps) => {
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

  const handleOrgSwitch = (orgId: string) => {
    if (orgId !== currentOrg.id) {
      // Update localStorage preference
      localStorage.setItem('preferredOrganization', orgId);
      onOrganizationChange(orgId);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`w-full justify-between bg-white/80 backdrop-blur-sm border-stone-200 hover:bg-white/90 ${className}`}
        >
          <div className="flex items-center space-x-3 min-w-0">
            <Avatar className="w-8 h-8 border border-stone-200">
              <AvatarImage src={currentOrg.logo} alt={currentOrg.name} />
              <AvatarFallback className="bg-gradient-to-br from-stone-500 to-stone-600 text-white text-xs font-semibold">
                {getInitials(currentOrg.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0 text-left">
              <div className="font-medium text-stone-900 truncate text-sm">
                {currentOrg.name}
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="outline" 
                  className={`text-xs px-1.5 py-0 ${getOrgTypeColor(currentOrg.type)}`}
                >
                  {currentOrg.type}
                </Badge>
              </div>
            </div>
          </div>
          
          <ChevronDown className="w-4 h-4 text-stone-500 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-80 bg-white/95 backdrop-blur-lg border-stone-200 shadow-xl"
        align="start"
      >
        <DropdownMenuLabel className="text-stone-600 font-normal">
          Switch Organization
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-stone-200" />
        
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => handleOrgSwitch(org.id)}
            className="p-3 cursor-pointer hover:bg-stone-50 focus:bg-stone-50"
          >
            <div className="flex items-center space-x-3 w-full">
              <Avatar className="w-10 h-10 border border-stone-200">
                <AvatarImage src={org.logo} alt={org.name} />
                <AvatarFallback className="bg-gradient-to-br from-stone-500 to-stone-600 text-white font-semibold">
                  {getInitials(org.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-stone-900 truncate">{org.name}</span>
                  {org.id === currentOrg.id && (
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs px-2 py-0.5 ${getOrgTypeColor(org.type)}`}
                  >
                    {org.type}
                  </Badge>
                  
                  <div className="flex items-center space-x-1 text-xs text-stone-500">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{org.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrganizationSwitcher;
