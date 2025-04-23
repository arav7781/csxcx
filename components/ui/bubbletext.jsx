"use client";
import React, { useState, useEffect } from "react";

const BubbleText = ({
  text = "Bubble Text Effect",
  baseColor = "#c4b5fd", // indigo-300
  hoverColor = "#ffffff", // white
  fontSize = "3rem", // text-5xl
  fontWeight = "300", // font-thin
  bubbleSize = "medium",
  animationDuration = "0.4s",
  className = ""
}) => {
  // Animation variants based on bubble size
  const sizeScale = {
    small: 1.1,
    medium: 1.25,
    large: 1.5,
    xlarge: 1.75
  };

  const baseStyle = {
    textAlign: 'center',
    fontSize: fontSize,
    fontWeight: fontWeight,
    color: baseColor,
    ...(className ? { className } : {})
  };

  const charStyle = (idx) => ({
    display: 'inline-block',
    position: 'relative',
    transitionProperty: 'transform, color',
    transitionDuration: animationDuration,
    transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
    transformOrigin: 'bottom center',
    transitionDelay: `${idx * 0.05}s`,
    ':hover': {
      color: hoverColor,
      animation: `bounce ${animationDuration} alternate infinite`,
      animationDelay: `${idx * 0.05}s`
    }
  });

  return (
    <h2 style={baseStyle}>
      {text.split("").map((child, idx) => (
        <span 
          key={idx}
          style={charStyle(idx)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `scale(${sizeScale[bubbleSize]})`;
            e.currentTarget.style.color = hoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.color = baseColor;
          }}
        >
          {child === " " ? "\u00A0" : child}
        </span>
      ))}
    </h2>
  );
};

export default BubbleText;
