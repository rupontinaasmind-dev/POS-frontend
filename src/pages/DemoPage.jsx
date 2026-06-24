import HeaderTop from '../component/HeaderTop';
import Header from '../component/Header';
import Footer from '../component/Footer';
import DemoForm from '../component/DemoForm';
import { motion } from 'framer-motion';
import SEO from '../component/SEO';

export default function DemoPage() {
    return (
        <motion.div 
            className="bg-[var(--bg-color)] min-h-screen flex flex-col font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <SEO 
                title="Request a Demo" 
                description="Get a free, personalized demo to see how Markt POS can streamline your grocery store operations." 
                keywords="POS Demo, Markt POS Demo, Point of Sale Trial, Grocery POS Demo"
            />
            <HeaderTop />
            <Header />

            <main className="flex-grow py-10 sm:py-16 lg:py-20">
                <DemoForm />
            </main>

            <Footer />
        </motion.div>
    );
}
