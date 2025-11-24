import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { format } from "date-fns";
import { Trash2, Calendar, X, ExternalLink, Mail, Phone } from "lucide-react";

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
  scheduled_deletion_at: string | null;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [users, setUsers] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<string>("");

  // Check authentication and admin role on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setIsAuthenticated(true);
          
          // Check if user has admin role
          const { data: roleData, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .eq('role', 'admin')
            .maybeSingle();
          
          if (!error && roleData) {
            setIsAdmin(true);
            fetchUsers();
          } else {
            toast({
              variant: "destructive",
              title: "Access Denied",
              description: "You don't have admin privileges",
            });
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setIsAuthenticated(true);
        
        // Check admin role
        setTimeout(async () => {
          const { data: roleData, error } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .eq('role', 'admin')
            .maybeSingle();
          
          if (!error && roleData) {
            setIsAdmin(true);
            fetchUsers();
          }
        }, 0);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    setActionLoading(userId);
    try {
      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { userId, action: 'delete_now' }
      });

      if (error) throw error;

      toast({
        title: "User deleted",
        description: "User and all associated data have been deleted",
      });

      // Refresh the users list
      fetchUsers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete user",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleScheduleDeletion = async () => {
    if (!selectedUserId || !scheduledDate) return;

    setActionLoading(selectedUserId);
    try {
      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { 
          userId: selectedUserId, 
          action: 'schedule_deletion',
          scheduledDate: new Date(scheduledDate).toISOString()
        }
      });

      if (error) throw error;

      toast({
        title: "Deletion scheduled",
        description: `User will be deleted on ${format(new Date(scheduledDate), "MMM dd, yyyy 'at' HH:mm")}`,
      });

      setIsScheduleDialogOpen(false);
      setScheduledDate("");
      setSelectedUserId(null);
      fetchUsers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to schedule deletion",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancelSchedule = async (userId: string) => {
    setActionLoading(userId);
    try {
      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { userId, action: 'cancel_schedule' }
      });

      if (error) throw error;

      toast({
        title: "Schedule cancelled",
        description: "User deletion schedule has been cancelled",
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to cancel schedule",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const openScheduleDialog = (userId: string) => {
    setSelectedUserId(userId);
    setIsScheduleDialogOpen(true);
  };

  const handleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map(user => user.id)));
    }
  };

  const handleBulkAction = async () => {
    if (!bulkAction || selectedUsers.size === 0) return;

    setActionLoading('bulk');
    try {
      const promises = Array.from(selectedUsers).map(userId => {
        if (bulkAction === 'delete') {
          return supabase.functions.invoke('delete-user', {
            body: { userId, action: 'delete_now' }
          });
        } else if (bulkAction === 'schedule') {
          if (!scheduledDate) throw new Error('Please select a date');
          return supabase.functions.invoke('delete-user', {
            body: { 
              userId, 
              action: 'schedule_deletion',
              scheduledDate: new Date(scheduledDate).toISOString()
            }
          });
        }
      });

      const results = await Promise.allSettled(promises);
      const failed = results.filter(r => r.status === 'rejected').length;
      const succeeded = results.filter(r => r.status === 'fulfilled').length;

      if (bulkAction === 'delete') {
        toast({
          title: `Bulk deletion complete`,
          description: `${succeeded} users deleted${failed > 0 ? `, ${failed} failed` : ''}`,
        });
      } else if (bulkAction === 'schedule') {
        toast({
          title: `Bulk scheduling complete`,
          description: `${succeeded} users scheduled${failed > 0 ? `, ${failed} failed` : ''}`,
        });
      }

      setSelectedUsers(new Set());
      setBulkAction('');
      setScheduledDate('');
      fetchUsers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Bulk action failed",
        description: error.message,
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleProcessScheduled = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { action: 'process_scheduled' }
      });

      if (error) throw error;

      const message = data?.deletedUsers?.length > 0 
        ? `Processed ${data.deletedUsers.length} scheduled deletions`
        : 'No scheduled deletions to process';

      toast({
        title: "Processing complete",
        description: message,
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to process scheduled deletions",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`
          }
        });

        if (error) throw error;

        toast({
          title: "Account created",
          description: "Please check your email to confirm your account. Contact the admin to be granted access.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Signed in successfully",
          description: "Checking admin privileges...",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: isSignUp ? "Sign up failed" : "Login failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setIsAuthenticated(false);
      setIsAdmin(false);
      toast({
        title: "Signed out",
        description: "You have been logged out successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message,
      });
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

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
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
                {isSignUp ? "Create an admin account" : "Sign in with your admin credentials"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
                </Button>
                <Button
                  type="button"
                  variant="link"
                  className="w-full"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
                </Button>
              </form>
              {!isAuthenticated && isAdmin === false && (
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Note: You must be granted admin role to access this page
                </p>
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
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleProcessScheduled}
                disabled={loading}
              >
                Process Scheduled Deletions
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
              <CardDescription>
                Total users: {users.length} 
                {selectedUsers.size > 0 && (
                  <span className="ml-4 text-primary">
                    ({selectedUsers.size} selected)
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Bulk Actions */}
              {selectedUsers.size > 0 && (
                <div className="mb-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label>Bulk Action:</Label>
                      <Select value={bulkAction} onValueChange={setBulkAction}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delete">Delete Now</SelectItem>
                          <SelectItem value="schedule">Schedule Deletion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {bulkAction === 'schedule' && (
                      <div className="flex items-center gap-2">
                        <Label>Date:</Label>
                        <Input
                          type="datetime-local"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          min={new Date().toISOString().slice(0, 16)}
                          className="w-48"
                        />
                      </div>
                    )}
                    
                    <Button 
                      onClick={handleBulkAction}
                      disabled={!bulkAction || actionLoading === 'bulk' || (bulkAction === 'schedule' && !scheduledDate)}
                      variant={bulkAction === 'delete' ? 'destructive' : 'default'}
                    >
                      {actionLoading === 'bulk' ? 'Processing...' : `${bulkAction === 'delete' ? 'Delete' : 'Schedule'} ${selectedUsers.size} users`}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSelectedUsers(new Set());
                        setBulkAction('');
                        setScheduledDate('');
                      }}
                    >
                      Clear Selection
                    </Button>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                   <Table>
                     <TableHeader>
                       <TableRow>
                         <TableHead className="w-12">
                           <Checkbox
                             checked={selectedUsers.size === users.length && users.length > 0}
                             onCheckedChange={handleSelectAll}
                           />
                         </TableHead>
                         <TableHead>Name</TableHead>
                         <TableHead>Email</TableHead>
                         <TableHead>Phone</TableHead>
                         <TableHead>Company</TableHead>
                         <TableHead>Role</TableHead>
                         <TableHead>Style</TableHead>
                         <TableHead>Joined</TableHead>
                         <TableHead>Status</TableHead>
                         <TableHead>Slug</TableHead>
                         <TableHead>Actions</TableHead>
                       </TableRow>
                     </TableHeader>
                     <TableBody>
                       {users.map((user) => (
                         <TableRow key={user.id}>
                           <TableCell>
                             <Checkbox
                               checked={selectedUsers.has(user.id)}
                               onCheckedChange={() => handleSelectUser(user.id)}
                             />
                           </TableCell>
                           <TableCell className="font-medium">
                             {user.full_name}
                           </TableCell>
                           <TableCell>
                             {user.email ? (
                               <a 
                                 href={`mailto:${user.email}`}
                                 className="text-primary hover:underline flex items-center gap-1"
                               >
                                 <Mail className="h-3 w-3" />
                                 {user.email}
                               </a>
                             ) : (
                               "N/A"
                             )}
                           </TableCell>
                           <TableCell>
                             {user.phone ? (
                               <a 
                                 href={`tel:${user.phone}`}
                                 className="text-primary hover:underline flex items-center gap-1"
                               >
                                 <Phone className="h-3 w-3" />
                                 {user.phone}
                               </a>
                             ) : (
                               "N/A"
                             )}
                           </TableCell>
                           <TableCell>{user.company || "N/A"}</TableCell>
                           <TableCell>{user.role || "N/A"}</TableCell>
                           <TableCell className="capitalize">{user.style_id}</TableCell>
                           <TableCell>
                             {format(new Date(user.created_at), "MMM dd, yyyy")}
                           </TableCell>
                           <TableCell>
                             {user.scheduled_deletion_at ? (
                               <div className="flex items-center gap-2">
                                 <span className="text-destructive text-sm">
                                   Scheduled for deletion
                                 </span>
                                 <span className="text-xs text-muted-foreground">
                                   {format(new Date(user.scheduled_deletion_at), "MMM dd, yyyy")}
                                 </span>
                               </div>
                             ) : (
                               <span className="text-green-600 text-sm">Active</span>
                             )}
                           </TableCell>
                           <TableCell>
                             <a
                               href={`/card/${user.slug}`}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="inline-flex items-center gap-1 text-primary hover:underline"
                             >
                               <code className="text-sm bg-muted px-2 py-1 rounded">
                                 {user.slug}
                               </code>
                               <ExternalLink className="h-3 w-3" />
                             </a>
                           </TableCell>
                           <TableCell>
                             <div className="flex items-center gap-2">
                               {user.scheduled_deletion_at ? (
                                 <Button
                                   variant="outline"
                                   size="sm"
                                   onClick={() => handleCancelSchedule(user.id)}
                                   disabled={actionLoading === user.id}
                                 >
                                   <X className="h-4 w-4 mr-1" />
                                   Cancel
                                 </Button>
                               ) : (
                                 <>
                                   <Button
                                     variant="outline"
                                     size="sm"
                                     onClick={() => openScheduleDialog(user.id)}
                                     disabled={actionLoading === user.id}
                                   >
                                     <Calendar className="h-4 w-4 mr-1" />
                                     Schedule
                                   </Button>
                                   <AlertDialog>
                                     <AlertDialogTrigger asChild>
                                       <Button
                                         variant="destructive"
                                         size="sm"
                                         disabled={actionLoading === user.id}
                                       >
                                         <Trash2 className="h-4 w-4 mr-1" />
                                         Delete
                                       </Button>
                                     </AlertDialogTrigger>
                                     <AlertDialogContent>
                                       <AlertDialogHeader>
                                         <AlertDialogTitle>Delete User</AlertDialogTitle>
                                         <AlertDialogDescription>
                                           Are you sure you want to delete {user.full_name}? This will permanently delete:
                                           <ul className="list-disc list-inside mt-2 space-y-1">
                                             <li>Their profile and all data</li>
                                             <li>Their headshot image</li>
                                             <li>Their generated business card</li>
                                           </ul>
                                           This action cannot be undone.
                                         </AlertDialogDescription>
                                       </AlertDialogHeader>
                                       <AlertDialogFooter>
                                         <AlertDialogCancel>Cancel</AlertDialogCancel>
                                         <AlertDialogAction
                                           onClick={() => handleDeleteUser(user.id)}
                                           className="bg-destructive hover:bg-destructive/90"
                                         >
                                           Delete User
                                         </AlertDialogAction>
                                       </AlertDialogFooter>
                                     </AlertDialogContent>
                                   </AlertDialog>
                                 </>
                               )}
                             </div>
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

           {/* Schedule Deletion Dialog */}
           <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
             <DialogContent>
               <DialogHeader>
                 <DialogTitle>Schedule User Deletion</DialogTitle>
                 <DialogDescription>
                   Choose when to delete this user. The user and all associated data will be permanently deleted at the specified time.
                 </DialogDescription>
               </DialogHeader>
               <div className="grid gap-4 py-4">
                 <div className="grid gap-2">
                   <Label htmlFor="scheduledDate">Deletion Date & Time</Label>
                   <Input
                     id="scheduledDate"
                     type="datetime-local"
                     value={scheduledDate}
                     onChange={(e) => setScheduledDate(e.target.value)}
                     min={new Date().toISOString().slice(0, 16)}
                   />
                 </div>
               </div>
               <DialogFooter>
                 <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                   Cancel
                 </Button>
                 <Button 
                   onClick={handleScheduleDeletion}
                   disabled={!scheduledDate || actionLoading === selectedUserId}
                 >
                   {actionLoading === selectedUserId ? "Scheduling..." : "Schedule Deletion"}
                 </Button>
               </DialogFooter>
             </DialogContent>
           </Dialog>
         </div>
       </div>
     </>
   );
};

export default Admin;