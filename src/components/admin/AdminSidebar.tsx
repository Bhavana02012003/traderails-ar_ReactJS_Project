
import { BarChart3, Users, Shield, AlertTriangle, CreditCard, FileCheck, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const menuItems = [
    { icon: BarChart3, label: 'Overview', active: true },
    { icon: Users, label: 'User Management' },
    { icon: Shield, label: 'KYC & Compliance' },
    { icon: CreditCard, label: 'Transactions' },
    { icon: AlertTriangle, label: 'Disputes' },
    { icon: FileCheck, label: 'Partner Health' },
    { icon: Settings, label: 'Platform Settings' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-50 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-lg font-semibold">Admin Panel</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-white hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
