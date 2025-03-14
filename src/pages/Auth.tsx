
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Layout from '../components/Layout';
import { User, Store, ShieldCheck, Mail, Smartphone } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const [authType, setAuthType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("customer");
  const [loginMethod, setLoginMethod] = useState("password");
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpMethod, setOtpMethod] = useState("email");
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    // For standard password-based authentication
    if (loginMethod === "password" || authType === "register") {
      if (!email || !password) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
        return;
      }

      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication logic
      if (authType === "login") {
        // For simplicity, just check if the email and password are not empty
        if (email && password) {
          // Store user data in localStorage for future reference
          const userData = {
            name: email.split('@')[0], // Using part of email as name for logged in users
            email,
            isLoggedIn: true,
            isVendor: role === 'vendor',
            isAdmin: role === 'admin'
          };
          localStorage.setItem('user', JSON.stringify(userData));
          
          toast({
            title: "Login successful",
            description: `Welcome back, ${email}!`,
          });
          // Redirect based on role
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else if (role === "vendor") {
            navigate("/vendor-dashboard");
          } else {
            navigate("/");
          }
        } else {
          toast({
            title: "Invalid credentials",
            description: "Please check your email and password.",
            variant: "destructive",
          });
        }
      } else {
        // Registration logic
        if (!name) {
          toast({
            title: "Missing name",
            description: "Please enter your name.",
            variant: "destructive",
          });
          return;
        }

        // For simplicity, assume registration is always successful
        // Store user data in localStorage
        const userData = {
          name,
          email,
          isLoggedIn: true,
          isVendor: role === 'vendor',
          isAdmin: role === 'admin'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast({
          title: "Registration successful",
          description: `Welcome, ${name}!`,
        });
        
        // Redirect based on role after registration
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "vendor") {
          navigate("/vendor-dashboard");
        } else {
          navigate("/");
        }
      }
    } 
    // For OTP-based authentication
    else if (loginMethod === "otp") {
      if (!showOTPInput) {
        // Validate email or phone before sending OTP
        if (otpMethod === "email") {
          if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast({
              title: "Invalid email",
              description: "Please enter a valid email address.",
              variant: "destructive",
            });
            return;
          }
          
          // Mock sending OTP to email
          toast({
            title: "OTP Sent",
            description: `A 6-digit code has been sent to ${email}`,
          });
          setShowOTPInput(true);
        } else {
          // Validate phone number
          if (!phoneNumber || phoneNumber.length < 10) {
            toast({
              title: "Invalid phone number",
              description: "Please enter a valid phone number.",
              variant: "destructive",
            });
            return;
          }
          
          // Mock sending OTP to phone
          toast({
            title: "OTP Sent",
            description: `A 6-digit code has been sent to ${phoneNumber}`,
          });
          setShowOTPInput(true);
        }
      } else {
        // Verify OTP
        if (otpValue.length !== 6) {
          toast({
            title: "Invalid OTP",
            description: "Please enter the complete 6-digit code.",
            variant: "destructive",
          });
          return;
        }
        
        // For demo purposes, we'll accept any 6-digit OTP
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock successful OTP verification
        const userData = {
          name: otpMethod === "email" ? email.split('@')[0] : "Phone User",
          email: otpMethod === "email" ? email : `${phoneNumber}@example.com`,
          isLoggedIn: true,
          isVendor: role === 'vendor',
          isAdmin: role === 'admin'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast({
          title: "Login successful",
          description: `Welcome back!`,
        });
        
        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "vendor") {
          navigate("/vendor-dashboard");
        } else {
          navigate("/");
        }
      }
    }
  };

  const resetOTP = () => {
    setShowOTPInput(false);
    setOtpValue("");
  };

  return (
    <Layout>
      <div className="container mx-auto py-20 px-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Authentication</CardTitle>
            <CardDescription className="text-muted-foreground text-center">
              {authType === "login"
                ? "Log in to your account"
                : "Create a new account"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue={authType} className="w-full">
              <TabsList>
                <TabsTrigger value="login" onClick={() => {
                  setAuthType("login");
                  setShowOTPInput(false);
                  setOtpValue("");
                }}>
                  Login
                </TabsTrigger>
                <TabsTrigger value="register" onClick={() => {
                  setAuthType("register");
                  setLoginMethod("password");
                  setShowOTPInput(false);
                  setOtpValue("");
                }}>
                  Register
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                {!showOTPInput && (
                  <div className="space-y-4 mb-4">
                    <Tabs value={loginMethod} onValueChange={setLoginMethod} className="w-full">
                      <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="password">Password</TabsTrigger>
                        <TabsTrigger value="otp">OTP</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                  {loginMethod === "password" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  
                  {loginMethod === "otp" && !showOTPInput && (
                    <>
                      <div className="space-y-2">
                        <Label>Verification Method</Label>
                        <div className="flex gap-4 mb-4">
                          <Button 
                            type="button" 
                            variant={otpMethod === "email" ? "default" : "outline"}
                            className="flex-1 flex items-center justify-center gap-2"
                            onClick={() => setOtpMethod("email")}
                          >
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </Button>
                          <Button 
                            type="button" 
                            variant={otpMethod === "phone" ? "default" : "outline"}
                            className="flex-1 flex items-center justify-center gap-2"
                            onClick={() => setOtpMethod("phone")}
                          >
                            <Smartphone className="h-4 w-4" />
                            <span>Phone</span>
                          </Button>
                        </div>
                      </div>
                      
                      {otpMethod === "email" ? (
                        <div className="space-y-2">
                          <Label htmlFor="email-otp">Email</Label>
                          <Input
                            id="email-otp"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      )}
                    </>
                  )}
                  
                  {loginMethod === "otp" && showOTPInput && (
                    <>
                      <Alert>
                        <AlertDescription>
                          {otpMethod === "email" 
                            ? `Enter the 6-digit code sent to ${email}` 
                            : `Enter the 6-digit code sent to ${phoneNumber}`}
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-2">
                        <Label htmlFor="otp">One-Time Password</Label>
                        <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button type="button" variant="ghost" onClick={resetOTP}>
                          Back
                        </Button>
                        <Button type="button" variant="link" onClick={() => {
                          setShowOTPInput(false);
                          setTimeout(() => setShowOTPInput(true), 100);
                          toast({
                            title: "OTP Resent",
                            description: otpMethod === "email" 
                              ? `A new code has been sent to ${email}` 
                              : `A new code has been sent to ${phoneNumber}`,
                          });
                        }}>
                          Resend Code
                        </Button>
                      </div>
                    </>
                  )}
                  
                  {(loginMethod === "password" || !showOTPInput) && (
                    <div className="space-y-2">
                      <Label htmlFor="login-role">Role</Label>
                      <Select onValueChange={setRole} defaultValue={role}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="customer" className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>Customer</span>
                            </SelectItem>
                            <SelectItem value="vendor" className="flex items-center gap-2">
                              <Store className="h-4 w-4" />
                              <span>Vendor</span>
                            </SelectItem>
                            <SelectItem value="admin" className="flex items-center gap-2">
                              <ShieldCheck className="h-4 w-4" />
                              <span>Admin</span>
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      {authType === "login" 
                        ? (loginMethod === "otp" && !showOTPInput ? "Send Code" : "Log In") 
                        : "Register"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={setRole} defaultValue={role}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Role</SelectLabel>
                          <SelectItem value="customer" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Customer</span>
                          </SelectItem>
                          <SelectItem value="vendor" className="flex items-center gap-2">
                            <Store className="h-4 w-4" />
                            <span>Vendor</span>
                          </SelectItem>
                          <SelectItem value="admin" className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            <span>Admin</span>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Register</Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground text-center">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary">
              Privacy Policy
            </a>
            .
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
