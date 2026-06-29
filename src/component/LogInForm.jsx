import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LogInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login, admin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already logged in
    useEffect(() => {
        if (admin) {
            const from = location.state?.from?.pathname || '/admin';
            navigate(from, { replace: true });
        }
    }, [admin, navigate, location]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        const result = await login(email, password);

        setIsLoading(false);
        if (result.success) {
            toast.success("Login successful!");
            const from = location.state?.from?.pathname || '/admin';
            navigate(from, { replace: true });
        }
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center px-4 py-10"
            style={{ background: 'var(--bg-color)', transition: 'background 0.4s ease' }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full rounded-3xl p-10 text-center"
                style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--card-shadow)',
                    transition: 'all 0.4s ease',
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: '#E8FAAA' }}
                >
                    <Lock size={40} style={{ color: 'var(--text-primary)' }} />
                </motion.div>

                <h1
                    className="text-3xl font-extrabold mb-2 tracking-tight"
                    style={{ color: 'var(--text-primary)', transition: 'color 0.4s ease' }}
                >
                    Admin Access
                </h1>
                <p
                    className="text-base font-medium mb-8 leading-relaxed"
                    style={{ color: 'var(--text-secondary)', transition: 'color 0.4s ease' }}
                >
                    Please log in to manage your Markt POS dashboard.
                </p>

                <form onSubmit={handleLogin} className="space-y-5 text-left">
                    <div>
                        <label
                            className="block text-sm font-bold mb-2 ml-1"
                            style={{ color: 'var(--text-primary)', transition: 'color 0.4s ease' }}
                        >
                            Email Address
                        </label>
                        <div className="relative group">
                            <div
                                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                                style={{ color: 'var(--text-secondary)', transition: 'color 0.4s ease' }}
                            >
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl py-3.5 pl-11 pr-4 focus:outline-none font-semibold"
                                style={{
                                    background: 'var(--input-bg)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    transition: 'all 0.4s ease',
                                }}
                                placeholder="admin@marktpos.com"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2 ml-1 pr-1">
                            <label
                                className="block text-sm font-bold"
                                style={{ color: 'var(--text-primary)', transition: 'color 0.4s ease' }}
                            >
                                Password
                            </label>
                            <Link
                                to="#"
                                className="text-xs font-bold hover:opacity-80"
                                style={{ color: 'var(--secondary-color)' }}
                            >
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative group">
                            <div
                                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                                style={{ color: 'var(--text-secondary)', transition: 'color 0.4s ease' }}
                            >
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl py-3.5 pl-11 pr-12 focus:outline-none font-semibold tracking-wide"
                                style={{
                                    background: 'var(--input-bg)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    transition: 'all 0.4s ease',
                                }}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                                style={{ color: 'var(--text-secondary)', transition: 'color 0.3s ease' }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center pt-2 ml-1">
                        <label className="flex items-center cursor-pointer group">
                            <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                                <input type="checkbox" className="peer sr-only" />
                                <div
                                    className="w-5 h-5 border-2 rounded-md transition-all peer-checked:!bg-[var(--secondary-color)] peer-checked:!border-[var(--secondary-color)]"
                                    style={{
                                        borderColor: 'var(--border-color)',
                                        background: 'var(--input-bg)',
                                    }}
                                ></div>
                                <motion.div
                                    initial={false}
                                    className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                >
                                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                            </div>
                            <span
                                className="text-sm font-semibold"
                                style={{ color: 'var(--text-secondary)', transition: 'color 0.4s ease' }}
                            >
                                Remember me
                            </span>
                        </label>
                    </div>

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full py-4 px-6 rounded-xl font-bold text-[15px] text-white flex items-center justify-center gap-2 mt-4 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
                        style={{
                            background: 'var(--secondary-color)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {isLoading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                        ) : (
                            <>
                                Sign In
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}