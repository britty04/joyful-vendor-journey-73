
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Upload, Building, Mail, Phone, MapPin, FileText, Sparkles, Camera, CreditCard, FileImage, Shield, BookOpen, Award, CheckSquare } from 'lucide-react';
import Layout from "@/components/Layout";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Schema for form validation
const businessInfoSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessType: z.string().min(1, "Business type is required"),
  registrationNumber: z.string().optional(),
  taxId: z.string().optional(),
});

const contactInfoSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  website: z.string().url().optional().or(z.literal("")),
});

const locationInfoSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
});

const serviceInfoSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters"),
  serviceCategories: z.array(z.string()).min(1, "Select at least one service category"),
  priceRange: z.string().min(1, "Price range is required"),
});

const VendorOnboarding = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [coverPhotoFile, setCoverPhotoFile] = useState<File | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState('');
  const [idDocFile, setIdDocFile] = useState<File | null>(null);
  const [idDocPreview, setIdDocPreview] = useState('');
  const [businessDocFile, setBusinessDocFile] = useState<File | null>(null);
  const [businessDocPreview, setBusinessDocPreview] = useState('');
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const [selectedServiceCategories, setSelectedServiceCategories] = useState<string[]>([]);
  const [availabilityDays, setAvailabilityDays] = useState({
    monday: { selected: true, start: "09:00", end: "17:00" },
    tuesday: { selected: true, start: "09:00", end: "17:00" },
    wednesday: { selected: true, start: "09:00", end: "17:00" },
    thursday: { selected: true, start: "09:00", end: "17:00" },
    friday: { selected: true, start: "09:00", end: "17:00" },
    saturday: { selected: false, start: "09:00", end: "17:00" },
    sunday: { selected: false, start: "09:00", end: "17:00" },
  });

  // Forms for multi-step process
  const businessInfoForm = useForm<z.infer<typeof businessInfoSchema>>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      businessName: "",
      businessType: "",
      registrationNumber: "",
      taxId: "",
    },
  });

  const contactInfoForm = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      website: "",
    },
  });

  const locationInfoForm = useForm<z.infer<typeof locationInfoSchema>>({
    resolver: zodResolver(locationInfoSchema),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const serviceInfoForm = useForm<z.infer<typeof serviceInfoSchema>>({
    resolver: zodResolver(serviceInfoSchema),
    defaultValues: {
      description: "",
      serviceCategories: [],
      priceRange: "",
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePortfolioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setPortfolioImages(prev => [...prev, ...newImages]);
    }
  };

  const toggleServiceCategory = (category: string) => {
    setSelectedServiceCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
    
    // Update the form value
    const updatedCategories = selectedServiceCategories.includes(category)
      ? selectedServiceCategories.filter(c => c !== category)
      : [...selectedServiceCategories, category];
    
    serviceInfoForm.setValue("serviceCategories", updatedCategories);
  };

  const toggleAvailabilityDay = (day: keyof typeof availabilityDays) => {
    setAvailabilityDays(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        selected: !prev[day].selected
      }
    }));
  };

  const updateAvailabilityTime = (
    day: keyof typeof availabilityDays,
    field: 'start' | 'end',
    value: string
  ) => {
    setAvailabilityDays(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  // Service categories for kids' events
  const serviceCategories = [
    { id: 'magicians', name: 'Magicians' },
    { id: 'clowns', name: 'Clowns' },
    { id: 'face-painting', name: 'Face Painting' },
    { id: 'balloon-artists', name: 'Balloon Artists' },
    { id: 'puppeteers', name: 'Puppeteers' },
    { id: 'storytellers', name: 'Storytellers' },
    { id: 'character-actors', name: 'Character Actors' },
    { id: 'venues', name: 'Venues' },
    { id: 'catering', name: 'Catering' },
    { id: 'photographers', name: 'Photographers' },
    { id: 'game-coordinators', name: 'Game Coordinators' },
    { id: 'decorators', name: 'Decorators' },
  ];

  // Onboarding steps
  const steps = [
    { id: 1, name: "Business Info", icon: <Building className="w-5 h-5" /> },
    { id: 2, name: "Contact Details", icon: <Mail className="w-5 h-5" /> },
    { id: 3, name: "KYC Verification", icon: <Shield className="w-5 h-5" /> },
    { id: 4, name: "Services", icon: <BookOpen className="w-5 h-5" /> },
    { id: 5, name: "Availability", icon: <Calendar className="w-5 h-5" /> },
    { id: 6, name: "Review & Submit", icon: <CheckSquare className="w-5 h-5" /> }
  ];

  const handleNext = async () => {
    let canProceed = false;
    
    switch (currentStep) {
      case 1:
        const businessInfoValid = await businessInfoForm.trigger();
        canProceed = businessInfoValid;
        break;
      case 2:
        const contactInfoValid = await contactInfoForm.trigger();
        canProceed = contactInfoValid;
        break;
      case 3:
        // KYC step validation
        canProceed = !!idDocFile && !!businessDocFile;
        if (!canProceed) {
          toast({
            title: "Required Documents",
            description: "Please upload both ID and business registration documents",
            variant: "destructive",
          });
        }
        break;
      case 4:
        const serviceInfoValid = await serviceInfoForm.trigger();
        serviceInfoForm.setValue("serviceCategories", selectedServiceCategories);
        canProceed = serviceInfoValid && selectedServiceCategories.length > 0;
        break;
      case 5:
        // Availability step validation - always valid as we have defaults
        canProceed = true;
        break;
      default:
        canProceed = true;
    }
    
    if (canProceed) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      setProgress(Math.min(100, (newStep / steps.length) * 100));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
    setProgress(Math.min(100, (newStep / steps.length) * 100));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = () => {
    // Combine all form data for submission
    const formData = {
      ...businessInfoForm.getValues(),
      ...contactInfoForm.getValues(),
      ...locationInfoForm.getValues(),
      ...serviceInfoForm.getValues(),
      logoFile,
      coverPhotoFile,
      idDocFile,
      businessDocFile,
      portfolioImages,
      availability: availabilityDays,
    };
    
    console.log("Submitting vendor application:", formData);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application submitted successfully! 🎉",
        description: "Your application has been received. We'll review it and get back to you soon.",
      });
      
      // Redirect to vendor dashboard or homepage
      setTimeout(() => {
        window.location.href = "/vendor/dashboard";
      }, 2000);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6 relative">
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
        
        {/* Progress indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`flex items-center gap-2 ${
                  step.id === currentStep 
                    ? 'text-purple-600 font-medium' 
                    : step.id < currentStep 
                    ? 'text-green-500' 
                    : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.id === currentStep 
                    ? 'bg-purple-100 text-purple-600' 
                    : step.id < currentStep 
                    ? 'bg-green-100 text-green-500' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {step.id < currentStep ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span className="hidden sm:inline text-sm">{step.name}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100 playful-shadow">
            <div className="p-6 md:p-8">
              {/* Step 1: Business Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-purple-500" />
                    Business Information
                  </h2>
                  
                  <Form {...businessInfoForm}>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <FormField
                            control={businessInfoForm.control}
                            name="businessName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter your business name" 
                                    className="border-purple-100 focus:border-purple-300" 
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <FormField
                            control={businessInfoForm.control}
                            name="businessType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Type</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="e.g., Entertainment, Catering, Venue" 
                                    className="border-purple-100 focus:border-purple-300" 
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Select the primary category that best describes your business
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div>
                          <FormField
                            control={businessInfoForm.control}
                            name="registrationNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Registration Number (Optional)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter registration number" 
                                    className="border-purple-100 focus:border-purple-300" 
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div>
                          <FormField
                            control={businessInfoForm.control}
                            name="taxId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tax ID / GST Number (Optional)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Enter tax ID" 
                                    className="border-purple-100 focus:border-purple-300" 
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="logo" className="text-gray-700 block mb-2">Business Logo</Label>
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
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  onChange={(e) => handleFileChange(e, setLogoFile, setLogoPreview)} 
                                  accept="image/*" 
                                />
                              </label>
                            )}
                            <div className="ml-4 text-sm text-gray-500">
                              <p>Recommended: 400x400px</p>
                              <p>JPG, PNG or GIF</p>
                              <p>Max size: 2MB</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="coverPhoto" className="text-gray-700 block mb-2">Cover Photo</Label>
                          <div className="mt-1 flex items-center">
                            {coverPhotoPreview ? (
                              <div className="relative w-full h-32 overflow-hidden">
                                <img 
                                  src={coverPhotoPreview} 
                                  alt="Cover photo preview" 
                                  className="w-full h-full object-cover rounded-lg border border-purple-100" 
                                />
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    setCoverPhotoFile(null);
                                    setCoverPhotoPreview('');
                                  }}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                                <Camera className="w-8 h-8 text-purple-400" />
                                <span className="mt-2 text-sm text-purple-500">Upload Cover Photo</span>
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  onChange={(e) => handleFileChange(e, setCoverPhotoFile, setCoverPhotoPreview)} 
                                  accept="image/*" 
                                />
                              </label>
                            )}
                          </div>
                          <p className="mt-2 text-sm text-gray-500">Recommended: 1200x400px. This will appear at the top of your profile.</p>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
              
              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-purple-500" />
                    Contact Information
                  </h2>
                  
                  <Form {...contactInfoForm}>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <FormField
                            control={contactInfoForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="border-purple-100 focus:border-purple-300" 
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  This email will be used for all communication and customer inquiries
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <FormField
                            control={contactInfoForm.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Phone</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="tel" 
                                    placeholder="Phone number" 
                                    className="border-purple-100 focus:border-purple-300" 
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <FormField
                            control={contactInfoForm.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website (Optional)</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="https://your-website.com" 
                                    className="border-purple-100 focus:border-purple-300" 
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <Form {...locationInfoForm}>
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium text-gray-800">Business Location</h3>
                              
                              <FormField
                                control={locationInfoForm.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Street Address</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Enter street address" 
                                        className="border-purple-100 focus:border-purple-300" 
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={locationInfoForm.control}
                                  name="city"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>City</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="City" 
                                          className="border-purple-100 focus:border-purple-300" 
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={locationInfoForm.control}
                                  name="state"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>State</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="State" 
                                          className="border-purple-100 focus:border-purple-300" 
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              <FormField
                                control={locationInfoForm.control}
                                name="zipCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>ZIP / Postal Code</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="ZIP code" 
                                        className="border-purple-100 focus:border-purple-300" 
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </Form>
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
              
              {/* Step 3: KYC Verification */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-purple-500" />
                    KYC Verification
                  </h2>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100 mb-6">
                    <p className="text-sm text-purple-800">
                      <strong>Why we need this:</strong> To ensure trust and safety on our platform, we verify the identity of all vendors. This information will not be shared with customers.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <Label htmlFor="idDocument" className="text-gray-700 block mb-2">Personal ID Document</Label>
                      <div className="mt-1">
                        {idDocPreview ? (
                          <div className="relative rounded-lg overflow-hidden border border-purple-100">
                            <img 
                              src={idDocPreview} 
                              alt="ID document preview" 
                              className="w-full h-40 object-contain bg-gray-50 p-2" 
                            />
                            <button 
                              type="button" 
                              onClick={() => {
                                setIdDocFile(null);
                                setIdDocPreview('');
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-purple-200 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                            <FileImage className="w-8 h-8 text-purple-400 mb-2" />
                            <span className="text-sm text-purple-500 font-medium">Upload ID Document</span>
                            <span className="text-xs text-gray-500 mt-1">Passport, Driver's License, ID Card</span>
                            <input 
                              type="file" 
                              id="idDocument"
                              className="hidden" 
                              onChange={(e) => handleFileChange(e, setIdDocFile, setIdDocPreview)} 
                              accept="image/*,.pdf" 
                            />
                          </label>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-gray-500">Accepted formats: JPG, PNG, PDF. Max size: 5MB</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="businessDocument" className="text-gray-700 block mb-2">Business Registration Document</Label>
                      <div className="mt-1">
                        {businessDocPreview ? (
                          <div className="relative rounded-lg overflow-hidden border border-purple-100">
                            <img 
                              src={businessDocPreview} 
                              alt="Business document preview" 
                              className="w-full h-40 object-contain bg-gray-50 p-2" 
                            />
                            <button 
                              type="button" 
                              onClick={() => {
                                setBusinessDocFile(null);
                                setBusinessDocPreview('');
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-purple-200 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors">
                            <FileText className="w-8 h-8 text-purple-400 mb-2" />
                            <span className="text-sm text-purple-500 font-medium">Upload Business Document</span>
                            <span className="text-xs text-gray-500 mt-1">Registration Certificate, Business License</span>
                            <input 
                              type="file" 
                              id="businessDocument"
                              className="hidden" 
                              onChange={(e) => handleFileChange(e, setBusinessDocFile, setBusinessDocPreview)} 
                              accept="image/*,.pdf" 
                            />
                          </label>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-gray-500">Accepted formats: JPG, PNG, PDF. Max size: 5MB</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100 mt-6">
                    <p className="text-sm text-yellow-800">
                      <strong>Verification Process:</strong> Document verification typically takes 1-2 business days. You can continue with the setup of your profile now and start receiving bookings once approved.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Step 4: Service Information */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
                    Service Information
                  </h2>
                  
                  <Form {...serviceInfoForm}>
                    <form className="space-y-6">
                      <FormField
                        control={serviceInfoForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your business and services..." 
                                className="resize-none min-h-[150px] border-purple-100 focus:border-purple-300" 
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Describe your business, experience, and what makes your services special
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <Label className="text-gray-700 block mb-3">Service Categories</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {serviceCategories.map((category) => (
                            <div 
                              key={category.id}
                              onClick={() => toggleServiceCategory(category.id)}
                              className={`
                                flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors
                                ${selectedServiceCategories.includes(category.id) 
                                  ? 'border-primary bg-primary/5 font-medium' 
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }
                              `}
                            >
                              {selectedServiceCategories.includes(category.id) && (
                                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                              )}
                              <span className={selectedServiceCategories.includes(category.id) ? 'text-primary' : 'text-gray-700'}>
                                {category.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        {serviceInfoForm.formState.errors.serviceCategories && (
                          <p className="text-sm font-medium text-destructive mt-2">
                            {serviceInfoForm.formState.errors.serviceCategories.message}
                          </p>
                        )}
                      </div>
                      
                      <FormField
                        control={serviceInfoForm.control}
                        name="priceRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Starting Price Range</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., ₹5,000 - ₹15,000" 
                                className="border-purple-100 focus:border-purple-300" 
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Provide a typical price range for your services
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <Label className="text-gray-700 block mb-3">Portfolio Images</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {portfolioImages.map((image, index) => (
                            <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-purple-100">
                              <img 
                                src={image} 
                                alt={`Portfolio ${index + 1}`} 
                                className="w-full h-full object-cover" 
                              />
                              <button 
                                type="button" 
                                onClick={() => setPortfolioImages(prev => prev.filter((_, i) => i !== index))}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                          
                          <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-md cursor-pointer hover:bg-purple-50 transition-colors">
                            <Camera className="w-8 h-8 text-purple-400 mb-2" />
                            <span className="text-sm text-purple-500">Add Photos</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              onChange={handlePortfolioUpload} 
                              accept="image/*" 
                              multiple 
                            />
                          </label>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">
                          Showcase your best work! You can upload up to 10 portfolio images.
                        </p>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
              
              {/* Step 5: Availability */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                    Availability Settings
                  </h2>
                  
                  <p className="text-gray-600">
                    Set your regular working hours. Customers will be able to book your services during these times.
                  </p>
                  
                  <div className="space-y-4">
                    {Object.entries(availabilityDays).map(([day, { selected, start, end }]) => (
                      <div key={day} className="grid grid-cols-5 gap-3 items-center border-b border-gray-100 pb-3">
                        <div className="col-span-2 flex items-center">
                          <input
                            type="checkbox"
                            id={`day-${day}`}
                            checked={selected}
                            onChange={() => toggleAvailabilityDay(day as keyof typeof availabilityDays)}
                            className="mr-3 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label 
                            htmlFor={`day-${day}`}
                            className={`capitalize ${selected ? 'text-gray-900' : 'text-gray-500'}`}
                          >
                            {day}
                          </Label>
                        </div>
                        
                        {selected ? (
                          <>
                            <div>
                              <Input
                                type="time"
                                value={start}
                                onChange={(e) => updateAvailabilityTime(
                                  day as keyof typeof availabilityDays, 
                                  'start', 
                                  e.target.value
                                )}
                                className="border-purple-100 focus:border-purple-300"
                              />
                            </div>
                            <div className="text-center text-gray-500">to</div>
                            <div>
                              <Input
                                type="time"
                                value={end}
                                onChange={(e) => updateAvailabilityTime(
                                  day as keyof typeof availabilityDays, 
                                  'end', 
                                  e.target.value
                                )}
                                className="border-purple-100 focus:border-purple-300"
                              />
                            </div>
                          </>
                        ) : (
                          <div className="col-span-3 text-gray-400 text-sm">Not Available</div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> You can set custom availability for specific dates later in your vendor dashboard.
                    </p>
                  </div>
                </div>
              )}
              
              {/* Step 6: Review & Submit */}
              {currentStep === 6 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <CheckSquare className="w-5 h-5 mr-2 text-purple-500" />
                    Review & Submit
                  </h2>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 overflow-hidden rounded-full border-2 border-white shadow-md">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Business logo" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                            <Building className="w-8 h-8 text-purple-500" />
                          </div>
                        )}
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold">{businessInfoForm.getValues().businessName || "Your Business"}</h3>
                        <p className="text-gray-500 text-sm">{businessInfoForm.getValues().businessType || "Event Services"}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Building className="w-4 h-4 text-purple-500" /> Business Information
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-500">Name:</span> {businessInfoForm.getValues().businessName}</p>
                          <p><span className="text-gray-500">Type:</span> {businessInfoForm.getValues().businessType}</p>
                          {businessInfoForm.getValues().registrationNumber && (
                            <p><span className="text-gray-500">Reg. Number:</span> {businessInfoForm.getValues().registrationNumber}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-purple-500" /> Contact Information
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-500">Email:</span> {contactInfoForm.getValues().email}</p>
                          <p><span className="text-gray-500">Phone:</span> {contactInfoForm.getValues().phoneNumber}</p>
                          {contactInfoForm.getValues().website && (
                            <p><span className="text-gray-500">Website:</span> {contactInfoForm.getValues().website}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-500" /> Location
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p>{locationInfoForm.getValues().address}</p>
                          <p>{locationInfoForm.getValues().city}, {locationInfoForm.getValues().state} {locationInfoForm.getValues().zipCode}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-purple-500" /> Services
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-500">Categories:</span> {selectedServiceCategories.map(cat => {
                            const category = serviceCategories.find(c => c.id === cat);
                            return category ? category.name : cat;
                          }).join(", ")}</p>
                          <p><span className="text-gray-500">Price Range:</span> {serviceInfoForm.getValues().priceRange}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Documents & Verification</h4>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <div className={`w-3 h-3 rounded-full ${idDocFile ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span>ID Document</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className={`w-3 h-3 rounded-full ${businessDocFile ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span>Business Registration</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Portfolio</h4>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {portfolioImages.length > 0 ? (
                          portfolioImages.map((image, index) => (
                            <div key={index} className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
                              <img src={image} alt={`Portfolio ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 italic">No portfolio images uploaded</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-800 text-sm">
                      By submitting this form, you agree to our <Link to="/terms" className="text-yellow-800 underline">Terms of Service</Link> and <Link to="/privacy" className="text-yellow-800 underline">Privacy Policy</Link>. 
                      We'll review your application within 2-3 business days. You'll receive an email notification once your account is approved.
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
                    type="button"
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-eventPurple-500 to-eventPink-500 hover:from-eventPurple-600 hover:to-eventPink-600 text-white"
                  >
                    Submit Application
                    <Sparkles className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">Already a vendor? <Link to="/auth" className="text-purple-600 hover:text-purple-700 font-medium">Sign in to your dashboard</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VendorOnboarding;
