
import { Plus, Upload, Download, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface QuickActionsPanelProps {
  onShowInviteFlow?: () => void;
}

const QuickActionsPanel = ({ onShowInviteFlow }: QuickActionsPanelProps) => {
  return (
    <Card className="glass-panel border-0">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-stone-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button className="emerald-gradient text-white hover:shadow-lg transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            Add New Listing
          </Button>
          <Button variant="outline" className="hover:bg-stone-50 transition-all duration-300">
            <Upload className="w-4 h-4 mr-2" />
            Upload AI Grading Data
          </Button>
          <Button variant="outline" className="hover:bg-stone-50 transition-all duration-300">
            <Download className="w-4 h-4 mr-2" />
            Download KYC Report
          </Button>
          {onShowInviteFlow && (
            <Button 
              variant="outline" 
              onClick={onShowInviteFlow}
              className="hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all duration-300"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Team Member
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsPanel;
