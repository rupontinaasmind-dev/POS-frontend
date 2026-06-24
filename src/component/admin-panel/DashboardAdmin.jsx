import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../../utils/axiosInstance';
import { Search, X, Menu } from 'lucide-react';
import { toast } from 'react-hot-toast';
import SEO from '../SEO';
import Sidebar from './Sidebar';
import Cards from './Cards';
import Table from './Table';

export default function DashboardAdmin() {
    const [activeTab, setActiveTab] = useState('contacts');
    const [contacts, setContacts] = useState([]);
    const [demos, setDemos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Reset pagination when tab or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchTerm]);

    useEffect(() => {
        fetchData();
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [contactRes, demoRes] = await Promise.all([
                axiosInstance.get('/contact'),
                axiosInstance.get('/demo'),
            ]);
            setContacts(contactRes.data.data || []);
            setDemos(demoRes.data.data || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            toast.error("Failed to load data.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;

        try {
            if (type === 'contacts') {
                await axiosInstance.delete(`/contact/${id}`);
                setContacts(prev => prev.filter(item => item._id !== id));
            } else {
                await axiosInstance.delete(`/demo/${id}`);
                setDemos(prev => prev.filter(item => item._id !== id));
            }
            toast.success("Deleted successfully!");
        } catch (error) {
            console.error("Failed to delete:", error);
            toast.error("Failed to delete record.");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    const filteredContacts = contacts.filter(c =>
        `${c.firstName} ${c.lastName} ${c.email} ${c.phone}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredDemos = demos.filter(d =>
        `${d.companyName} ${d.firstName} ${d.lastName} ${d.email} ${d.phone}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const activeData = activeTab === 'contacts' ? filteredContacts : filteredDemos;
    const totalPages = Math.max(1, Math.ceil(activeData.length / itemsPerPage));
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
    const currentDemos = filteredDemos.slice(indexOfFirstItem, indexOfLastItem);



    return (
        <div className="min-h-screen bg-[var(--bg-color)]">
            <SEO title="Admin Dashboard" description="Markt POS Admin Dashboard" />

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <Sidebar 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                fetchData={fetchData} 
            />

            {/* Main Content */}
            <main className="ml-0 lg:ml-[260px] py-6 sm:py-8 px-4 sm:px-10 transition-all duration-300">

                {/* Header */}
                <div className={`sticky top-0 z-30 -mx-4 sm:-mx-10 px-4 sm:px-10 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8 transition-all duration-300 ${scrolled ? 'bg-[var(--bg-color)]/90 backdrop-blur-md border-b border-[var(--border-color)] shadow-sm' : 'bg-transparent border-transparent'}`}>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-xl border border-[var(--border-color)] bg-white text-[var(--primary-color)] shadow-sm cursor-pointer">
                            <Menu size={20} />
                        </button>
                        <div>
                            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[var(--primary-color)] m-0 tracking-tight leading-tight">
                                {activeTab === 'contacts' ? 'Contact Messages' : 'Demo Requests'}
                            </h2>
                            <p className="text-[var(--text-secondary)] text-sm mt-1 font-medium">
                                {activeTab === 'contacts' ? `${filteredContacts.length} messages received` : `${filteredDemos.length} demo requests`}
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text" placeholder="Search..." value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[280px] py-3 pr-4 pl-10 rounded-xl border border-[var(--border-color)] bg-white text-sm outline-none font-medium text-[var(--primary-color)]"
                        />
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] opacity-50" />
                    </div>
                </div>

                {/* Stats Cards */}
                <Cards contacts={contacts} demos={demos} />

                {/* Table Area */}
                <Table 
                    loading={loading}
                    activeTab={activeTab}
                    currentContacts={currentContacts}
                    currentDemos={currentDemos}
                    indexOfFirstItem={indexOfFirstItem}
                    indexOfLastItem={indexOfLastItem}
                    activeData={activeData}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    handleDelete={handleDelete}
                    setSelectedMessage={setSelectedMessage}
                    formatDate={formatDate}
                />
            </main>

            {/* Message Modal */}
            <AnimatePresence>
                {selectedMessage && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedMessage(null)}
                        className="fixed inset-0 bg-[rgba(10,31,18,0.6)] backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white rounded-[20px] py-8 px-9 w-full max-w-[520px] shadow-2xl border border-[var(--border-color)] flex flex-col max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center mb-5 shrink-0">
                                <h3 className="text-xl font-extrabold text-[var(--primary-color)] m-0">Message Details</h3>
                                <button onClick={() => setSelectedMessage(null)}
                                    className="w-8 h-8 rounded-lg border border-[var(--border-color)] bg-[var(--bg-light)] cursor-pointer text-[var(--primary-color)] flex items-center justify-center hover:bg-[var(--border-color)] transition-colors"
                                ><X size={18} /></button>
                            </div>

                            <div className="overflow-y-auto pr-3 flex-1">
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide m-0 mb-1">From</p>
                                    <p className="text-[15px] font-semibold text-[var(--primary-color)] m-0">{selectedMessage.firstName} {selectedMessage.lastName}</p>
                                </div>
                                <div className="pb-2">
                                    <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide m-0 mb-2">Message</p>
                                    <div className="bg-[var(--bg-color)] rounded-xl py-4 px-5 border border-[var(--border-color)]">
                                        <div className="text-sm leading-relaxed text-[var(--primary-color)] font-medium whitespace-pre-wrap max-h-[150px] overflow-y-auto overflow-x-hidden break-words pr-2 custom-scrollbar">
                                            {selectedMessage.message}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
