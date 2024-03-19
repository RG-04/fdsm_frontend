import React from 'react';
import '../../App.css';
import Navbar from '../Navbar';
import HeroSection from '../HeroSection';
import About from '../About';

const Home = () =>{
    return (
        <>
        <div className="home">
            <Navbar />
            <HeroSection />
            <About />
        </div>
        </>
    );
}

export default Home;