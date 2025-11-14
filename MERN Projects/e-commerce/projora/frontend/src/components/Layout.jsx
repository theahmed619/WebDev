import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Layout({ children }) {
return (
<div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
<AnimatePresence mode="wait">
<motion.main
key={location.pathname}
initial={{ opacity: 0, y: 6 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -6 }}
transition={{ duration: 0.35 }}
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
>
{children}
</motion.main>
</AnimatePresence>
</div>
);
}