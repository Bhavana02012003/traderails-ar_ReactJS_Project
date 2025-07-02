import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Mail, Phone, Eye, EyeOff, User } from 'lucide-react';
import OTPVerificationFlow, { ContactData } from './auth/OTPVerificationFlow';
import ChooseOrganizationModal from './auth/ChooseOrganizationModal';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess?: (userType: 'buyer' | 'exporter' | 'agent' | 'trader') => void;
  onCreateAccount?: () => void;
}

// Mock organizations for demonstration
const mockOrganizations = [
  {
    id: '1',
    name: 'Shivani Granites Ltd.',
    type: 'Factory' as const,
    location: 'Jaipur, India',
    lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: '2',
    name: 'Global Stone Exports',
    type: 'Exporter' as const,
    location: 'Mumbai, India',
    lastAccessed: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
  },
  {
    id: '3',
    name: 'Premium Marble Trading Co.',
    type: 'Trader' as const,
    location: 'Dubai, UAE',
    lastAccessed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  },
];

const LoginModal = ({ open, onOpenChange, onLoginSuccess, onCreateAccount }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaOtp, setMfaOtp] = useState('');
  const [showMfaInput, setShowMfaInput] = useState(false);
  const [showOtpFlow, setShowOtpFlow] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'buyer' | 'exporter' | 'agent' | 'trader'>('buyer');
  const [showOrgChoice, setShowOrgChoice] = useState(false);

  const getUserTypeConfig = (userType: string) => {
    switch (userType) {
      case 'buyer':
      case 'exporter':
        return { 
          authMethod: 'email', 
          label: userType === 'buyer' ? 'Buyer / Importer' : 'Exporter / Seller',
          requiresMfa: true 
        };
      case 'agent':
        return { 
          authMethod: 'mobile', 
          label: "Buyer's Agent",
          requiresMfa: false 
        };
      case 'trader':
        return { 
          authMethod: 'mobile', 
          label: 'Independent Trader',
          requiresMfa: false 
        };
      default:
        return { 
          authMethod: 'email', 
          label: 'User',
          requiresMfa: false 
        };
    }
  };

  const config = getUserTypeConfig(selectedUserType);

  const handleOTPLogin = () => {
    setShowOtpFlow(true);
  };

  const handleOTPVerificationSuccess = (contactData: ContactData) => {
    // Check if user has multiple organizations
    const userOrganizations = mockOrganizations; // In real app, this would come from API
    
    if (userOrganizations.length > 1) {
      setShowOrgChoice(true);
      setShowOtpFlow(false);
    } else {
      onLoginSuccess?.(selectedUserType);
      onOpenChange(false);
      setShowOtpFlow(false);
    }
  };

  const handleBackFromOTP = () => {
    setShowOtpFlow(false);
  };

  const handleSendMfaOtp = () => {
    setShowMfaInput(true);
    console.log('Sending MFA OTP');
  };

  const handleLogin = () => {
    if (config.authMethod === 'email') {
      if (config.requiresMfa && !mfaOtp) {
        handleSendMfaOtp();
        return;
      }
    }
    
    // Mock login - check for multiple organizations
    const userOrganizations = mockOrganizations; // In real app, this would come from API
    
    if (userOrganizations.length > 1) {
      setShowOrgChoice(true);
    } else {
      onLoginSuccess?.(selectedUserType);
      onOpenChange(false);
    }
  };

  const handleOrganizationSelect = (orgId: string) => {
    console.log('Selected organization:', orgId);
    setShowOrgChoice(false);
    onLoginSuccess?.(selectedUserType);
    onOpenChange(false);
  };

  const handleCreateAccount = () => {
    onCreateAccount?.();
  };

  const canProceed = () => {
    if (config.authMethod === 'email') {
      const hasCredentials = email && password;
      if (config.requiresMfa) {
        return hasCredentials && (!showMfaInput || mfaOtp);
      }
      return hasCredentials;
    } else {
      return phoneNumber;
    }
  };

  // Choose Organization Modal
  if (showOrgChoice) {
    return (
      <ChooseOrganizationModal
        open={open}
        onOpenChange={onOpenChange}
        organizations={mockOrganizations}
        onOrganizationSelect={handleOrganizationSelect}
        userType={selectedUserType}
      />
    );
  }

  // OTP Flow conditional rendering
  if (showOtpFlow) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-transparent border-0 shadow-none p-0">
          <DialogTitle className="sr-only">OTP Verification</DialogTitle>
          <OTPVerificationFlow
            onVerificationSuccess={handleOTPVerificationSuccess}
            onBack={handleBackFromOTP}
            purpose="login"
            userRole={selectedUserType}
          />
        </DialogContent>
      </Dialog>
    );
  }

  // Main login form
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl">
        <DialogTitle className="sr-only">Login to TradeRails</DialogTitle>
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 emerald-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">Welcome to TradeRails</h2>
            <p className="text-stone-600 mt-2">Sign in to your account</p>
          </div>

          {/* User Type Selection */}
          <div className="mb-6 p-4 bg-stone-50 rounded-lg">
            <Label className="text-sm font-medium text-stone-700 mb-3 block">
              <User className="w-4 h-4 inline mr-2" />
              Login as
            </Label>
            <Select value={selectedUserType} onValueChange={(value: 'buyer' | 'exporter' | 'agent' | 'trader') => setSelectedUserType(value)}>
              <SelectTrigger className="bg-white border-stone-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border border-stone-200">
                <SelectItem value="buyer">Buyer / Importer</SelectItem>
                <SelectItem value="exporter">Exporter / Seller</SelectItem>
                <SelectItem value="agent">Buyer's Agent</SelectItem>
                <SelectItem value="trader">Independent Trader</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            {config.authMethod === 'email' ? (
              // Email-based login for buyers and exporters
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-stone-50 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-stone-50 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 hover:text-stone-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {config.requiresMfa && showMfaInput && (
                  <div className="space-y-2">
                    <Label htmlFor="mfaOtp">Multi-Factor Authentication</Label>
                    <Input
                      id="mfaOtp"
                      type="text"
                      placeholder="Enter OTP sent to your email/phone"
                      value={mfaOtp}
                      onChange={(e) => setMfaOtp(e.target.value)}
                      maxLength={6}
                      className="h-12 bg-stone-50 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 text-center text-lg tracking-widest"
                    />
                    <p className="text-sm text-stone-600 text-center">
                      OTP sent for additional security verification
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-stone-300" />
                    <span className="text-stone-600">Remember me</span>
                  </label>
                  <a href="#" className="text-emerald-600 hover:text-emerald-700">
                    Forgot password?
                  </a>
                </div>
              </>
            ) : (
              // Mobile-based login for agents and traders - Use OTP Flow
              <div className="space-y-4 text-center">
                <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                  <Phone className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-emerald-900 mb-2">Mobile Verification</h3>
                  <p className="text-emerald-700 text-sm mb-4">
                    As a {config.label.toLowerCase()}, you'll sign in using mobile verification for quick and secure access.
                  </p>
                  <Button
                    onClick={handleOTPLogin}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Continue with Mobile
                  </Button>
                </div>
              </div>
            )}

            {/* Login Button for Email Users */}
            {config.authMethod === 'email' && (
              <Button 
                onClick={handleLogin}
                className="w-full h-12 emerald-gradient text-white font-semibold"
                disabled={!canProceed()}
              >
                Sign In as {config.label}
              </Button>
            )}
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6 pt-4 border-t border-stone-200">
            <p className="text-stone-600">
              Don't have an account?{' '}
              <button 
                onClick={handleCreateAccount}
                className="text-emerald-600 hover:text-emerald-700 font-medium underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
