import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Footer from '../components/layout/Footer';

function Home() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            <Navbar />
            
            <main className="pt-28 pb-20 px-8 max-w-7xl mx-auto">
                <Hero />
                <Features />
            </main>

            <Footer />
        </div>
    );
}

export default Home;