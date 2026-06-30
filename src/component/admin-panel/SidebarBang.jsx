import { Mail, Target, X, RefreshCcw, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

export default function SidebarBang({ isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab, fetchData }) {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className={`fixed top-0 left-0 w-[260px] h-[100%] flex flex-col z-50 admin-sidebar transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <div className="flex justify-between items-center px-6 py-7 border-b border-white/10">
                <div>
                    <Link to="/bn">
                        <img src={logo} alt="Smart POS" className="w-32 h-auto bg-white/95 p-1.5 rounded-lg shadow-sm hover:scale-105 transition-transform" />
                    </Link>
                    <p className="text-white/50 text-[11px] mt-2 uppercase tracking-widest font-semibold">অ্যাডমিন প্যানেল</p>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white cursor-pointer">
                    <X size={20} />
                </button>
            </div>

            <nav className="flex-1 px-3 py-5">
                {[
                    { id: 'contacts', label: 'যোগাযোগ বার্তা', icon: <Mail size={20} /> },
                    { id: 'demos', label: 'ডেমো অনুরোধ', icon: <Target size={20} /> },
                ].map(tab => (
                    <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                        className={`admin-nav-btn flex items-center gap-3 w-full px-4 py-3.5 mb-1 rounded-xl border-none cursor-pointer text-sm font-semibold ${activeTab === tab.id ? 'active' : 'inactive'}`}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </nav>

            <div className="px-6 py-5 border-t border-white/10 flex flex-col gap-3">
                <button onClick={() => navigate('/admin')} className="admin-refresh-btn flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-white/30 text-white cursor-pointer text-[13px] font-bold hover:bg-white/10 transition-colors">
                    English
                </button>
                <button onClick={fetchData} className="admin-refresh-btn flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-white/15 text-white/70 cursor-pointer text-[13px] font-semibold bg-[rgba(255,255,255,0.05)] hover:text-white transition-colors">
                    <RefreshCcw size={16} /> ডেটা রিফ্রেশ করুন
                </button>
                <button onClick={handleLogout} className="admin-refresh-btn flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-[var(--secondary-color)] text-[var(--secondary-color)] cursor-pointer text-[13px] font-semibold hover:bg-[var(--secondary-color)] hover:text-white transition-all">
                    <LogOut size={16} /> লগআউট
                </button>
            </div>
        </aside>
    );
}
