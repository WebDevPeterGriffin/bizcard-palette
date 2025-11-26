export default function FloatingOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Navy Orb - Top Left */}
            <div
                className="absolute top-[5%] left-[5%] w-[min(25vw,200px)] h-[min(25vw,200px)] md:w-[220px] md:h-[220px] rounded-full"
                style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(45, 75, 105, 0.9) 0%, rgba(26, 45, 73, 0.8) 50%, rgba(26, 45, 73, 0.4) 100%)',
                    boxShadow: '0 20px 60px rgba(26, 45, 73, 0.4), inset -10px -10px 30px rgba(0, 0, 0, 0.2)',
                    animation: 'float 25s ease-in-out infinite'
                }}
            />

            {/* Gold Orb - Top Right */}
            <div
                className="absolute top-[8%] right-[8%] w-[min(28vw,240px)] h-[min(28vw,240px)] md:w-[280px] md:h-[280px] rounded-full"
                style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 205, 80, 1) 0%, rgba(240, 180, 41, 0.95) 50%, rgba(200, 150, 35, 0.7) 100%)',
                    boxShadow: '0 25px 70px rgba(240, 180, 41, 0.5), inset -15px -15px 40px rgba(200, 140, 30, 0.3)',
                    animation: 'float-delayed 22s ease-in-out infinite'
                }}
            />

            {/* Navy Orb - Bottom Left */}
            <div
                className="absolute bottom-[15%] left-[10%] w-[min(22vw,180px)] h-[min(22vw,180px)] md:w-[200px] md:h-[200px] rounded-full"
                style={{
                    background: 'radial-gradient(circle at 35% 35%, rgba(50, 80, 110, 0.95) 0%, rgba(30, 50, 80, 0.85) 50%, rgba(20, 35, 60, 0.5) 100%)',
                    boxShadow: '0 18px 55px rgba(26, 45, 73, 0.45), inset -8px -8px 25px rgba(0, 0, 0, 0.25)',
                    animation: 'float-slow 28s ease-in-out infinite'
                }}
            />
        </div>
    );
}
