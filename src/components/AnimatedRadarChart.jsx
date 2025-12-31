import React, { useState, useEffect } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import './AnimatedRadarChart.css'

const designSkills = [
  { skill: 'Product & UX Strategy', value: 0, fullValue: 90 },
  { skill: 'User Experience (UX) Design', value: 0, fullValue: 95 },
  { skill: 'User Interface (UI) & Visual Design', value: 0, fullValue: 92 },
  { skill: 'Design Systems & Process', value: 0, fullValue: 88 },
  { skill: 'Collaboration & Leadership', value: 0, fullValue: 85 },
  { skill: 'Brand & Product Communication', value: 0, fullValue: 87 },
]

const AnimatedRadarChart = () => {
  const [data, setData] = useState(designSkills)

  useEffect(() => {
    const duration = 1800 // Total animation duration per skill in ms
    const staggerDelay = 150 // Delay between each skill starting
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime

      setData(prevData =>
        prevData.map((item, index) => {
          const skillStartTime = index * staggerDelay
          const skillElapsed = Math.max(0, elapsed - skillStartTime)
          const progress = Math.min(1, skillElapsed / duration)

          // Ease-out cubic for natural deceleration
          const easedProgress = 1 - Math.pow(1 - progress, 3)

          return {
            ...item,
            value: item.fullValue * easedProgress,
          }
        })
      )

      // Continue animating if any skill hasn't finished
      const maxElapsed = elapsed - (designSkills.length - 1) * staggerDelay
      if (maxElapsed < duration) {
        requestAnimationFrame(animate)
      }
    }

    // Start animation after a brief delay
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate)
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [])

  // Format skill names to fit better on the chart
  const formatLabel = (label) => {
    if (label.length > 20) {
      return label.split(' ').slice(0, 3).join(' ') + '...'
    }
    return label
  }

  return (
    <div className="radar-chart-container">
      <ResponsiveContainer width="100%" height={500}>
        <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid stroke="#e0e0e0" strokeWidth={1} />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: '#333', fontSize: 12, fontWeight: 500 }}
            tickFormatter={formatLabel}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Design Skills"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.6}
            strokeWidth={2}
            animationDuration={0}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="skills-legend">
        {data.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-label">{skill.skill}</div>
            <div className="skill-value">{Math.round(skill.value)}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AnimatedRadarChart

