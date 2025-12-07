"use client";

import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { Trash2, X, ExternalLink, Mail, Phone } from 'lucide-react';

// Hooks
import { useAdminAuth } from './hooks/useAdminAuth';
import { useUserManagement } from './hooks/useUserManagement';
import { useBulkActions } from './hooks/useBulkActions';

// Components
import { LoginForm } from './components/LoginForm';
import { AdminHeader } from './components/AdminHeader';
import { BulkActionsBar } from './components/BulkActionsBar';

const Admin = () => {
    const { isAuthenticated, isAdmin, authLoading, handleLogin, handleLogout } = useAdminAuth();

    const {
        users,
        loading,
        actionLoading,
        fetchUsers,
        handleDeleteUser,
        handleCancelSchedule,
        handleProcessScheduled,
    } = useUserManagement();

    const {
        selectedUsers,
        bulkAction,
        scheduledDate,
        actionLoading: bulkActionLoading,
        setBulkAction,
        setScheduledDate,
        handleSelectUser,
        handleSelectAll,
        handleBulkAction,
        clearSelection,
    } = useBulkActions(fetchUsers);

    useEffect(() => {
        if (isAdmin) {
            fetchUsers();
        }
    }, [isAdmin]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated || !isAdmin) {
        return (
            <LoginForm onLogin={handleLogin} loading={loading} />
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto py-8 px-4">
                <AdminHeader
                    onProcessScheduled={handleProcessScheduled}
                    onLogout={handleLogout}
                    loading={loading}
                />

                <Card>
                    <CardHeader>
                        <CardTitle>User Statistics</CardTitle>
                        <CardDescription>
                            Total users: {users.length}
                            {selectedUsers.size > 0 && (
                                <span className="ml-4 text-primary">({selectedUsers.size} selected)</span>
                            )}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BulkActionsBar
                            selectedCount={selectedUsers.size}
                            bulkAction={bulkAction}
                            scheduledDate={scheduledDate}
                            actionLoading={bulkActionLoading}
                            onBulkActionChange={setBulkAction}
                            onScheduledDateChange={setScheduledDate}
                            onExecute={handleBulkAction}
                            onClear={clearSelection}
                        />

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
                                                    onCheckedChange={() => handleSelectAll(users.map((u) => u.id))}
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
                                                <TableCell className="font-medium">{user.full_name}</TableCell>
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
                                                        'N/A'
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
                                                        'N/A'
                                                    )}
                                                </TableCell>
                                                <TableCell>{user.company || 'N/A'}</TableCell>
                                                <TableCell>{user.role || 'N/A'}</TableCell>
                                                <TableCell className="capitalize">{user.style_id}</TableCell>
                                                <TableCell>{format(new Date(user.created_at), 'MMM dd, yyyy')}</TableCell>
                                                <TableCell>
                                                    {user.scheduled_deletion_at ? (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-destructive text-sm">Scheduled for deletion</span>
                                                            <span className="text-xs text-muted-foreground">
                                                                {format(new Date(user.scheduled_deletion_at), 'MMM dd, yyyy')}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-green-600 text-sm">Active</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <a
                                                        href={`/${user.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-primary hover:underline"
                                                    >
                                                        <code className="text-sm bg-muted px-2 py-1 rounded">{user.slug}</code>
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
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => handleDeleteUser(user.id)}
                                                                disabled={actionLoading === user.id}
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-1" />
                                                                Delete
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {users.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">No users found</div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Admin;
