import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from '@/hooks/use-toast';
import { logger } from '@/lib/logger';

export interface Card {
    id: string;
    slug: string;
    full_name: string;
    created_at: string;
    scheduled_deletion_at: string | null;
}

export interface UserData {
    id: string;
    email: string | null;
    created_at: string;
    last_sign_in_at: string | null;
    card_count: number;
    cards: Card[];
    scheduled_deletion_at: string | null;
}

export const useUserManagement = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const supabase = createClient();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/users');
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to fetch users: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            logger.error('Error fetching users:', error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to fetch users',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        setActionLoading(userId);
        try {
            const { error } = await supabase.functions.invoke('delete-user', {
                body: { userId, action: 'delete_now' },
            });

            if (error) throw error;

            toast({
                title: 'User deleted',
                description: 'User and all associated data have been deleted',
            });

            fetchUsers();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
            toast({
                variant: 'destructive',
                title: 'Error',
                description: errorMessage,
            });
        } finally {
            setActionLoading(null);
        }
    };

    const handleScheduleDeletion = async (userId: string, scheduledDate: string) => {
        setActionLoading(userId);
        try {
            const { error } = await supabase.functions.invoke('delete-user', {
                body: {
                    userId,
                    action: 'schedule_deletion',
                    scheduledDate: new Date(scheduledDate).toISOString(),
                },
            });

            if (error) throw error;

            toast({
                title: 'Deletion scheduled',
                description: `User will be deleted on ${new Date(scheduledDate).toLocaleDateString()}`,
            });

            fetchUsers();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to schedule deletion';
            toast({
                variant: 'destructive',
                title: 'Error',
                description: errorMessage,
            });
        } finally {
            setActionLoading(null);
        }
    };

    const handleCancelSchedule = async (userId: string) => {
        setActionLoading(userId);
        try {
            const { error } = await supabase.functions.invoke('delete-user', {
                body: { userId, action: 'cancel_schedule' },
            });

            if (error) throw error;

            toast({
                title: 'Schedule cancelled',
                description: 'User deletion schedule has been cancelled',
            });

            fetchUsers();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to cancel schedule';
            toast({
                variant: 'destructive',
                title: 'Error',
                description: errorMessage,
            });
        } finally {
            setActionLoading(null);
        }
    };

    const handleScheduleCardDeletion = async (cardId: string, scheduledDate: string) => {
        setActionLoading(cardId);
        try {
            const response = await fetch('/api/admin/cards', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cardId,
                    action: 'schedule_deletion',
                    scheduledDate: new Date(scheduledDate).toISOString(),
                }),
            });

            if (!response.ok) throw new Error('Failed to schedule card deletion');

            toast({
                title: 'Card deletion scheduled',
                description: `Card will be deleted on ${new Date(scheduledDate).toLocaleDateString()}`,
            });

            fetchUsers();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to schedule card deletion',
            });
        } finally {
            setActionLoading(null);
        }
    };

    const handleCancelCardSchedule = async (cardId: string) => {
        setActionLoading(cardId);
        try {
            const response = await fetch('/api/admin/cards', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cardId,
                    action: 'cancel_schedule',
                }),
            });

            if (!response.ok) throw new Error('Failed to cancel card schedule');

            toast({
                title: 'Schedule cancelled',
                description: 'Card deletion schedule has been cancelled',
            });

            fetchUsers();
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to cancel card schedule',
            });
        } finally {
            setActionLoading(null);
        }
    };

    const handleProcessScheduled = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('delete-user', {
                body: { action: 'process_scheduled' },
            });

            if (error) throw error;

            const message =
                data?.deletedUsers?.length > 0
                    ? `Processed ${data.deletedUsers.length} scheduled deletions`
                    : 'No scheduled deletions to process';

            toast({
                title: 'Processing complete',
                description: message,
            });

            fetchUsers();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to process scheduled deletions';
            toast({
                variant: 'destructive',
                title: 'Error',
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        users,
        loading,
        actionLoading,
        fetchUsers,
        handleDeleteUser,
        handleScheduleDeletion,
        handleCancelSchedule,
        handleScheduleCardDeletion,
        handleCancelCardSchedule,
        handleProcessScheduled,
    };
};
