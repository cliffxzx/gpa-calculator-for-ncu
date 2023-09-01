import * as React from "react"
import styled from "styled-components"

const Circle = styled.div`
  position: relative;
  margin: 5px;
  text-align: center;
  display: inline-block;
`

const ClipCircle = styled.svg<{
  size: number
  percent: number
  color: [number, number]
}>`
  position: relative;
  width: ${(props) => props.size * 2 + 5}px;
  height: ${(props) => props.size / 2}px;
  overflow: visible;

  circle {
    stroke: #000;
    stroke-width: 5;
    fill: none;
    stroke-dasharray: ${(props) => (2 * Math.PI * props.size) / 4}
      ${(props) => (2 * Math.PI * props.size) / 2};
    transition: stroke-dashoffset 0.35s;
    transform-origin: 50% 50%;
  }

  circle:nth-child(1) {
    stroke: #f3f3f3;
    transform: scaleX(-1) rotate(-90deg);
  }

  circle:nth-child(2) {
    stroke-linecap: round;
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
    transform: scaleX(-1)
      rotate(${(props) => 180 + ((100 - props.percent) * 180) / 100}deg);
    stroke-dasharray: ${(props) =>
        (2 * Math.PI * props.size) / 2 -
        ((100 - props.percent) * (2 * Math.PI * props.size)) / 2 / 100}
      ${(props) => 2 * Math.PI * props.size};
    stroke: url("#grad-${(props) => props.color[0]}-${(props) =>
      props.color[1]}");
  }
`

const Number = styled.div<{ color: [number, number] }>`
  position: absolute;
  bottom: 12px;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: Iter;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background-color: #0074e0;
  background-size: 100%;
  background-repeat: repeat;
  background-clip: text;
  background-image: linear-gradient(45deg, #fff 0%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`

const Subtitle = styled.div`
  font-family: Iter;
  font-weight: 650;
  font-size: 10px;
  color: #ffffff;
  letter-spacing: 1px;
`

export const Point = ({ val, fullval, title, size, color }) => {
  return (
    <Circle>
      <ClipCircle size={size} percent={(val / fullval) * 100} color={color}>
        <circle cx="50%" cy="50%" r={size}></circle>
        <circle cx="50%" cy="50%" r={size}></circle>
        <defs>
          <linearGradient id={`grad-${color[0]}-${color[1]}`}>
            <stop id="stop1" offset="0%" stopColor={color[0]} />
            <stop id="stop2" offset="100%" stopColor={color[1]} />
          </linearGradient>
        </defs>
      </ClipCircle>
      <Number color={color}>{val.toFixed(3)}</Number>
      <Subtitle>{title}</Subtitle>
    </Circle>
  )
}

// prevent rendering from plasmo csui
export const render = () => {}
