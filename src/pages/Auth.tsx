
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { LockIcon, MailIcon, UserPlus } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register: registerLogin, handleSubmit: handleSubmitLogin } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const { register: registerSignup, handleSubmit: handleSubmitSignup } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onLoginSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // In a real app, this would call an auth API
      console.log("Login attempt with:", data);
      
      // Simulate successful login
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify({
          name: "Demo User",
          email: data.email,
          isLoggedIn: true
        }));
        navigate("/");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const onSignupSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Password validation
      if (data.password !== data.confirmPassword) {
        setIsLoading(false);
        return toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
      }

      if (!data.terms) {
        setIsLoading(false);
        return toast({
          title: "Error",
          description: "You must agree to the terms and conditions",
          variant: "destructive",
        });
      }

      // In a real app, this would call an auth API
      console.log("Signup attempt with:", data);
      
      // Simulate successful signup
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Success",
          description: "Your account has been created",
        });
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify({
          name: data.name,
          email: data.email,
          isLoggedIn: true
        }));
        navigate("/");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[calc(100vh-220px)]">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmitLogin(onLoginSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          <MailIcon className="h-4 w-4" />
                        </div>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="name@example.com" 
                          className="pl-10"
                          {...registerLogin("email", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <a href="#" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          <LockIcon className="h-4 w-4" />
                        </div>
                        <Input 
                          id="password" 
                          type="password" 
                          className="pl-10"
                          {...registerLogin("password", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember"
                        {...registerLogin("remember")}
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            {/* Signup Tab */}
            <TabsContent value="signup">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                  <CardDescription>
                    Enter your information to create an account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmitSignup(onSignupSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          <UserPlus className="h-4 w-4" />
                        </div>
                        <Input 
                          id="name" 
                          placeholder="John Doe" 
                          className="pl-10"
                          {...registerSignup("name", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          <MailIcon className="h-4 w-4" />
                        </div>
                        <Input 
                          id="signupEmail" 
                          type="email" 
                          placeholder="name@example.com" 
                          className="pl-10"
                          {...registerSignup("email", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          <LockIcon className="h-4 w-4" />
                        </div>
                        <Input 
                          id="signupPassword" 
                          type="password" 
                          className="pl-10"
                          {...registerSignup("password", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                          <LockIcon className="h-4 w-4" />
                        </div>
                        <Input 
                          id="confirmPassword" 
                          type="password" 
                          className="pl-10"
                          {...registerSignup("confirmPassword", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        {...registerSignup("terms")}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">
                          terms and conditions
                        </a>
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
