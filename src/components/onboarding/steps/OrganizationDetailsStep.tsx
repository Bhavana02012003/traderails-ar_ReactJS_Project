
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, FileText, MapPin, Calendar, Hash, User } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface OrganizationDetailsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const OrganizationDetailsStep = ({ data, updateData, onNext, onPrev }: OrganizationDetailsStepProps) => {
  const countries = [
    'United States', 'India', 'China', 'Brazil', 'Turkey', 'Italy', 'Spain', 'Iran', 'Egypt', 'Portugal'
  ];

  const isTrader = data.role === 'trader';
  const isIndividualTrader = data.orgType === 'individual';

  const getTaxIdLabel = (country: string) => {
    switch (country) {
      case 'India':
        return isIndividualTrader ? 'PAN Card' : 'PAN / GSTIN / IEC';
      case 'United States':
        return isIndividualTrader ? 'SSN / ITIN' : 'EIN / Tax ID';
      case 'United Kingdom':
        return isIndividualTrader ? 'National Insurance Number' : 'Company Registration Number';
      default:
        return isIndividualTrader ? 'National ID / Tax Number' : 'Tax ID / Registration Number';
    }
  };

  const canProceed = () => {
    if (isTrader && isIndividualTrader) {
      // For individual traders, only require basic personal details
      return data.country && data.address && data.taxId;
    }
    // For organizations and business traders, require all details
    return data.legalName && data.country && data.address && data.taxId && data.incorporationDate;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
          {isTrader && isIndividualTrader ? 'Personal Details' : 'Legal Details'}
        </h2>
        <p className="text-stone-600">
          {isTrader && isIndividualTrader 
            ? 'We need these details for KYC compliance and identity verification.'
            : 'We need these details for KYC compliance and to verify your organization\'s legitimacy.'
          }
        </p>
      </div>

      <Card className="border-stone-200/50">
        <CardContent className="p-6 space-y-6">
          {/* Legal Name - Not required for individual traders */}
          {!(isTrader && isIndividualTrader) && (
            <div className="space-y-2">
              <Label htmlFor="legalName" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Legal Name
              </Label>
              <Input
                id="legalName"
                type="text"
                placeholder="Enter the official registered name"
                value={data.legalName}
                onChange={(e) => updateData({ legalName: e.target.value })}
                className="h-12"
              />
              <p className="text-xs text-stone-500">
                This should match your business registration documents
              </p>
            </div>
          )}

          {/* Country */}
          <div className="space-y-2">
            <Label className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {isTrader && isIndividualTrader ? 'Country of Residence' : 'Country of Incorporation'}
            </Label>
            <Select value={data.country} onValueChange={(value) => updateData({ country: value })}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {isTrader && isIndividualTrader ? 'Residential Address' : 'Registered Address'}
            </Label>
            <Textarea
              id="address"
              placeholder={isTrader && isIndividualTrader 
                ? "Enter your complete residential address" 
                : "Enter your complete registered business address"
              }
              value={data.address}
              onChange={(e) => updateData({ address: e.target.value })}
              className="min-h-[100px]"
            />
          </div>

          {/* Tax ID */}
          <div className="space-y-2">
            <Label htmlFor="taxId" className="flex items-center">
              {isTrader && isIndividualTrader ? <User className="w-4 h-4 mr-2" /> : <Hash className="w-4 h-4 mr-2" />}
              {getTaxIdLabel(data.country)}
            </Label>
            <Input
              id="taxId"
              type="text"
              placeholder={`Enter your ${getTaxIdLabel(data.country).toLowerCase()}`}
              value={data.taxId}
              onChange={(e) => updateData({ taxId: e.target.value })}
              className="h-12"
            />
            <p className="text-xs text-stone-500">
              {isTrader && isIndividualTrader
                ? 'Your personal tax identification number for verification'
                : data.country === 'India' 
                  ? 'Provide PAN for sole proprietorship, GSTIN for GST registered entities, or IEC for exporters'
                  : 'Your business registration or tax identification number'
              }
            </p>
          </div>

          {/* Date of Incorporation - Not required for individual traders */}
          {!(isTrader && isIndividualTrader) && (
            <div className="space-y-2">
              <Label htmlFor="incorporationDate" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Date of Incorporation
              </Label>
              <Input
                id="incorporationDate"
                type="date"
                value={data.incorporationDate}
                onChange={(e) => updateData({ incorporationDate: e.target.value })}
                className="h-12"
              />
            </div>
          )}

          {/* Trader-specific note */}
          {isTrader && (
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-3 h-3 text-emerald-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-emerald-800">
                    {isIndividualTrader ? 'Individual Trader Verification' : 'Business Trader Verification'}
                  </p>
                  <p className="text-xs text-emerald-700">
                    {isIndividualTrader 
                      ? 'As an individual trader, you can partner with verified exporters to facilitate international trades while maintaining your independent status.'
                      : 'Your business details will be verified to ensure compliance with international trade regulations.'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText className="w-3 h-3 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-emerald-800">Secure & Confidential</p>
                <p className="text-xs text-emerald-700">
                  All information is encrypted and stored securely. We use this data only for KYC verification and compliance purposes.
                </p>
              </div>
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

export default OrganizationDetailsStep;
