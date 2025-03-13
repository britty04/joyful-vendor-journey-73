
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BanknoteIcon, CreditCard, WalletIcon, CheckCircle2, ArrowRightIcon, Building2Icon, PiggyBankIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

const transferFormSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  routingNumber: z.string().min(1, "Routing number is required"),
  accountName: z.string().min(1, "Account name is required"),
  bankName: z.string().min(1, "Bank name is required"),
});

type TransferFormValues = z.infer<typeof transferFormSchema>;

const TransferEarnings = () => {
  const { toast } = useToast();
  const [transferStatus, setTransferStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'bank' | 'card' | 'wallet'>('bank');

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      amount: '',
      accountNumber: '',
      routingNumber: '',
      accountName: '',
      bankName: '',
    },
  });

  const handleTransfer = (values: TransferFormValues) => {
    setTransferStatus('processing');
    
    // Simulate API call
    setTimeout(() => {
      setTransferStatus('success');
      toast({
        title: "Transfer Initiated",
        description: `₹${values.amount} has been sent to your ${selectedPaymentMethod}. It may take 1-3 business days to appear in your account.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Transfer Your Earnings</h2>
        <p className="text-muted-foreground">Withdraw your available balance to your bank account or digital wallet</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Transfer Funds</CardTitle>
            <CardDescription>
              Choose how you want to receive your funds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <Button 
                variant={selectedPaymentMethod === 'bank' ? 'default' : 'outline'} 
                className="flex-1"
                onClick={() => setSelectedPaymentMethod('bank')}
              >
                <Building2Icon className="mr-2 h-4 w-4" />
                Bank Account
              </Button>
              <Button 
                variant={selectedPaymentMethod === 'card' ? 'default' : 'outline'} 
                className="flex-1"
                onClick={() => setSelectedPaymentMethod('card')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Debit Card
              </Button>
              <Button 
                variant={selectedPaymentMethod === 'wallet' ? 'default' : 'outline'} 
                className="flex-1"
                onClick={() => setSelectedPaymentMethod('wallet')}
              >
                <WalletIcon className="mr-2 h-4 w-4" />
                Digital Wallet
              </Button>
            </div>

            {selectedPaymentMethod === 'bank' && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleTransfer)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount to Transfer</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                            <Input placeholder="0.00" className="pl-8" {...field} />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Available balance: ₹3,240.50
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="accountName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Holder Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                          <FormLabel>Routing Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={transferStatus !== 'idle'}
                    className="w-full mt-2"
                  >
                    {transferStatus === 'processing' ? (
                      <>Processing<span className="ml-2 animate-pulse">...</span></>
                    ) : transferStatus === 'success' ? (
                      <>Transfer Complete <CheckCircle2 className="ml-2 h-4 w-4" /></>
                    ) : (
                      <>Transfer Funds <ArrowRightIcon className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </form>
              </Form>
            )}

            {selectedPaymentMethod === 'card' && (
              <div className="text-center py-8">
                <CreditCard className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  Direct transfers to debit cards will be available in the next update.
                </p>
              </div>
            )}

            {selectedPaymentMethod === 'wallet' && (
              <div className="text-center py-8">
                <WalletIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  Transfers to digital wallets will be available in the next update.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transfer Summary</CardTitle>
            <CardDescription>
              Your recent withdrawal activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">₹3,240.50</span>
              <PiggyBankIcon className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Available for withdrawal</p>
            
            <div className="border rounded-md p-4 mt-6">
              <h4 className="font-medium mb-2">Pending Transfers</h4>
              <div className="text-sm text-muted-foreground italic">No pending transfers</div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex flex-col">
            <h4 className="font-medium mb-2 w-full">Recent Transfers</h4>
            
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <div className="font-medium">₹1,500.00</div>
                  <div className="text-muted-foreground">Oct 15, 2023</div>
                </div>
                <span className="text-green-600 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Completed
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div>
                  <div className="font-medium">₹2,200.00</div>
                  <div className="text-muted-foreground">Sep 28, 2023</div>
                </div>
                <span className="text-green-600 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-1" /> Completed
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TransferEarnings;
