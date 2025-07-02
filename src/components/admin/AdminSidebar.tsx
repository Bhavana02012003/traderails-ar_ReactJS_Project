
import { BarChart3, Users, Shield, AlertTriangle, CreditCard, FileCheck, Settings, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const AdminSidebar = ({ collapsed, onToggle, activeSection, onSectionChange, onLogout }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'users', icon: Users, label: 'User Management' },
    { id: 'kyc', icon: Shield, label: 'KYC & Compliance' },
    { id: 'transactions', icon: CreditCard, label: 'Transactions' },
    { id: 'disputes', icon: AlertTriangle, label: 'Disputes' },
    { id: 'partners', icon: FileCheck, label: 'Partner Health' },
    { id: 'settings', icon: Settings, label: 'Platform Settings' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 z-50 shadow-2xl ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-lg font-semibold">Admin Panel</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-slate-700/50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 text-left ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="border-t border-slate-700 pt-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 text-left text-slate-300 hover:bg-red-600/20 hover:text-red-300"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
