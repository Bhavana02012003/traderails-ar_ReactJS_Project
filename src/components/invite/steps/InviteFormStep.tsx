
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Phone, Mail, MessageSquare, Send } from 'lucide-react';
import { InviteData } from '../InviteUserFlow';

interface InviteFormStepProps {
  data: InviteData;
  updateData: (data: Partial<InviteData>) => void;
  onInviteSent: () => void;
}

const InviteFormStep = ({ data, updateData, onInviteSent }: InviteFormStepProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: 'factory-user', label: 'Factory User', description: 'Manages production and inventory' },
    { value: 'independent-trader', label: 'Independent Trader', description: 'Buys and sells independently' },
    { value: 'buyer-agent', label: 'Buyer Agent', description: 'Represents buyers in transactions' },
    { value: 'finance-manager', label: 'Finance Manager', description: 'Handles financial operations' },
    { value: 'compliance-officer', label: 'Compliance Officer', description: 'Ensures regulatory compliance' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    onInviteSent();
  };

  const canSubmit = data.role && data.phoneNumber;

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-stone-900 mb-2">Invite Team Member</h2>
        <p className="text-stone-600 text-lg">Add a new member to your TradeRails organization</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* Role Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold text-stone-800">
            Select Role <span className="text-red-500">*</span>
          </Label>
          <Select value={data.role} onValueChange={(value) => updateData({ role: value })}>
            <SelectTrigger className="h-14 bg-white/70 border-stone-200 focus:border-emerald-500">
              <SelectValue placeholder="Choose a role for this team member" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-stone-200">
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value} className="p-4">
                  <div>
                    <div className="font-medium text-stone-900">{role.label}</div>
                    <div className="text-sm text-stone-600">{role.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Phone Number */}
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-base font-semibold text-stone-800">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <div className="flex space-x-3">
            <Select defaultValue="+1">
              <SelectTrigger className="w-24 h-14 bg-white/70 border-stone-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-stone-200">
                <SelectItem value="+1">+1</SelectItem>
                <SelectItem value="+44">+44</SelectItem>
                <SelectItem value="+91">+91</SelectItem>
                <SelectItem value="+86">+86</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={data.phoneNumber}
              onChange={(e) => updateData({ phoneNumber: e.target.value })}
              className="flex-1 h-14 bg-white/70 border-stone-200 focus:border-emerald-500 text-base"
            />
          </div>
          <p className="text-sm text-stone-600">Primary contact method - invite will be sent via WhatsApp/SMS</p>
        </div>

        {/* Email (Optional) */}
        <div className="space-y-3">
          <Label htmlFor="email" className="text-base font-semibold text-stone-800">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address (Optional)
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="member@company.com"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className="h-14 bg-white/70 border-stone-200 focus:border-emerald-500 text-base"
          />
          <p className="text-sm text-stone-600">Backup contact method and for account notifications</p>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <Label htmlFor="notes" className="text-base font-semibold text-stone-800">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Role Description / Notes
          </Label>
          <Textarea
            id="notes"
            placeholder="Add specific responsibilities, access levels, or welcome message..."
            value={data.notes}
            onChange={(e) => updateData({ notes: e.target.value })}
            className="min-h-[100px] bg-white/70 border-stone-200 focus:border-emerald-500 text-base resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            disabled={!canSubmit || isLoading}
            className="w-full h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Sending Invite...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Send Invite</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InviteFormStep;
