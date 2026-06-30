import { motion } from 'framer-motion';
import { Mail, Target, CalendarDays } from 'lucide-react';

export default function CardsBang({ contacts, demos }) {
    const stats = [
        { label: 'সর্বমোট যোগাযোগ', value: contacts.length, icon: <Mail size={24} color="#0F766E" />, color: '#0F766E' },
        { label: 'ডেমো অনুরোধ', value: demos.length, icon: <Target size={24} color="#1E293B" />, color: '#1E293B' },
        { label: 'এই মাসে', value: contacts.filter(c => new Date(c.createdAt).getMonth() === new Date().getMonth()).length + demos.filter(d => new Date(d.createdAt).getMonth() === new Date().getMonth()).length, icon: <CalendarDays size={24} color="#14B8A6" />, color: '#14B8A6' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {stats.map((stat, i) => (
                <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="bg-white rounded-2xl px-7 py-6 border border-[var(--border-color)] shadow-sm"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[var(--text-secondary)] text-[13px] font-semibold m-0 uppercase tracking-wide">{stat.label}</p>
                            <p className="text-[var(--primary-color)] text-4xl font-extrabold mt-2 tracking-tighter">{stat.value}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                            {stat.icon}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
