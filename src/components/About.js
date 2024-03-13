import React, {useState, useEffect} from 'react';
import '../App.css';
import './About.css';

const About = () => {
    return (
        <>
        <section id="about" className="about-section">
          <div className="about-container">
            <h2 className="about-title">About Us</h2>
            <p className="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget orci a quam ultricies consequat. Vivamus at libero a magna vestibulum eleifend. Suspendisse potenti. Proin eu mi justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
          </div>
        </section>
        </>
    )
}

export default About;