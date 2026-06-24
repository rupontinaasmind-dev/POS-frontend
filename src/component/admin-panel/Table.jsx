import { motion } from 'framer-motion';
import { RefreshCcw, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Table({
    loading,
    activeTab,
    currentContacts,
    currentDemos,
    indexOfFirstItem,
    indexOfLastItem,
    activeData,
    currentPage,
    totalPages,
    setCurrentPage,
    handleDelete,
    setSelectedMessage,
    formatDate
}) {
    if (loading) {
        return (
            <div className="text-center py-20 text-[var(--text-secondary)] text-base font-semibold flex flex-col items-center">
                <RefreshCcw size={40} className="animate-spin opacity-50 mb-4 text-[var(--primary-color)]" />
                Loading data...
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-sm flex flex-col"
        >
            <div className="overflow-x-auto">
                {activeTab === 'contacts' ? (
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-[var(--bg-light)]">
                                {['#', 'Name', 'Email', 'Phone', 'Country', 'Date', 'Actions'].map(h => (
                                    <th key={h} className={`py-3.5 px-5 text-left text-[11px] font-bold text-[var(--primary-color)] uppercase tracking-wider border-b border-[var(--border-color)] ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentContacts.length === 0 ? (
                                <tr><td colSpan={7} className="text-center py-12 text-[var(--text-secondary)] text-sm">No contacts found.</td></tr>
                            ) : currentContacts.map((c, i) => (
                                <tr key={c._id} className="admin-table-row cursor-default">
                                    <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)] font-semibold">{indexOfFirstItem + i + 1}</td>
                                    <td className="py-3.5 px-5 text-sm font-semibold text-[var(--primary-color)]">{c.firstName} {c.lastName}</td>
                                    <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)]">{c.email}</td>
                                    <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)]">{c.phone}</td>
                                    <td className="py-3.5 px-5">
                                        <span className="inline-block py-1 px-2.5 rounded-md bg-[#E8FAAA] text-[var(--primary-color)] text-[11px] font-bold uppercase">{c.country}</span>
                                    </td>
                                    <td className="py-3.5 px-5 text-xs text-[var(--text-secondary)]">{formatDate(c.createdAt)}</td>
                                    <td className="py-3.5 px-5 flex justify-end gap-2">
                                        <button onClick={() => setSelectedMessage(c)}
                                            className="admin-btn-view py-1.5 px-3 rounded-lg border border-[var(--border-color)] bg-white cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-[var(--primary-color)]"
                                        ><Eye size={14} /> View</button>
                                        <button onClick={() => handleDelete(c._id, 'contacts')}
                                            className="admin-btn-view py-1.5 px-3 rounded-lg border border-[var(--border-color)] bg-white cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:!bg-red-50 hover:!border-red-200 transition-colors"
                                        ><Trash2 size={14} /> Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="w-full border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-[var(--bg-light)]">
                                {['#', 'Company', 'Name', 'Email', 'Phone', 'Country', 'Date', 'Actions'].map(h => (
                                    <th key={h} className={`py-3.5 px-5 text-left text-[11px] font-bold text-[var(--primary-color)] uppercase tracking-wider border-b border-[var(--border-color)] ${h === 'Actions' ? 'text-right' : ''}`}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentDemos.length === 0 ? (
                                <tr><td colSpan={8} className="text-center py-12 text-[var(--text-secondary)] text-sm">No demo requests found.</td></tr>
                            ) : currentDemos.map((d, i) => (
                                <tr key={d._id} className="admin-table-row cursor-default">
                                    <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)] font-semibold">{indexOfFirstItem + i + 1}</td>
                                    <td className="py-3.5 px-5 text-sm font-bold text-[var(--primary-color)]">{d.companyName}</td>
                                    <td className="py-3.5 px-5 text-sm font-semibold text-[var(--primary-color)]">{d.firstName} {d.lastName}</td>
                                    <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)]">{d.email}</td>
                                    <td className="py-3.5 px-5 text-[13px] text-[var(--text-secondary)]">{d.phone}</td>
                                    <td className="py-3.5 px-5">
                                        <span className="inline-block py-1 px-2.5 rounded-md bg-[#E8FAAA] text-[var(--primary-color)] text-[11px] font-bold uppercase">{d.country}</span>
                                    </td>
                                    <td className="py-3.5 px-5 text-xs text-[var(--text-secondary)]">{formatDate(d.createdAt)}</td>
                                    <td className="py-3.5 px-5 flex justify-end gap-2">
                                        <button onClick={() => handleDelete(d._id, 'demos')}
                                            className="admin-btn-view py-1.5 px-3 rounded-lg border border-[var(--border-color)] bg-white cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:!bg-red-50 hover:!border-red-200 transition-colors"
                                        ><Trash2 size={14} /> Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination Controls */}
            {activeData.length > 0 && (
                <div className="flex justify-between flex-wrap gap-[20px]  items-center px-6 py-4 border-t border-[var(--border-color)] bg-white mt-auto">
                    <p className="text-[13px] text-[var(--text-secondary)] font-medium m-0">
                        Showing <span className="font-bold text-[var(--primary-color)]">{indexOfFirstItem + 1}</span> to <span className="font-bold text-[var(--primary-color)]">{Math.min(indexOfLastItem, activeData.length)}</span> of <span className="font-bold text-[var(--primary-color)]">{activeData.length}</span> entries
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-light)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors text-[var(--primary-color)]"
                        ><ChevronLeft size={18} /></button>

                        <span className="text-[13px] font-bold text-[var(--primary-color)] min-w-[30px] text-center bg-[var(--bg-light)] py-1 px-3 rounded-md">
                            {currentPage} / {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-light)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors text-[var(--primary-color)]"
                        ><ChevronRight size={18} /></button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}