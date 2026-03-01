import {
    LayoutDashboard,
    MapPin,
    Calendar,
    Settings,
    CloudRain,
    Wind
} from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { Icon: LayoutDashboard, label: 'Dashboard', active: true },
        { Icon: MapPin, label: 'Analytics', active: false },
        { Icon: Calendar, label: 'Predictions', active: false },
        { Icon: Wind, label: 'Weather Feed', active: false },
        { Icon: Settings, label: 'Settings', active: false },
    ];

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 p-8 space-y-12 transition-all duration-300">
            <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <CloudRain className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black tracking-tighter text-gray-900">Weather<span className="text-orange-500">desk</span></h2>
            </div>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        className={`sidebar-item w-full ${item.active ? 'sidebar-item-active' : 'hover:bg-gray-50'}`}
                    >
                        <item.Icon className={`w-5 h-5 ${item.active ? 'text-orange-600' : 'text-gray-400'}`} />
                        <span className={`sidebar-label tracking-wide ${item.active ? 'font-bold' : 'font-semibold'}`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            <div className="p-6 bg-orange-50/50 rounded-3xl border border-orange-100/50 space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">Upgrade Pro</p>
                </div>
                <p className="text-xs font-semibold text-gray-600 leading-relaxed">Get 14-day detailed weather forecasting & alerts.</p>
                <button className="w-full py-2.5 bg-gray-900 text-white text-xs font-bold rounded-2xl hover:bg-black transition-colors shadow-lg shadow-gray-200">
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
