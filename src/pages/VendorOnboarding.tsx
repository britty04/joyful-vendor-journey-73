
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Upload, Building, Mail, Phone, MapPin, FileText, Sparkles } from 'lucide-react';
import Layout from "@/components/Layout";

const VendorOnboarding = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1 && (!businessName || !businessType)) {
      toast({
        title: "Please fill all fields",
        description: "Business name and type are required to continue.",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 2 && (!email || !phoneNumber)) {
      toast({
        title: "Please fill all fields",
        description: "Email and phone number are required to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentStep(currentStep + 1);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!businessName || !businessType || !email || !phoneNumber || !address || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate submission
    console.log("Submitting:", {
      businessName,
      businessType,
      email,
      phoneNumber,
      address,
      description,
      logoFile
    });
    
    toast({
      title: "Application submitted! 🎉",
      description: "Your vendor application has been submitted for review.",
    });
  };
  
  // Define steps
  const steps = [
    { id: 1, name: "Business Info" },
    { id: 2, name: "Contact Details" },
    { id: 3, name: "Location & Description" },
    { id: 4, name: "Review & Submit" }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 relative">
        {/* Background decorative elements */}
        <div className="absolute top-40 right-10 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: "1s"}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: "1.5s"}}></div>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 mb-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700">
            <Sparkles size={16} className="mr-2 text-purple-500" />
            <span className="text-sm font-medium">Join our vendor community</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold gradient-text-purple mb-4">Vendor Onboarding</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our marketplace and reach thousands of customers looking for event services like yours!
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-between items-center w-full mb-4">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`flex-1 text-center relative ${step.id < currentStep ? 'text-green-500' : step.id === currentStep ? 'text-purple-600 font-medium' : 'text-gray-400'}`}
              >
                <div className="text-xs md:text-sm mb-2 hidden md:block">{step.name}</div>
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-2 ${step.id < currentStep ? 'bg-green-100 border-green-500' : step.id === currentStep ? 'bg-purple-100 border-purple-500' : 'bg-gray-100 border-gray-300'}`}>
                  {step.id < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                {step.id < steps.length && (
                  <div className={`absolute top-1/2 w-full left-1/2 h-0.5 -z-10 ${step.id < currentStep ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="md:hidden flex justify-between px-2">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`text-xs ${step.id === currentStep ? 'text-purple-600 font-medium' : 'text-gray-400'}`}
              >
                {step.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 playful-shadow">
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Building className="w-5 h-5 mr-2 text-purple-500" />
                      Business Information
                    </h2>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="col-span-2">
                        <Label htmlFor="businessName" className="text-gray-700">Business Name</Label>
                        <Input
                          id="businessName"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Enter your business name"
                          className="mt-1 border-purple-100 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="businessType" className="text-gray-700">Business Type</Label>
                        <Input
                          id="businessType"
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          placeholder="e.g., Entertainment, Catering"
                          className="mt-1 border-purple-100 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div className="col-span-2 md:col-span-1">
                        <Label htmlFor="logo" className="text-gray-700">Business Logo (Optional)</Label>
                        <div className="mt-1 flex items-center">
                          {logoPreview ? (
                            <div className="relative w-32 h-32 mr-4">
                              <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover rounded-lg border border-purple-100" />
                              <button 
                                type="button" 
                                onClick={() => {
                                  setLogoFile(null);
                                  setLogoPreview('');
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                              <Upload className="w-8 h-8 text-purple-400" />
                              <span className="mt-2 text-sm text-purple-500">Upload Logo</span>
                              <input type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-purple-500" />
                      Contact Information
                    </h2>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                        <Input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="mt-1 border-purple-100 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phoneNumber" className="text-gray-700">Phone Number</Label>
                        <Input
                          type="tel"
                          id="phoneNumber"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Your phone number"
                          className="mt-1 border-purple-100 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                      Location & Details
                    </h2>
                    
                    <div>
                      <Label htmlFor="address" className="text-gray-700">Business Address</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your business address"
                        className="mt-1 border-purple-100 focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description" className="text-gray-700">Business Description</Label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell us about your business and services..."
                        rows={4}
                        className="w-full mt-1 px-3 py-2 border border-purple-100 rounded-md shadow-sm focus:outline-none focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                )}
                
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-purple-500" />
                      Review Your Information
                    </h2>
                    
                    <div className="bg-purple-50 rounded-lg p-6 space-y-4">
                      <div className="flex">
                        <div className="w-1/3 font-medium text-gray-500">Business Name:</div>
                        <div className="w-2/3 text-gray-800">{businessName}</div>
                      </div>
                      <div className="flex">
                        <div className="w-1/3 font-medium text-gray-500">Business Type:</div>
                        <div className="w-2/3 text-gray-800">{businessType}</div>
                      </div>
                      <div className="flex">
                        <div className="w-1/3 font-medium text-gray-500">Email:</div>
                        <div className="w-2/3 text-gray-800">{email}</div>
                      </div>
                      <div className="flex">
                        <div className="w-1/3 font-medium text-gray-500">Phone:</div>
                        <div className="w-2/3 text-gray-800">{phoneNumber}</div>
                      </div>
                      <div className="flex">
                        <div className="w-1/3 font-medium text-gray-500">Address:</div>
                        <div className="w-2/3 text-gray-800">{address}</div>
                      </div>
                      <div className="flex">
                        <div className="w-1/3 font-medium text-gray-500">Description:</div>
                        <div className="w-2/3 text-gray-800">{description}</div>
                      </div>
                      {logoPreview && (
                        <div className="flex">
                          <div className="w-1/3 font-medium text-gray-500">Logo:</div>
                          <div className="w-2/3">
                            <img src={logoPreview} alt="Business logo" className="w-20 h-20 object-cover rounded" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                      <p className="text-yellow-800 text-sm">
                        By submitting this form, you agree to our Terms of Service and Privacy Policy. We'll review your application and get back to you within 2-3 business days.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-between">
                  {currentStep > 1 ? (
                    <Button 
                      type="button" 
                      onClick={handleBack}
                      variant="outline"
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < steps.length ? (
                    <Button 
                      type="button" 
                      onClick={handleNext}
                      className="bg-gradient-to-r from-eventPurple-500 to-eventPink-500 hover:from-eventPurple-600 hover:to-eventPink-600 text-white"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-eventPurple-500 to-eventPink-500 hover:from-eventPurple-600 hover:to-eventPink-600 text-white"
                    >
                      Submit Application
                      <Sparkles className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">Already a vendor? <a href="/auth" className="text-purple-600 hover:text-purple-700 font-medium">Sign in to your dashboard</a></p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VendorOnboarding;
