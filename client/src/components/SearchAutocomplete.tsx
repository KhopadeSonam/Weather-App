import { useState, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchAutocompleteProps {
    onSearch: (city: string) => void;
    isLoading: boolean;
}

const SearchAutocomplete = ({ onSearch, isLoading }: SearchAutocompleteProps) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setIsFocused(false);
            inputRef.current?.blur();
        }
    };

    const clearSearch = () => {
        setQuery('');
        inputRef.current?.focus();
    };

    return (
        <div className="w-full relative z-50">
            <motion.form
                onSubmit={handleSubmit}
                animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
                className="relative group"
            >
                <div className={`
          flex items-center bg-white shadow-sm border border-gray-200 transition-all duration-300 rounded-full px-4 py-1.5
          ${isFocused ? 'ring-2 ring-blue-300/30 border-blue-300 shadow-md translate-y-[-1px]' : 'hover:border-gray-300'}
        `}>
                    <div className="pl-2 pr-3 text-gray-400">
                        <Search className="w-5 h-5" />
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        placeholder="Search city..."
                        className="w-full py-2.5 text-[15px] bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400 font-medium"
                    />

                    <AnimatePresence>
                        {query && (
                            <motion.button
                                type="button"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={clearSearch}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {isLoading && (
                        <div className="pr-3">
                            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </div>
            </motion.form>

            <AnimatePresence>
                {isFocused && !query && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-[calc(100%+12px)] w-full bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-100 overflow-hidden"
                    >
                        <div className="flex items-center gap-3 text-gray-400 mb-4 px-2">
                            <MapPin className="w-4 h-4" />
                            <span className="font-bold uppercase tracking-widest text-[10px]">Recent & Popular</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {['New York', 'London', 'Kyiv', 'Tokyo'].map(city => (
                                <button
                                    key={city}
                                    type="button"
                                    onMouseDown={() => {
                                        setQuery(city);
                                        onSearch(city);
                                    }}
                                    className="px-4 py-3 bg-gray-50/50 hover:bg-orange-50 hover:text-orange-600 text-gray-600 text-sm font-semibold rounded-xl transition-all text-left"
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchAutocomplete;
