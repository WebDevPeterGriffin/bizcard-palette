import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useBulkActions = (onComplete: () => void) => {
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
    const [bulkAction, setBulkAction] = useState<string>('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const supabase = createClient();

    const handleSelectUser = (userId: string) => {
        const newSelected = new Set(selectedUsers);
        if (newSelected.has(userId)) {
            newSelected.delete(userId);
        } else {
            newSelected.add(userId);
        }
        setSelectedUsers(newSelected);
    };

    const handleSelectAll = (allUserIds: string[]) => {
        if (selectedUsers.size === allUserIds.length) {
            setSelectedUsers(new Set());
        } else {
            setSelectedUsers(new Set(allUserIds));
        }
    };

    const handleBulkAction = async () => {
        if (!bulkAction || selectedUsers.size === 0) return;

        setActionLoading('bulk');
        try {
            const promises = Array.from(selectedUsers).map((userId) => {
                if (bulkAction === 'delete') {
                    return supabase.functions.invoke('delete-user', {
                        body: { userId, action: 'delete_now' },
                    });
                } else if (bulkAction === 'schedule') {
                    if (!scheduledDate) throw new Error('Please select a date');
                    return supabase.functions.invoke('delete-user', {
                        body: {
                            userId,
                            action: 'schedule_deletion',
                            scheduledDate: new Date(scheduledDate).toISOString(),
                        },
                    });
                }
                return Promise.resolve();
            });

            const results = await Promise.allSettled(promises);
            const failed = results.filter((r) => r.status === 'rejected').length;
            const succeeded = results.filter((r) => r.status === 'fulfilled').length;

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
            onComplete();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Bulk action failed';
            toast({
                variant: 'destructive',
                title: 'Bulk action failed',
                description: errorMessage,
            });
        } finally {
            setActionLoading(null);
        }
    };

    const clearSelection = () => {
        setSelectedUsers(new Set());
        setBulkAction('');
        setScheduledDate('');
    };

    return {
        selectedUsers,
        bulkAction,
        scheduledDate,
        actionLoading,
        setBulkAction,
        setScheduledDate,
        handleSelectUser,
        handleSelectAll,
        handleBulkAction,
        clearSelection,
    };
};
