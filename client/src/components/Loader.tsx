import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center p-20 gap-8">
            <div className="relative">
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="w-16 h-16 border-4 border-orange-100 border-t-orange-500 rounded-full shadow-lg"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-[-10px] bg-orange-400/20 blur-xl rounded-full"
                />
            </div>
            <div className="space-y-1 text-center">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-600 animate-pulse">Syncing Atmosphere</p>
                <p className="text-xs font-semibold text-gray-400">Updating satellite feeds...</p>
            </div>
        </div>
    );
};

export default Loader;
