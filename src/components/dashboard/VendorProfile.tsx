
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, CalendarClock, MapPin, Camera, Briefcase, Instagram, Facebook, Globe, Mail, Phone, Save, PlusCircle, ImageIcon, CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileFormSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  tagline: z.string().optional(),
  bio: z.string().min(10, "Bio should be at least 10 characters"),
  serviceDescription: z.string().min(10, "Service description should be at least 10 characters"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Service types and availability data structure
interface ServiceType {
  id: string;
  name: string;
  selected: boolean;
}

interface AvailabilitySlot {
  day: string;
  available: boolean;
  startTime: string;
  endTime: string;
}

const VendorProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Demo data for service types
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([
    { id: '1', name: 'Wedding Photography', selected: true },
    { id: '2', name: 'Corporate Events', selected: false },
    { id: '3', name: 'Birthday Parties', selected: true },
    { id: '4', name: 'Live Music', selected: false },
    { id: '5', name: 'Catering', selected: true },
    { id: '6', name: 'Event Space', selected: false },
  ]);
  
  // Demo data for vendor availability
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([
    { day: 'Monday', available: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Tuesday', available: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Wednesday', available: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Thursday', available: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Friday', available: true, startTime: '09:00', endTime: '17:00' },
    { day: 'Saturday', available: true, startTime: '10:00', endTime: '16:00' },
    { day: 'Sunday', available: false, startTime: '10:00', endTime: '16:00' },
  ]);
  
  // Profile demo data
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      businessName: 'Stellar Events & Photography',
      tagline: 'Capturing moments that last forever',
      bio: 'We are a full-service event planning and photography studio with over 10 years of experience creating magical memories. Our team of professionals is dedicated to making your special day unforgettable.',
      serviceDescription: 'We specialize in wedding photography, corporate events, and birthday celebrations. Our services include professional photography, custom albums, and digital galleries.',
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      phone: '(415) 555-1234',
      email: 'contact@stellarevents.com',
      website: 'https://www.stellarevents.com',
      instagram: '@stellarevents',
      facebook: 'stellarevents',
    },
  });
  
  const toggleServiceType = (id: string) => {
    setServiceTypes(serviceTypes.map(service => 
      service.id === id ? { ...service, selected: !service.selected } : service
    ));
  };
  
  const toggleAvailability = (day: string) => {
    setAvailability(availability.map(slot => 
      slot.day === day ? { ...slot, available: !slot.available } : slot
    ));
  };
  
  const updateAvailabilityTime = (day: string, field: 'startTime' | 'endTime', value: string) => {
    setAvailability(availability.map(slot => 
      slot.day === day ? { ...slot, [field]: value } : slot
    ));
  };
  
  const handleSaveProfile = (values: ProfileFormValues) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your vendor profile has been successfully updated.",
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-2">Vendor Profile</h2>
          <p className="text-muted-foreground">Manage how you appear to customers on the platform</p>
        </div>
        <Button 
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSaveProfile)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Header Card */}
            <Card className="md:col-span-3">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                    {isEditing && (
                      <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          {isEditing ? (
                            <>
                              <FormLabel>Business Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </>
                          ) : (
                            <h3 className="text-2xl font-bold">{field.value}</h3>
                          )}
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tagline"
                      render={({ field }) => (
                        <FormItem>
                          {isEditing ? (
                            <>
                              <FormLabel>Tagline</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                A short phrase that describes your business
                              </FormDescription>
                              <FormMessage />
                            </>
                          ) : (
                            <p className="text-muted-foreground">{field.value}</p>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 ml-auto">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{form.getValues("city")}, {form.getValues("state")}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CalendarClock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Joined January 2023</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Main Profile Info */}
            <div className="space-y-6 md:col-span-2">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                  <CardDescription>Tell customers about your business</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Biography</FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <Textarea {...field} rows={5} />
                          ) : (
                            <div className="text-sm">{field.value}</div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="serviceDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Services Description</FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <Textarea {...field} rows={3} />
                          ) : (
                            <div className="text-sm">{field.value}</div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              {/* Service Types */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Types</CardTitle>
                  <CardDescription>Select the types of services you offer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {serviceTypes.map((service) => (
                      <div 
                        key={service.id}
                        className={`flex items-center gap-2 p-3 rounded-md border ${
                          service.selected ? 'border-primary bg-primary/5' : 'border-input'
                        } cursor-pointer`}
                        onClick={() => isEditing && toggleServiceType(service.id)}
                      >
                        <Briefcase className={`h-5 w-5 ${service.selected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span>{service.name}</span>
                        {service.selected && <CheckCircle className="h-4 w-4 text-primary ml-auto" />}
                      </div>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <Button variant="outline" className="mt-4">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Custom Service
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              {/* Portfolio Gallery */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Gallery</CardTitle>
                  <CardDescription>Showcase your previous work</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="aspect-square rounded-md bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    ))}
                    
                    {isEditing && (
                      <div className="aspect-square rounded-md border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                        <PlusCircle className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Add Photo</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6 md:col-span-1">
              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>Set your working hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {availability.map((slot) => (
                      <div key={slot.day} className="grid grid-cols-3 gap-2 items-center">
                        <div className="flex items-center">
                          {isEditing ? (
                            <input
                              type="checkbox"
                              checked={slot.available}
                              onChange={() => toggleAvailability(slot.day)}
                              className="mr-2"
                            />
                          ) : (
                            <div className={`w-3 h-3 rounded-full mr-2 ${slot.available ? 'bg-green-500' : 'bg-gray-300'}`} />
                          )}
                          <span className="text-sm">{slot.day}</span>
                        </div>
                        {slot.available ? (
                          <>
                            <Input 
                              type="time" 
                              value={slot.startTime} 
                              onChange={(e) => isEditing && updateAvailabilityTime(slot.day, 'startTime', e.target.value)}
                              disabled={!isEditing}
                              className="text-sm py-1 px-2 h-8"
                            />
                            <Input 
                              type="time" 
                              value={slot.endTime}
                              onChange={(e) => isEditing && updateAvailabilityTime(slot.day, 'endTime', e.target.value)}
                              disabled={!isEditing}
                              className="text-sm py-1 px-2 h-8"
                            />
                          </>
                        ) : (
                          <span className="col-span-2 text-sm text-muted-foreground">Not Available</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>How customers can reach you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <Input {...field} />
                          ) : (
                            <div className="text-sm flex">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{field.value}</span>
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            {isEditing ? <Input {...field} /> : <div className="text-sm">{field.value}</div>}
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
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            {isEditing ? <Input {...field} /> : <div className="text-sm">{field.value}</div>}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          {isEditing ? <Input {...field} /> : <div className="text-sm">{field.value}</div>}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <Input {...field} />
                          ) : (
                            <div className="text-sm flex">
                              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{field.value}</span>
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <Input {...field} />
                          ) : (
                            <div className="text-sm flex">
                              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{field.value}</span>
                            </div>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>Your online presence</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <Input {...field} placeholder="https://" />
                          ) : (
                            field.value && (
                              <div className="text-sm flex">
                                <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                                <a href={field.value} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  {field.value}
                                </a>
                              </div>
                            )
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <Input {...field} placeholder="@username" />
                          ) : (
                            field.value && (
                              <div className="text-sm flex">
                                <Instagram className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{field.value}</span>
                              </div>
                            )
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          {isEditing ? (
                            <Input {...field} placeholder="username or page name" />
                          ) : (
                            field.value && (
                              <div className="text-sm flex">
                                <Facebook className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{field.value}</span>
                              </div>
                            )
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          
          {isEditing && (
            <div className="sticky bottom-0 bg-background border-t p-4 mt-8 -mx-4 flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>Saving Changes<span className="ml-2 animate-pulse">...</span></>
                ) : (
                  <>Save Profile <Save className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default VendorProfile;
