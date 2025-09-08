import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { format } from "date-fns";

interface CardData {
  id: string;
  full_name: string;
  email: string | null;
  role: string | null;
  company: string | null;
  phone: string | null;
  website: string | null;
  slug: string;
  style_id: string;
  created_at: string;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("mildtechstudios@gmail.com");
  const [authCode, setAuthCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [users, setUsers] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingCode(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-admin-code', {
        body: { email }
      });

      if (error) throw error;

      setCodeSent(true);
      toast({
        title: "Code sent",
        description: "Check your email for the authentication code",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send authentication code",
      });
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verify the code against the database
      const { data, error } = await supabase
        .from('admin_auth_codes')
        .select('*')
        .eq('code', authCode)
        .eq('email', email)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        toast({
          variant: "destructive",
          title: "Invalid code",
          description: "The authentication code is invalid or expired",
        });
        return;
      }

      // Mark the code as used
      await supabase
        .from('admin_auth_codes')
        .update({ used: true })
        .eq('id', data.id);

      setIsAuthenticated(true);
      fetchUsers();
      toast({
        title: "Access granted",
        description: "Welcome to the admin panel",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to verify authentication code",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch users",
        });
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <SEO 
          title="Admin Login"
          description="Admin access only"
        />
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>
                {!codeSent ? "Request authentication code" : "Enter the code sent to your email"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!codeSent ? (
                <form onSubmit={handleSendCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter admin email"
                      required
                      disabled
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={sendingCode}>
                    {sendingCode ? "Sending..." : "Send Authentication Code"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="authCode">Authentication Code</Label>
                    <Input
                      id="authCode"
                      type="text"
                      value={authCode}
                      onChange={(e) => setAuthCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Verifying..." : "Verify Code"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setCodeSent(false);
                        setAuthCode("");
                      }}
                    >
                      Back to Email
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Admin Dashboard"
        description="User management dashboard"
      />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage users and view statistics</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>Total users: {users.length}</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Style</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Slug</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.full_name}
                          </TableCell>
                          <TableCell>{user.email || "N/A"}</TableCell>
                          <TableCell>{user.company || "N/A"}</TableCell>
                          <TableCell>{user.role || "N/A"}</TableCell>
                          <TableCell className="capitalize">{user.style_id}</TableCell>
                          <TableCell>
                            {format(new Date(user.created_at), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell>
                            <code className="text-sm bg-muted px-2 py-1 rounded">
                              {user.slug}
                            </code>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {users.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No users found
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Admin;