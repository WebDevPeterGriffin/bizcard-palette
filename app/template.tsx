"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Generate a pseudo-random direction based on the pathname
    // This ensures the animation is consistent for a given page (avoiding hydration mismatches)
    // but feels random as you navigate between different pages.
    const getDirection = (path: string) => {
        // Simple hash function
        let hash = 0;
        for (let i = 0; i < path.length; i++) {
            hash = path.charCodeAt(i) + ((hash << 5) - hash);
        }

        // 4 possible directions
        const directions = ['up', 'down', 'left', 'right'];
        return directions[Math.abs(hash) % directions.length];
    };

    const direction = getDirection(pathname);

    // Define initial state based on direction
    const getInitial = (dir: string) => {
        switch (dir) {
            case 'up':
                return { y: 20, x: 0, opacity: 0 }; // Slides up
            case 'down':
                return { y: -20, x: 0, opacity: 0 }; // Slides down
            case 'left':
                return { x: 20, y: 0, opacity: 0 }; // Slides left
            case 'right':
                return { x: -20, y: 0, opacity: 0 }; // Slides right
            default:
                return { y: 20, x: 0, opacity: 0 };
        }
    };

    return (
        <motion.div
            key={pathname} // Ensure animation triggers on path change
            initial={getInitial(direction)}
            animate={{ y: 0, x: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}
