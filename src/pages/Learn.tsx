import React from 'react';
import { motion } from 'framer-motion';

const Learn: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gray-900 text-white p-8"
        >
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Learning Resources</h1>
                
                <div className="grid gap-6">
                    <section className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Coming Soon...</h2>
                        <ul className="space-y-3">
                            {/* <li>• Project Setup and Installation</li>
                            <li>• Basic Development Workflow</li>
                            <li>• Code Standards and Best Practices</li> */}
                        </ul>
                    </section>

                    {/* <section className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Technical Documentation</h2>
                        <ul className="space-y-3">
                            <li>• API Reference</li>
                            <li>• Component Library</li>
                            <li>• Architecture Overview</li>
                        </ul>
                    </section>

                    <section className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4">Useful Resources</h2>
                        <ul className="space-y-3">
                            <li>• External Libraries</li>
                            <li>• Learning Materials</li>
                            <li>• Community Links</li>
                        </ul>
                    </section> */}
                </div>
            </div>
        </motion.div>
    );
};

export default Learn;