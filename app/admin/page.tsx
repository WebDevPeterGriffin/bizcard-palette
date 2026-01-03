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
        handleScheduleCardDeletion,
        handleCancelCardSchedule,
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
        <div className="min-h-screen bg-background pt-24">
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
                                            <TableHead>Email</TableHead>
                                            <TableHead>Joined</TableHead>
                                            <TableHead>Last Login</TableHead>
                                            <TableHead>Cards Created</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <React.Fragment key={user.id}>
                                                <TableRow className="group">
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedUsers.has(user.id)}
                                                            onCheckedChange={() => handleSelectUser(user.id)}
                                                        />
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
                                                            'N/A'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>{format(new Date(user.created_at), 'MMM dd, yyyy')}</TableCell>
                                                    <TableCell>
                                                        {user.last_sign_in_at
                                                            ? format(new Date(user.last_sign_in_at), 'MMM dd, yyyy HH:mm')
                                                            : 'Never'
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {user.card_count}
                                                        </span>
                                                    </TableCell>
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
                                                {/* Expanded Card Details */}
                                                {user.cards && user.cards.length > 0 && (
                                                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                                                        <TableCell colSpan={7} className="p-4">
                                                            <div className="pl-12">
                                                                <h4 className="text-sm font-semibold mb-2">Business Cards</h4>
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow>
                                                                            <TableHead>Slug</TableHead>
                                                                            <TableHead>Full Name</TableHead>
                                                                            <TableHead>Created</TableHead>
                                                                            <TableHead>Status</TableHead>
                                                                            <TableHead>Actions</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {user.cards.map((card) => (
                                                                            <TableRow key={card.id}>
                                                                                <TableCell>
                                                                                    <a href={`/${card.slug}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                                                                                        {card.slug} <ExternalLink className="h-3 w-3" />
                                                                                    </a>
                                                                                </TableCell>
                                                                                <TableCell>{card.full_name}</TableCell>
                                                                                <TableCell>{format(new Date(card.created_at), 'MMM dd, yyyy')}</TableCell>
                                                                                <TableCell>
                                                                                    {card.scheduled_deletion_at ? (
                                                                                        <span className="text-destructive text-xs">Scheduled: {format(new Date(card.scheduled_deletion_at), 'MMM dd')}</span>
                                                                                    ) : (
                                                                                        <span className="text-green-600 text-xs">Active</span>
                                                                                    )}
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    <div className="flex items-center gap-2">
                                                                                        {card.scheduled_deletion_at ? (
                                                                                            <Button
                                                                                                variant="outline"
                                                                                                size="sm"
                                                                                                onClick={() => handleCancelCardSchedule(card.id)}
                                                                                                disabled={actionLoading === card.id}
                                                                                            >
                                                                                                <X className="h-3 w-3 mr-1" />
                                                                                                Cancel
                                                                                            </Button>
                                                                                        ) : (
                                                                                            <Button
                                                                                                variant="destructive"
                                                                                                size="sm"
                                                                                                onClick={() => {
                                                                                                    // Default to 7 days from now for individual cards too, or ask user
                                                                                                    // For now, let's use the same logic as user deletion (e.g. 7 days)
                                                                                                    const date = new Date();
                                                                                                    date.setDate(date.getDate() + 7);
                                                                                                    handleScheduleCardDeletion(card.id, date.toISOString());
                                                                                                }}
                                                                                                disabled={actionLoading === card.id}
                                                                                            >
                                                                                                <Trash2 className="h-3 w-3 mr-1" />
                                                                                                Schedule
                                                                                            </Button>
                                                                                        )}
                                                                                    </div>
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </React.Fragment>
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
