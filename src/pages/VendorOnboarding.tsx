
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Layout from '../components/Layout';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { 
  ArrowRight, 
  Building2, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon, 
  MapPin, 
  Clock, 
  CalendarDays, 
  CreditCard, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  Upload 
} from 'lucide-react';

// Form schema
const formSchema = z.object({
  // Step 1: Basic Information
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters" }),
  businessDescription: z.string().min(10, { message: "Please provide a description of at least 10 characters" }),
  businessCategory: z.string().min(1, { message: "Please select a category" }),
  businessPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
  businessEmail: z.string().email({ message: "Please enter a valid email address" }),
  
  // Step 2: Location & Availability
  address: z.string().min(5, { message: "Please enter your business address" }),
  city: z.string().min(2, { message: "Please enter your city" }),
  state: z.string().min(2, { message: "Please enter your state" }),
  zipCode: z.string().min(5, { message: "Please enter a valid zip code" }),
  availableDays: z.array(z.string()).min(1, { message: "Please select at least one day" }),
  serviceRadius: z.number().min(5, { message: "Service radius must be at least 5 miles" }),
  
  // Step 3: Services & Pricing
  servicesList: z.array(z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.string()
  })).min(1, { message: "Please add at least one service" }),
  
  // Step 4: Portfolio & Documents
  portfolioImages: z.array(z.string()).optional(),
  businessLicense: z.string().optional(),
  insurance: z.string().optional(),
  
  // Step 5: Payment Information
  accountHolderName: z.string().min(2, { message: "Please enter account holder name" }),
  accountNumber: z.string().min(10, { message: "Please enter a valid account number" }),
  routingNumber: z.string().min(9, { message: "Please enter a valid routing number" }),
  taxId: z.string().min(9, { message: "Please enter a valid tax ID" }),
  
  // Terms and Conditions
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
});

type FormValues = z.infer<typeof formSchema>;

const VendorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessDescription: "",
      businessCategory: "",
      businessPhone: "",
      businessEmail: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      availableDays: [],
      serviceRadius: 10,
      servicesList: [{ name: "", description: "", price: 0, duration: "" }],
      portfolioImages: [],
      businessLicense: "",
      insurance: "",
      accountHolderName: "",
      accountNumber: "",
      routingNumber: "",
      taxId: "",
      termsAccepted: false
    }
  });
  
  // Available days options
  const daysOfWeek = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ];
  
  // Business categories
  const businessCategories = [
    "Photography",
    "Catering",
    "DJ/Music",
    "Event Planning",
    "Decorations",
    "Venue",
    "Florist",
    "Transportation",
    "Other"
  ];
  
  const nextStep = () => {
    // Validate the current step first
    if (currentStep === 1) {
      const step1Fields = ["businessName", "businessDescription", "businessCategory", "businessPhone", "businessEmail"];
      const hasErrors = step1Fields.some(field => form.formState.errors[field as keyof FormValues]);
      
      if (hasErrors) {
        toast({
          title: "Validation Error",
          description: "Please correct the errors before proceeding",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStep === 2) {
      const step2Fields = ["address", "city", "state", "zipCode", "availableDays", "serviceRadius"];
      const hasErrors = step2Fields.some(field => form.formState.errors[field as keyof FormValues]);
      
      if (hasErrors) {
        toast({
          title: "Validation Error",
          description: "Please correct the errors before proceeding",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Add service to the list
  const addService = () => {
    const currentServices = form.getValues("servicesList") || [];
    form.setValue("servicesList", [
      ...currentServices, 
      { name: "", description: "", price: 0, duration: "" }
    ]);
  };
  
  // Remove service from the list
  const removeService = (index: number) => {
    const currentServices = form.getValues("servicesList") || [];
    if (currentServices.length > 1) {
      form.setValue("servicesList", currentServices.filter((_, i) => i !== index));
    }
  };
  
  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted with values:", values);
      
      // Store vendor data in localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          localStorage.setItem('user', JSON.stringify({
            ...user,
            isVendor: true,
            vendorProfile: values
          }));
        } catch (e) {
          console.error('Failed to update user data');
        }
      }
      
      setIsSubmitting(false);
      
      toast({
        title: "Onboarding Complete!",
        description: "Your vendor profile has been created successfully",
      });
      
      // Redirect to vendor dashboard
      navigate('/vendor/dashboard');
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Vendor Onboarding</h1>
          <p className="text-muted-foreground">Complete the following steps to create your vendor profile</p>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep > index + 1 
                      ? 'bg-green-100 text-green-600 border border-green-600' 
                      : currentStep === index + 1 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {currentStep > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`text-xs mt-1 ${currentStep === index + 1 ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {index === 0 ? 'Business Info' : 
                    index === 1 ? 'Location' : 
                    index === 2 ? 'Services' : 
                    index === 3 ? 'Portfolio' : 'Payment'}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
            <div 
              className="absolute top-0 left-0 h-1 bg-primary rounded transition-all duration-300" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Step 1: Basic Business Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Building2 className="mr-2 h-5 w-5" /> Business Information</CardTitle>
                  <CardDescription>Tell us about your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Business Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be displayed to customers on your profile
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="businessCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Category*</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={field.value}
                            onChange={field.onChange}
                          >
                            <option value="">Select a category</option>
                            {businessCategories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormDescription>
                          Choose the category that best describes your services
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="businessDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Description*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell customers about your business, services, and experience..."
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description of your business and services
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Phone*</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="businessEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Email*</FormLabel>
                          <FormControl>
                            <Input placeholder="business@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="button" onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Step 2: Location & Availability */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><MapPin className="mr-2 h-5 w-5" /> Location & Availability</CardTitle>
                  <CardDescription>Where are you located and when are you available?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City*</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State*</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code*</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="serviceRadius"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Radius (miles)*</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={5} 
                            placeholder="How far are you willing to travel?" 
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 5)}
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum distance you are willing to travel for your services
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="availableDays"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Available Days*</FormLabel>
                          <FormDescription>
                            Select the days when you are typically available
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {daysOfWeek.map((day) => (
                            <FormField
                              key={day.id}
                              control={form.control}
                              name="availableDays"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={day.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(day.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, day.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== day.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {day.label}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Step 3: Services & Pricing */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5" /> Services & Pricing</CardTitle>
                  <CardDescription>Add the services you offer and their pricing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {form.getValues().servicesList?.map((_, index) => (
                    <div key={index} className="p-4 border rounded-lg relative">
                      <div className="absolute top-2 right-2">
                        {form.getValues().servicesList.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeService(index)}
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Remove service</span>
                            <span aria-hidden="true">×</span>
                          </Button>
                        )}
                      </div>
                      
                      <h3 className="font-medium mb-4">Service {index + 1}</h3>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`servicesList.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Name*</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Basic Photography Package" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`servicesList.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Description*</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe what's included in this service..."
                                  className="min-h-24"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`servicesList.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price ($)*</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Price in USD"
                                    {...field}
                                    onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`servicesList.${index}.duration`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration*</FormLabel>
                                <FormControl>
                                  <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={field.value}
                                    onChange={field.onChange}
                                  >
                                    <option value="">Select duration</option>
                                    <option value="1 hour">1 hour</option>
                                    <option value="2 hours">2 hours</option>
                                    <option value="3 hours">3 hours</option>
                                    <option value="4 hours">4 hours</option>
                                    <option value="Half day (5 hours)">Half day (5 hours)</option>
                                    <option value="Full day (8+ hours)">Full day (8+ hours)</option>
                                    <option value="Custom">Custom</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={addService}
                  >
                    + Add Another Service
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Step 4: Portfolio & Documents */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><ImageIcon className="mr-2 h-5 w-5" /> Portfolio & Documents</CardTitle>
                  <CardDescription>Upload photos of your work and business documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Portfolio Images</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload high-quality photos showcasing your best work
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {/* Mock portfolio upload areas */}
                      {[1, 2, 3, 4].map((item) => (
                        <div 
                          key={item}
                          className="aspect-square rounded-md border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                        >
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-xs text-center text-muted-foreground px-2">Upload Photo</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button type="button" variant="outline" className="w-full">
                      + Add More Photos
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Business License</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload a copy of your business license or permit
                      </p>
                      <div className="aspect-video rounded-md border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-muted-foreground">Click to upload</span>
                        <span className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Insurance Documentation</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload proof of insurance if applicable
                      </p>
                      <div className="aspect-video rounded-md border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm text-muted-foreground">Click to upload</span>
                        <span className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Step 5: Payment Information */}
            {currentStep === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5" /> Payment Information</CardTitle>
                  <CardDescription>Set up how you'll receive payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border rounded-md bg-amber-50">
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> This information is used to process payments to you. We'll never share your financial information with customers.
                    </p>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="accountHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Name on account" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number*</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="routingNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Routing Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="123456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID / SSN*</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••••" {...field} />
                        </FormControl>
                        <FormDescription>
                          Required for tax reporting purposes
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the Terms and Conditions and Privacy Policy
                            </FormLabel>
                            <FormDescription>
                              By checking this box, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>Completing Setup<span className="ml-2 animate-pulse">...</span></>
                    ) : (
                      <>Complete Onboarding <CheckCircle2 className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default VendorOnboarding;
