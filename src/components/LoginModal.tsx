import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Mail, Phone, Eye, EyeOff, User } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess?: (userType: 'buyer' | 'exporter' | 'agent' | 'trader') => void;
  onCreateAccount?: () => void;
}

const LoginModal = ({ open, onOpenChange, onLoginSuccess, onCreateAccount }: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [mfaOtp, setMfaOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showMfaInput, setShowMfaInput] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'buyer' | 'exporter' | 'agent' | 'trader'>('buyer');

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

  const handleSendOtp = () => {
    if (config.authMethod === 'mobile' && phoneNumber) {
      setShowOtpInput(true);
      console.log('Sending OTP to:', phoneNumber);
    }
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
    
    // Mock login - always succeed
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
      return phoneNumber && otp && otp.length === 6;
    }
  };

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
              // Mobile-based login for agents and traders
              <>
                {!showOtpInput ? (
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex space-x-2">
                      <Select defaultValue="+1">
                        <SelectTrigger className="w-20 h-12 bg-stone-50 border-stone-200">
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
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 h-12 bg-stone-50 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="h-12 bg-stone-50 border-stone-200 focus:border-emerald-500 focus:ring-emerald-500 text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                    <p className="text-sm text-stone-600 text-center">
                      Code sent to {phoneNumber}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Login Button */}
            {config.authMethod === 'mobile' && !showOtpInput ? (
              <Button 
                onClick={handleSendOtp}
                className="w-full h-12 emerald-gradient text-white font-semibold"
                disabled={!phoneNumber}
              >
                Send OTP
              </Button>
            ) : (
              <Button 
                onClick={handleLogin}
                className="w-full h-12 emerald-gradient text-white font-semibold"
                disabled={!canProceed()}
              >
                Sign In as {config.label}
              </Button>
            )}

            {/* Back button for mobile OTP */}
            {config.authMethod === 'mobile' && showOtpInput && (
              <Button 
                variant="ghost" 
                onClick={() => setShowOtpInput(false)}
                className="w-full text-stone-600"
              >
                Back to phone number
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
