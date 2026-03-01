import { AlertCircle, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-[800px] mx-auto p-12 rounded-[2.5rem] bg-orange-50/50 backdrop-blur-md border md:border-2 border-orange-100/50 shadow-xl shadow-orange-100/20 flex flex-col items-center gap-10 text-center"
        >
            <div className="flex flex-col items-center gap-6">
                <div className="bg-orange-100 p-6 rounded-[2rem] border border-orange-200/50 shadow-sm transition-transform hover:rotate-12 duration-500">
                    <AlertCircle className="w-12 h-12 text-orange-600" />
                </div>
                <div className="space-y-3">
                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Sync Interrupted</h3>
                    <p className="text-gray-500 font-semibold max-w-sm leading-relaxed px-6">{message}</p>
                </div>
            </div>

            <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-3 px-10 py-4 bg-gray-900 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-black transition-all shadow-xl shadow-gray-200"
            >
                <RotateCcw className="w-4 h-4" />
                Re-attempt Sync
            </button>
        </motion.div>
    );
};

export default ErrorMessage;
