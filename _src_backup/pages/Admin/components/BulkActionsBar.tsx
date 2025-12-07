import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BulkActionsBarProps {
    selectedCount: number;
    bulkAction: string;
    scheduledDate: string;
    actionLoading: string | null;
    onBulkActionChange: (value: string) => void;
    onScheduledDateChange: (value: string) => void;
    onExecute: () => void;
    onClear: () => void;
}

export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
    selectedCount,
    bulkAction,
    scheduledDate,
    actionLoading,
    onBulkActionChange,
    onScheduledDateChange,
    onExecute,
    onClear,
}) => {
    if (selectedCount === 0) return null;

    return (
        <div className="mb-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Label>Bulk Action:</Label>
                    <Select value={bulkAction} onValueChange={onBulkActionChange}>
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
                            onChange={(e) => onScheduledDateChange(e.target.value)}
                            min={new Date().toISOString().slice(0, 16)}
                            className="w-48"
                        />
                    </div>
                )}

                <Button
                    onClick={onExecute}
                    disabled={!bulkAction || actionLoading === 'bulk' || (bulkAction === 'schedule' && !scheduledDate)}
                    variant={bulkAction === 'delete' ? 'destructive' : 'default'}
                >
                    {actionLoading === 'bulk'
                        ? 'Processing...'
                        : `${bulkAction === 'delete' ? 'Delete' : 'Schedule'} ${selectedCount} users`}
                </Button>

                <Button variant="outline" onClick={onClear}>
                    Clear Selection
                </Button>
            </div>
        </div>
    );
};
