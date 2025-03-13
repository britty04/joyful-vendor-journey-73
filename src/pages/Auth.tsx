
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/hooks/use-toast';
import Layout from '../components/Layout';
import { UserCog, Shield, User } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Account type state
  const [accountType, setAccountType] = useState('customer');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Admin credentials check (in a real app, this would be server-side)
    const isAdmin = accountType === 'admin' && loginEmail === 'admin@example.com' && loginPassword === 'admin123';
    const isVendor = accountType === 'vendor';
    const isCustomer = accountType === 'customer';
    
    // Simulate login process
    setTimeout(() => {
      // In a real app, you would validate credentials against a backend
      const userData = {
        name: isAdmin ? "Admin User" : "Test User",
        email: loginEmail,
        isLoggedIn: true,
        isAdmin: isAdmin,
        isVendor: isVendor && !isAdmin,
      };
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Login Successful",
        description: `Welcome back${isAdmin ? ', Administrator' : ''}!`,
      });
      
      setIsLoading(false);
      
      // Redirect based on account type
      if (isAdmin) {
        navigate('/admin/dashboard');
      } else if (isVendor) {
        navigate('/vendor/dashboard');
      } else if (isCustomer) {
        navigate('/customer/profile');
      } else {
        navigate('/');
      }
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!registerName || !registerEmail || !registerPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Simulate registration process
    setTimeout(() => {
      // In a real app, you would create a user account in your backend
      const userData = {
        name: registerName,
        email: registerEmail,
        isLoggedIn: true,
        isVendor: accountType === 'vendor',
        isAdmin: false,
      };
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Registration Successful",
        description: accountType === 'vendor' 
          ? "Your vendor account has been created! Let's complete your profile." 
          : "Your account has been created!",
      });
      
      setIsLoading(false);
      
      // Redirect based on account type
      if (accountType === 'vendor') {
        navigate('/vendor/onboarding');
      } else {
        navigate('/customer/profile');
      }
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4 max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Account Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <a href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Input 
                      id="login-password" 
                      type="password" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div 
                        className={`flex flex-col items-center gap-1 p-2 border rounded-md cursor-pointer transition-all ${
                          accountType === 'customer' ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                        onClick={() => setAccountType('customer')}
                      >
                        <User className={`h-5 w-5 ${accountType === 'customer' ? 'text-primary' : 'text-gray-500'}`} />
                        <span className="text-xs font-medium">Customer</span>
                      </div>
                      <div 
                        className={`flex flex-col items-center gap-1 p-2 border rounded-md cursor-pointer transition-all ${
                          accountType === 'vendor' ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                        onClick={() => setAccountType('vendor')}
                      >
                        <UserCog className={`h-5 w-5 ${accountType === 'vendor' ? 'text-primary' : 'text-gray-500'}`} />
                        <span className="text-xs font-medium">Vendor</span>
                      </div>
                      <div 
                        className={`flex flex-col items-center gap-1 p-2 border rounded-md cursor-pointer transition-all ${
                          accountType === 'admin' ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                        onClick={() => setAccountType('admin')}
                      >
                        <Shield className={`h-5 w-5 ${accountType === 'admin' ? 'text-primary' : 'text-gray-500'}`} />
                        <span className="text-xs font-medium">Admin</span>
                      </div>
                    </div>
                    {accountType === 'admin' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Admin demo credentials: admin@example.com / admin123
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Register to book vendors for your events
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input 
                      id="register-name" 
                      placeholder="John Doe" 
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div 
                        className={`flex flex-col items-center gap-1 p-3 border rounded-md cursor-pointer transition-all ${
                          accountType === 'customer' ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                        onClick={() => setAccountType('customer')}
                      >
                        <User className={`h-5 w-5 ${accountType === 'customer' ? 'text-primary' : 'text-gray-500'}`} />
                        <span className="text-sm font-medium">Customer</span>
                        <span className="text-xs text-muted-foreground text-center">Book services for events</span>
                      </div>
                      <div 
                        className={`flex flex-col items-center gap-1 p-3 border rounded-md cursor-pointer transition-all ${
                          accountType === 'vendor' ? 'border-primary bg-primary/5' : 'border-gray-200'
                        }`}
                        onClick={() => setAccountType('vendor')}
                      >
                        <UserCog className={`h-5 w-5 ${accountType === 'vendor' ? 'text-primary' : 'text-gray-500'}`} />
                        <span className="text-sm font-medium">Vendor</span>
                        <span className="text-xs text-muted-foreground text-center">Offer services to customers</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a>
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Auth;
