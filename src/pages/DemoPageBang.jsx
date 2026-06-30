import HeaderBang from '../component/HeaderBang';
import FooterBang from '../component/FooterBang';
import DemoFormBang from '../component/DemoFormBang';
import { motion } from 'framer-motion';
import SEO from '../component/SEO';

export default function DemoPageBang() {
    return (
        <motion.div 
            className="bg-white min-h-screen flex flex-col font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <SEO 
                title="ডেমো রিকোয়েস্ট করুন" 
                description="Smart POS আপনার ব্যবসা কীভাবে সহজ করবে তা জানতে ফ্রি ডেমো বুক করুন।" 
                keywords="POS Demo, Smart POS Demo, Point of Sale Trial, All Purpose POS Demo, ডেমো"
            />
            <HeaderBang />

            <main className="flex-grow py-10 sm:py-16 lg:py-20">
                <DemoFormBang />
            </main>

            <FooterBang />
        </motion.div>
    );
}
