import { motion } from 'framer-motion';
import {
    Cloud,
    CloudDrizzle,
    CloudFog,
    CloudLightning,
    CloudRain,
    CloudSnow,
    CloudSun,
    Droplets,
    Eye,
    Sun,
    Thermometer,
    Wind,
    MapPin,
    Calendar
} from 'lucide-react';

interface WeatherData {
    request: { query: string };
    location: {
        name: string;
        country: string;
        region: string;
        localtime: string;
    };
    current: {
        temperature: number;
        weather_descriptions: string[];
        weather_icons: string[];
        wind_speed: number;
        wind_degree: number;
        wind_dir: string;
        pressure: number;
        precip: number;
        humidity: number;
        cloudcover: number;
        feelslike: number;
        uv_index: number;
        visibility: number;
        is_day: string;
    };
}

interface WeatherCardProps {
    data: WeatherData;
}

const WeatherIcon = ({ description, className = "w-10 h-10" }: { description: string, className?: string }) => {
    const lc = description.toLowerCase();
    if (lc.includes('clear') || lc.includes('sunny')) return <Sun className={`${className} text-orange-400`} />;
    if (lc.includes('partly cloudy')) return <CloudSun className={`${className} text-blue-300`} />;
    if (lc.includes('cloudy') || lc.includes('overcast')) return <Cloud className={`${className} text-gray-400`} />;
    if (lc.includes('rain') || lc.includes('showers')) return <CloudRain className={`${className} text-blue-500`} />;
    if (lc.includes('drizzle')) return <CloudDrizzle className={`${className} text-sky-400`} />;
    if (lc.includes('thunderstorm')) return <CloudLightning className={`${className} text-purple-600`} />;
    if (lc.includes('snow')) return <CloudSnow className={`${className} text-sky-100`} />;
    if (lc.includes('fog') || lc.includes('mist')) return <CloudFog className={`${className} text-gray-300`} />;
    return <Sun className={`${className} text-orange-400`} />;
};

const WeatherDetail = ({ icon: Icon, label, value, unit }: { icon: any, label: string, value: any, unit?: string }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 flex flex-col items-start gap-4 transition-all hover:shadow-md hover:translate-y-[-2px]">
        <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
            <p className="text-xl font-bold text-gray-800">
                {value}{unit && <span className="text-xs font-medium ml-1 text-gray-400">{unit}</span>}
            </p>
        </div>
    </div>
);

const WeatherCard = ({ data }: WeatherCardProps) => {
    const { current, location } = data;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-[900px] mx-auto space-y-10"
        >
            {/* Main Stats Card */}
            <div className="frosted-glass p-10 md:p-14 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-[4] rotate-[-20deg] pointer-events-none group-hover:rotate-0 group-hover:scale-[4.5] transition-transform duration-1000">
                    <WeatherIcon description={current.weather_descriptions[0]} className="w-32 h-32" />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-orange-500 bg-orange-50/50 w-fit px-4 py-2 rounded-full border border-orange-100/50">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm font-bold tracking-wide">{location.name}, {location.country}</span>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-7xl md:text-8xl font-black text-gray-900 tracking-tighter flex items-start">
                                {current.temperature}
                                <span className="text-4xl md:text-5xl mt-4 font-bold text-gray-300">°</span>
                            </h1>
                            <p className="text-lg text-gray-500 font-medium flex items-center gap-2">
                                Today <span className="text-gray-300">•</span> {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end md:items-end gap-6 text-right w-full md:w-auto self-stretch justify-between">
                        <div className="transform scale-[2] origin-right">
                            <WeatherIcon description={current.weather_descriptions[0]} className="w-16 h-16 drop-shadow-xl" />
                        </div>

                        <div className="space-y-1">
                            <p className="text-2xl font-bold text-gray-800">{current.weather_descriptions[0]}</p>
                            <p className="text-sm font-medium text-gray-400 capitalize tracking-wide">Feels like {current.feelslike}°C</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Weather Diagnostics</h3>
                    <div className="h-[1px] flex-1 mx-6 bg-gray-100"></div>
                    <p className="text-xs font-medium text-gray-300">Detailed conditions at {location.localtime.split(' ')[1]}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    <WeatherDetail icon={Wind} label="Wind Speed" value={current.wind_speed} unit="km/h" />
                    <WeatherDetail icon={Droplets} label="Humidity" value={current.humidity} unit="%" />
                    <WeatherDetail icon={Thermometer} label="Pressure" value={current.pressure} unit="mb" />
                    <WeatherDetail icon={Eye} label="Visibility" value={current.visibility} unit="km" />
                    <WeatherDetail icon={Cloud} label="Cloud Cover" value={current.cloudcover} unit="%" />
                    <WeatherDetail icon={Sun} label="UV Index" value={current.uv_index} />
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherCard;
