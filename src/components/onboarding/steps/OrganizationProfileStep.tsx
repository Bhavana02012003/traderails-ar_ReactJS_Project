
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Upload, Building, Mail, Phone, User } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface OrganizationProfileStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const OrganizationProfileStep = ({ data, updateData, onNext, onPrev }: OrganizationProfileStepProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isTrader = data.role === 'trader';

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateData({ logo: file });
    }
  };

  const canProceed = () => {
    if (isTrader) {
      // For traders, only require contact details and terms acceptance
      return data.contactEmail && data.contactPhone && data.termsAccepted;
    }
    // For other roles, require all organization details
    return data.orgName && data.orgType && data.contactEmail && data.contactPhone && data.termsAccepted;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
          {isTrader ? 'Personal Profile' : 'Organization Profile'}
        </h2>
        <p className="text-stone-600">
          {isTrader 
            ? 'As an independent trader, provide your personal details. Organization information is optional.'
            : 'Tell us about your organization to help us create your business profile.'
          }
        </p>
      </div>

      <Card className="border-stone-200/50">
        <CardContent className="p-6 space-y-6">
          {/* Organization Name - Optional for traders */}
          <div className="space-y-2">
            <Label htmlFor="orgName" className="flex items-center">
              {isTrader ? <User className="w-4 h-4 mr-2" /> : <Building className="w-4 h-4 mr-2" />}
              {isTrader ? 'Trading Name (Optional)' : 'Organization Name'}
            </Label>
            <Input
              id="orgName"
              type="text"
              placeholder={isTrader ? "Your trading name or leave empty for personal" : "Enter your organization name"}
              value={data.orgName}
              onChange={(e) => updateData({ orgName: e.target.value })}
              className="h-12"
            />
            {isTrader && (
              <p className="text-xs text-stone-500">
                Leave empty if you trade under your personal name
              </p>
            )}
          </div>

          {/* Organization Type - Modified for traders */}
          {!isTrader && (
            <div className="space-y-2">
              <Label>Organization Type</Label>
              <Select value={data.orgType} onValueChange={(value) => updateData({ orgType: value })}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buyer">Buyer Organization</SelectItem>
                  <SelectItem value="exporter">Exporter Organization</SelectItem>
                  <SelectItem value="platform">Platform/Marketplace</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {isTrader && (
            <div className="space-y-2">
              <Label>Business Structure</Label>
              <Select value={data.orgType} onValueChange={(value) => updateData({ orgType: value })}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your business structure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual Trader</SelectItem>
                  <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                  <SelectItem value="small_company">Small Company</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {isTrader ? 'Your Email' : 'Contact Email'}
              </Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder={isTrader ? "your.email@gmail.com" : "contact@company.com"}
                value={data.contactEmail}
                onChange={(e) => updateData({ contactEmail: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {isTrader ? 'Your Phone' : 'Contact Phone'}
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={data.contactPhone}
                onChange={(e) => updateData({ contactPhone: e.target.value })}
                className="h-12"
              />
            </div>
          </div>

          {/* Logo Upload - Optional for traders */}
          <div className="space-y-4">
            <Label>{isTrader ? 'Profile Photo/Logo (Optional)' : 'Organization Logo (Optional)'}</Label>
            <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <div className="space-y-2">
                <Upload className="w-8 h-8 mx-auto text-stone-400" />
                <div>
                  <p className="text-sm text-stone-600">
                    {data.logo ? data.logo.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-stone-500">PNG, JPG up to 5MB</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2"
                >
                  Choose File
                </Button>
              </div>
            </div>
          </div>

          {/* Trader-specific information */}
          {isTrader && (
            <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-3 h-3 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-800">Independent Trader Benefits</p>
                  <p className="text-xs text-blue-700">
                    As an independent trader, you can partner with multiple exporters, access their inventory, 
                    and facilitate international trades while maintaining your flexibility.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Terms of Use */}
          <div className="flex items-start space-x-3 p-4 bg-stone-50/50 rounded-lg">
            <Checkbox
              id="terms"
              checked={data.termsAccepted}
              onCheckedChange={(checked) => updateData({ termsAccepted: checked as boolean })}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                I agree to the Terms of Use and Platform Policies
              </Label>
              <p className="text-xs text-stone-600">
                By checking this box, you acknowledge that you have read and agree to our{' '}
                <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          variant="outline"
          size="lg"
          className="px-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed()}
          size="lg"
          className="emerald-gradient text-white px-8 disabled:opacity-50"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OrganizationProfileStep;
