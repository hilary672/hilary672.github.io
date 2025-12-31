import React, { useState, useEffect } from 'react'
import AnimatedRadarChart from './AnimatedRadarChart'
import './AboutSection.css'

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">Design Expertise</h2>
        <p className="about-description">
          A comprehensive view of my design capabilities across six core pillars
        </p>
        <AnimatedRadarChart />
      </div>
    </section>
  )
}

export default AboutSection

