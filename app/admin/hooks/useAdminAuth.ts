import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { logger } from '@/lib/logger';
import { toast } from '@/hooks/use-toast';

export const useAdminAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    setIsAuthenticated(true);

                    const { data: roleData, error } = await supabase
                        .from('user_roles')
                        .select('role')
                        .eq('user_id', session.user.id)
                        .eq('role', 'admin')
                        .maybeSingle();

                    if (!error && roleData) {
                        setIsAdmin(true);
                    } else {
                        toast({
                            variant: 'destructive',
                            title: 'Access Denied',
                            description: "You don't have admin privileges",
                        });
                    }
                }
            } catch (error) {
                logger.error('Auth check error:', error);
            } finally {
                setAuthLoading(false);
            }
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session?.user) {
                    setIsAuthenticated(true);

                    setTimeout(async () => {
                        const { data: roleData, error } = await supabase
                            .from('user_roles')
                            .select('role')
                            .eq('user_id', session.user.id)
                            .eq('role', 'admin')
                            .maybeSingle();

                        if (!error && roleData) {
                            setIsAdmin(true);
                        }
                    }, 0);
                } else if (event === 'SIGNED_OUT') {
                    setIsAuthenticated(false);
                    setIsAdmin(false);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast({
                title: 'Signed in successfully',
                description: 'Checking admin privileges...',
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            toast({
                variant: 'destructive',
                title: 'Login failed',
                description: errorMessage,
            });
        }
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setIsAuthenticated(false);
            setIsAdmin(false);
            toast({
                title: 'Signed out',
                description: 'You have been logged out successfully',
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Logout failed';
            toast({
                variant: 'destructive',
                title: 'Logout failed',
                description: errorMessage,
            });
        }
    };

    return {
        isAuthenticated,
        isAdmin,
        authLoading,
        handleLogin,
        handleLogout,
    };
};
