
import React from 'react';

export const AmigoMascot: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    <style>{`
      @keyframes wave {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(15deg); }
      }
      .wave-hand { 
        transform-origin: 140px 100px;
        animation: wave 2s ease-in-out infinite; 
      }
      .hover-float {
        transition: transform 0.3s ease;
      }
      .hover-float:hover {
        transform: translateY(-5px);
      }
    `}</style>
    
    {/* Background Circle Glow */}
    <circle cx="100" cy="100" r="80" fill="white" fillOpacity="0.5" stroke="#D1D5DB" strokeWidth="1" />
    
    {/* Waving Hand */}
    <g className="wave-hand">
      <circle cx="155" cy="90" r="15" fill="#FFD700" />
      <path d="M145,90 Q155,75 165,90" fill="#FFD700" />
    </g>

    {/* Body / Face */}
    <circle cx="100" cy="115" r="55" fill="#FFD700" />
    <circle cx="100" cy="115" r="55" fill="url(#faceGradient)" />
    <defs>
      <radialGradient id="faceGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFEC8B" />
        <stop offset="100%" stopColor="#FFD700" />
      </radialGradient>
    </defs>

    {/* Cheeks */}
    <circle cx="75" cy="120" r="8" fill="#FF6347" fillOpacity="0.4" filter="blur(2px)" />
    <circle cx="125" cy="120" r="8" fill="#FF6347" fillOpacity="0.4" filter="blur(2px)" />

    {/* Eyes */}
    <ellipse cx="85" cy="105" r="5" rx="4" ry="6" fill="#4B2C20" />
    <ellipse cx="115" cy="105" r="5" rx="4" ry="6" fill="#4B2C20" />

    {/* Mouth */}
    <path d="M85,130 Q100,145 115,130" fill="none" stroke="#4B2C20" strokeWidth="4" strokeLinecap="round" />

    {/* Sombrero */}
    <g transform="translate(100, 75)">
      {/* Top Part */}
      <path d="M-30,-20 Q0,-55 30,-20 Z" fill="#1A1A1A" />
      {/* Rim */}
      <path d="M-85,-20 Q-85,15 0,15 Q85,15 85,-20 Q85,-55 0,-55 Q-85,-55 -85,-20" fill="#1A1A1A" />
      {/* White Patterns */}
      <path d="M-80,-20 L-75,-10 L-70,-20 L-65,-10 L-60,-20 L-55,-10 L-50,-20 L-45,-10 L-40,-20 L-35,-10 L-30,-20 L-25,-10 L-20,-20 L-15,-10 L-10,-20 L-5,-10 L0,-20 L5,-10 L10,-20 L15,-10 L20,-20 L25,-10 L30,-20 L35,-10 L40,-20 L45,-10 L50,-20 L55,-10 L60,-20 L65,-10 L70,-20 L75,-10 L80,-20" 
            fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    </g>

    {/* Bowtie */}
    <g transform="translate(100, 160)">
      <path d="M-25,-10 L0,0 L25,-10 L25,15 L0,5 L-25,15 Z" fill="#B22222" />
      <circle cx="-15" cy="0" r="2" fill="white" />
      <circle cx="-10" cy="10" r="2" fill="white" />
      <circle cx="15" cy="0" r="2" fill="white" />
      <circle cx="10" cy="10" r="2" fill="white" />
      <circle cx="0" cy="2" r="5" fill="#B22222" stroke="#8B0000" strokeWidth="1" />
    </g>

    {/* Ukulele */}
    <g transform="translate(60, 150) rotate(-30)">
      <ellipse cx="0" cy="0" rx="15" ry="10" fill="#CD853F" stroke="#8B4513" strokeWidth="1" />
      <rect x="10" y="-3" width="20" height="6" fill="#8B4513" />
      <circle cx="0" cy="0" r="3" fill="#4B2C20" />
    </g>
  </svg>
);

export const AmigoText: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <text 
      x="50%" 
      y="70%" 
      textAnchor="middle" 
      fontFamily="Nunito, sans-serif" 
      fontWeight="900" 
      fontSize="75" 
      fill="#4A76D4" 
      stroke="white" 
      strokeWidth="6" 
      paintOrder="stroke"
      filter="url(#glow)"
    >
      Amigo
    </text>
  </svg>
);

export const AmigoTagline: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 400 50" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text 
      x="50%" 
      y="35%" 
      textAnchor="middle" 
      fontFamily="Nunito, sans-serif" 
      fontWeight="700" 
      fontSize="28" 
      fill="#4CB08C"
    >
      Your Social Sidekick
    </text>
  </svg>
);
