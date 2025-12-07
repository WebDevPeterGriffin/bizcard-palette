import React from 'react';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
    onProcessScheduled: () => void;
    onLogout: () => void;
    loading: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
    onProcessScheduled,
    onLogout,
    loading,
}) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage users and view statistics</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={onProcessScheduled} disabled={loading}>
                    Process Scheduled Deletions
                </Button>
                <Button variant="outline" onClick={onLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
};
