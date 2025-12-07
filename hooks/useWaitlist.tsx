import React, { createContext, useContext, useState, ReactNode } from 'react';
import JoinWaitlistModal from '../components/JoinWaitlistModal';

interface WaitlistContextType {
    openWaitlist: () => void;
    closeWaitlist: () => void;
    isWaitlistOpen: boolean;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export const WaitlistProvider = ({ children }: { children: ReactNode }) => {
    const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

    const openWaitlist = () => setIsWaitlistOpen(true);
    const closeWaitlist = () => setIsWaitlistOpen(false);

    return (
        <WaitlistContext.Provider value={{ openWaitlist, closeWaitlist, isWaitlistOpen }}>
            {children}
            <JoinWaitlistModal isOpen={isWaitlistOpen} onClose={closeWaitlist} />
        </WaitlistContext.Provider>
    );
};

export const useWaitlist = () => {
    const context = useContext(WaitlistContext);
    if (context === undefined) {
        throw new Error('useWaitlist must be used within a WaitlistProvider');
    }
    return context;
};
