'use client'

import { useState } from 'react'

interface InteractiveCardProps {
  title: string
  description: string
  image?: string
  icon?: string
  children?: React.ReactNode
  defaultExpanded?: boolean
}

export default function InteractiveCard({ 
  title, 
  description, 
  image, 
  icon,
  children,
  defaultExpanded = false 
}: InteractiveCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div 
      className="interactive-card"
      style={{
        background: 'var(--black-light)',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: 'var(--box-shadow)',
        transition: 'var(--transition)',
        border: 'var(--border)',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {image && (
        <div style={{
          height: '20rem',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <img 
            src={image} 
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'var(--transition)',
              transform: isExpanded ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        </div>
      )}
      <div style={{ padding: '2rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {icon && (
            <i className={icon} style={{
              fontSize: '2.5rem',
              color: 'var(--yellow)'
            }}></i>
          )}
          <h3 style={{
            fontSize: '2rem',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            {title}
          </h3>
        </div>
        <p style={{
          fontSize: '1.4rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.8',
          marginBottom: '1rem',
          maxHeight: isExpanded ? '20rem' : '4.2rem',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease'
        }}>
          {description}
        </p>
        {children && (
          <div style={{
            maxHeight: isExpanded ? '50rem' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease'
          }}>
            {children}
          </div>
        )}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: 'var(--border)'
        }}>
          <span style={{
            fontSize: '1.3rem',
            color: 'var(--yellow)',
            fontWeight: '600'
          }}>
            {isExpanded ? 'Click to collapse' : 'Click to expand'}
          </span>
          <i 
            className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}
            style={{
              fontSize: '1.5rem',
              color: 'var(--yellow)',
              transition: 'var(--transition)',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          ></i>
        </div>
      </div>
    </div>
  )
}
