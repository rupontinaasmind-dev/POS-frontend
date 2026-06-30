import { Link } from 'react-router-dom';
export default function Footer() {


    return (
        <footer className="bg-[var(--primary-dark)]">
            <div className="main-container">


                <div className="pt-6 pb-6 sm:pt-8 border-t border-[var(--primary-color)]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/50 text-xs sm:text-sm">&copy; {new Date().getFullYear()} Smart POS. All rights reserved.</p>
                    <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                        <Link to="/privacy-policy" className="text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="text-white/50 hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
