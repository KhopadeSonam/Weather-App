import { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import SearchAutocomplete from './components/SearchAutocomplete';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Sidebar from './components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

const CurrentWeather = () => {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:4000/api/current?query=${city}`);
            setWeatherData(response.data);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.error || 'Could not find weather data for that city.');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather('New York');
    }, []);

    return (
        <div className="main-layout bg-white">
            {/* Sidebar Navigation */}
            <aside className="h-screen sticky top-0 hidden lg:block z-50">
                <Sidebar />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-[#fbfbfd] p-8 md:p-14 lg:p-20 relative min-h-screen">
                {/* Soft Background Texture / Gradient */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-50/20 via-[#fbfbfd] to-transparent pointer-events-none" />

                <div className="max-w-[1200px] mx-auto relative z-10 space-y-12">
                    {/* Header Section */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                        <div className="space-y-3">
                            <h2 className="text-4xl font-black text-gray-900 tracking-tighter drop-shadow-sm">
                                Earth Dashboard
                            </h2>
                            <p className="text-[15px] font-semibold text-gray-400 max-w-md leading-relaxed">
                                Aggregated, real-time climate data for thousands of cities globally.
                            </p>
                        </div>
                        <div className="w-full md:max-w-md">
                            <SearchAutocomplete onSearch={fetchWeather} isLoading={loading} />
                        </div>
                    </header>

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-gray-100/50 p-20 flex justify-center shadow-sm"
                            >
                                <Loader />
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="w-full"
                            >
                                <ErrorMessage message={error} />
                            </motion.div>
                        ) : weatherData ? (
                            <motion.div
                                key="weather"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                className="w-full"
                            >
                                <WeatherCard data={weatherData} />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>

                    <footer className="pt-20 pb-10 flex flex-col md:flex-row items-center justify-between border-t border-gray-100 gap-6 opacity-40 hover:opacity-100 transition-opacity">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">WeatherDesk Pro v1.2</p>
                        <div className="flex items-center gap-8">
                            <button className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black">Terms</button>
                            <button className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black">Privacy</button>
                            <button className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black">Contact</button>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default CurrentWeather;
