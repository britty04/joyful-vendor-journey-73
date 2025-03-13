
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
  isActive: boolean;
  vendorCount: number;
}

export const AdminLocationManager = () => {
  const [newLocation, setNewLocation] = useState({
    city: '',
    state: '',
    country: '',
  });
  
  // Mock data for locations using Indian cities
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      isActive: true,
      vendorCount: 42,
    },
    {
      id: '2',
      city: 'Delhi',
      state: 'Delhi NCR',
      country: 'India',
      isActive: true,
      vendorCount: 36,
    },
    {
      id: '3',
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India',
      isActive: true,
      vendorCount: 28,
    },
    {
      id: '4',
      city: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India',
      isActive: true,
      vendorCount: 23,
    },
    {
      id: '5',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      isActive: true,
      vendorCount: 31,
    },
    {
      id: '6',
      city: 'Kolkata',
      state: 'West Bengal',
      country: 'India',
      isActive: true,
      vendorCount: 19,
    },
    {
      id: '7',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      isActive: true,
      vendorCount: 15,
    },
    {
      id: '8',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      isActive: true,
      vendorCount: 12,
    },
  ]);

  const addLocation = () => {
    if (!newLocation.city || !newLocation.state || !newLocation.country) {
      toast({
        title: "Validation Error",
        description: "Please fill in all location fields",
        variant: "destructive",
      });
      return;
    }

    const newLocationEntry: Location = {
      id: (locations.length + 1).toString(),
      city: newLocation.city,
      state: newLocation.state,
      country: newLocation.country,
      isActive: true,
      vendorCount: 0,
    };

    setLocations([...locations, newLocationEntry]);
    setNewLocation({ city: '', state: '', country: '' });
    
    toast({
      title: "Location Added",
      description: `${newLocation.city}, ${newLocation.state} has been added successfully.`,
    });
  };

  const toggleLocationStatus = (id: string) => {
    setLocations(locations.map(location => 
      location.id === id ? { ...location, isActive: !location.isActive } : location
    ));
    
    const location = locations.find(loc => loc.id === id);
    if (location) {
      toast({
        title: location.isActive ? "Location Deactivated" : "Location Activated",
        description: `${location.city}, ${location.state} has been ${location.isActive ? 'deactivated' : 'activated'}.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Location</CardTitle>
          <CardDescription>Add a new city where vendors can operate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="City"
              value={newLocation.city}
              onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
              className="md:w-1/3"
            />
            <Input
              placeholder="State/Province"
              value={newLocation.state}
              onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
              className="md:w-1/3"
            />
            <Input
              placeholder="Country"
              value={newLocation.country}
              onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })}
              className="md:w-1/3"
            />
            <Button onClick={addLocation}>
              <Plus className="h-4 w-4 mr-1" />
              Add Location
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Manage Locations</CardTitle>
              <CardDescription>Activate or deactivate service locations</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search locations..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>City</TableHead>
                  <TableHead>State/Province</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Vendors</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{location.city}</TableCell>
                    <TableCell>{location.state}</TableCell>
                    <TableCell>{location.country}</TableCell>
                    <TableCell>{location.vendorCount}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        location.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {location.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit2 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={location.isActive ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"} 
                        onClick={() => toggleLocationStatus(location.id)}
                      >
                        {location.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      {location.vendorCount === 0 && (
                        <Button size="sm" variant="outline" className="bg-red-50 text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
