import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Plus, Trash2, CreditCard, Building } from 'lucide-react';
import { OnboardingData } from '../OnboardingWizard';

interface OrganizationDetailsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const BankAccountStep = ({ data, updateData, onNext, onPrev }: OrganizationDetailsStepProps) => {
  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    ifscSwift: '',
  });

  const addBankAccount = () => {
    if (newAccount.bankName && newAccount.accountNumber && newAccount.ifscSwift) {
      updateData({
        bankAccounts: [...data.bankAccounts, { ...newAccount }]
      });
      setNewAccount({ bankName: '', accountNumber: '', ifscSwift: '' });
    }
  };

  const removeBankAccount = (index: number) => {
    const updatedAccounts = data.bankAccounts.filter((_, i) => i !== index);
    updateData({ bankAccounts: updatedAccounts });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-stone-900">Bank Account Setup</h2>
        <p className="text-stone-600">
          Add your bank accounts for secure payments and settlements. This step is optional but recommended for faster transactions.
        </p>
      </div>

      {/* Existing Bank Accounts */}
      {data.bankAccounts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-stone-800">Your Bank Accounts</h3>
          {data.bankAccounts.map((account, index) => (
            <Card key={index} className="border-stone-200/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-stone-900">{account.bankName}</p>
                      <p className="text-sm text-stone-600">
                        ****{account.accountNumber.slice(-4)} • {account.ifscSwift}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBankAccount(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Bank Account */}
      <Card className="border-stone-200/50">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Building className="w-5 h-5 mr-2" />
            Add Bank Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              type="text"
              placeholder="Enter bank name"
              value={newAccount.bankName}
              onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              type="text"
              placeholder="Enter account number"
              value={newAccount.accountNumber}
              onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ifscSwift">IFSC / SWIFT Code</Label>
            <Input
              id="ifscSwift"
              type="text"
              placeholder="Enter IFSC or SWIFT code"
              value={newAccount.ifscSwift}
              onChange={(e) => setNewAccount({ ...newAccount, ifscSwift: e.target.value })}
              className="h-12"
            />
            <p className="text-xs text-stone-500">
              IFSC for Indian banks, SWIFT for international banks
            </p>
          </div>

          <Button
            onClick={addBankAccount}
            disabled={!newAccount.bankName || !newAccount.accountNumber || !newAccount.ifscSwift}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Bank Account
          </Button>
        </CardContent>
      </Card>

      {/* Skip Option */}
      <div className="text-center p-4 bg-stone-50/50 rounded-lg">
        <p className="text-sm text-stone-600 mb-2">
          You can skip this step and add bank accounts later from your dashboard.
        </p>
        <p className="text-xs text-stone-500">
          Note: Having verified bank accounts enables faster payment processing and better trade opportunities.
        </p>
      </div>

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
          size="lg"
          className="emerald-gradient text-white px-8"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BankAccountStep;
