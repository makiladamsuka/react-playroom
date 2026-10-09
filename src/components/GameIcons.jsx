import React from 'react'
import appleSvg from '../assets/apple.svg'
import goldenAppleSvg from '../assets/golden_apple.svg'
import crownSvg from '../assets/crown.svg'
import snakeEyesSvg from '../assets/snake_eyes.svg'
import trophySvg from '../assets/trophy.svg'
import grassPatternSvg from '../assets/grass_pattern.svg'

export { grassPatternSvg }

export function Apple({ size = 100, style = {} }) {
  return (
    <img
      src={appleSvg}
      width={size}
      height={size}
      alt="Apple"
      style={{ display: 'inline-block', userSelect: 'none', pointerEvents: 'none', ...style }}
    />
  )
}

export function GoldenApple({ size = 100, style = {} }) {
  return (
    <img
      src={goldenAppleSvg}
      width={size}
      height={size}
      alt="Golden Apple"
      style={{ display: 'inline-block', userSelect: 'none', pointerEvents: 'none', ...style }}
    />
  )
}

export function Crown({ size = 100, style = {} }) {
  return (
    <img
      src={crownSvg}
      width={size}
      height={size}
      alt="Crown"
      style={{ display: 'inline-block', userSelect: 'none', pointerEvents: 'none', ...style }}
    />
  )
}

export function Trophy({ size = 100, style = {} }) {
  return (
    <img
      src={trophySvg}
      width={size}
      height={size}
      alt="Trophy"
      style={{ display: 'inline-block', userSelect: 'none', pointerEvents: 'none', ...style }}
    />
  )
}

export function SnakeEyes({ size = 100, direction = 'RIGHT', style = {} }) {
  // Rotate eyes to look in the direction the snake is traveling
  let rotation = 0
  if (direction === 'DOWN') rotation = 90
  if (direction === 'LEFT') rotation = 180
  if (direction === 'UP') rotation = 270

  return (
    <img
      src={snakeEyesSvg}
      width={size}
      height={size * 0.56}
      alt="Snake Eyes"
      style={{
        display: 'inline-block',
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.1s ease',
        userSelect: 'none',
        pointerEvents: 'none',
        ...style,
      }}
    />
  )
}
