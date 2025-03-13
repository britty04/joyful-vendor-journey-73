
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreditCard, Plus, Trash2, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
  isDefault: boolean;
}

const CustomerPaymentMethods = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  // Mock data for payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit',
      cardNumber: '**** **** **** 4567',
      expiryDate: '06/25',
      cardholderName: 'Sarah Johnson',
      isDefault: true,
    },
    {
      id: '2',
      type: 'debit',
      cardNumber: '**** **** **** 8901',
      expiryDate: '09/24',
      cardholderName: 'Sarah Johnson',
      isDefault: false,
    },
  ]);

  const addPaymentMethod = () => {
    // Basic validation
    if (!newCard.cardholderName || !newCard.cardNumber || !newCard.expiryDate || !newCard.cvv) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newPaymentMethod: PaymentMethod = {
      id: (paymentMethods.length + 1).toString(),
      type: 'credit',
      cardNumber: '**** **** **** ' + newCard.cardNumber.slice(-4),
      expiryDate: newCard.expiryDate,
      cardholderName: newCard.cardholderName,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setNewCard({
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
    setShowAddForm(false);
    
    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been added successfully.",
    });
  };

  const removePaymentMethod = (id: string) => {
    const methodToRemove = paymentMethods.find(method => method.id === id);
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    
    toast({
      title: "Payment Method Removed",
      description: `The card ending in ${methodToRemove?.cardNumber.slice(-4)} has been removed.`,
    });
    
    // If the default method was removed, set the first remaining method as default
    if (methodToRemove?.isDefault && paymentMethods.length > 1) {
      const remainingMethods = paymentMethods.filter(method => method.id !== id);
      setPaymentMethods(remainingMethods.map((method, index) => 
        index === 0 ? { ...method, isDefault: true } : method
      ));
    }
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => 
      ({ ...method, isDefault: method.id === id })
    ));
    
    const newDefault = paymentMethods.find(method => method.id === id);
    
    toast({
      title: "Default Payment Method Updated",
      description: `Card ending in ${newDefault?.cardNumber.slice(-4)} is now your default payment method.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment methods</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <Card className="mb-6 border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">Add New Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                    <Input 
                      placeholder="Name as it appears on card" 
                      value={newCard.cardholderName}
                      onChange={(e) => setNewCard({ ...newCard, cardholderName: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <Input 
                      placeholder="**** **** **** ****" 
                      value={newCard.cardNumber}
                      onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <Input 
                      placeholder="MM/YY" 
                      value={newCard.expiryDate}
                      onChange={(e) => setNewCard({ ...newCard, expiryDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <Input 
                      placeholder="***" 
                      type="password"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addPaymentMethod}>
                    Save Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={`overflow-hidden ${method.isDefault ? 'border-primary' : ''}`}>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" /> 
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold">{method.type === 'credit' ? 'Credit Card' : 'Debit Card'}</h3>
                          {method.isDefault && (
                            <span className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{method.cardNumber}</p>
                      </div>
                    </div>
                    <div className="text-sm text-right">
                      <p>{method.cardholderName}</p>
                      <p className="text-muted-foreground">Expires {method.expiryDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    {!method.isDefault && (
                      <Button size="sm" variant="outline" onClick={() => setDefaultPaymentMethod(method.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Make Default
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="text-destructive" onClick={() => removePaymentMethod(method.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {paymentMethods.length === 0 && (
            <div className="text-center py-10">
              <CreditCard className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Payment Methods</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                You haven't added any payment methods yet.
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Payment Method
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerPaymentMethods;
