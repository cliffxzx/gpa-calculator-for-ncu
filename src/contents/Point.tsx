import * as React from "react"
import styled from "styled-components"

const Circle = styled.div`
  position: relative;
  margin: 5px;
  text-align: center;
  display: inline-block;
`

const Svg = styled.svg<{
  size: number
  val: number
  fullVal: number
  color: [number, number]
}>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  circle {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    fill: none;
    stroke-width: 5;
    stroke: #000;
    transform: translate(5px, 5px);
    stroke-dasharray: 440px;
    stroke-dashoffset: ${(props) =>
      440 - (170 + props.size / 6) * (props.val / props.fullVal)}px;
    transition: stroke-dashoffset 0.35s;
  }

  circle:nth-child(1) {
    stroke-dashoffset: 0;
    stroke: #f3f3f3;
  }

  circle:nth-child(2) {
    stroke-linecap: round;
    stroke: linear-gradient(
      180deg,
      ${(props) => props.color[0]} 0%,
      ${(props) => props.color[1]} 100%
    );
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);
    transform: rotate(-90deg) translate(5px, 5px);
    transform-origin: 50% 50%;
    stroke: url("#${(props) => `grad-${props.color[0]}-${props.color[1]}`}");
  }
`

const Number = styled.div<{ color: [number, number] }>`
  position: absolute;
  top: 0;
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

export const Point = ({ val, fullVal, title, size, color }) => {
  const cr = size / 2 - 5
  return (
    <Circle>
      <div style={{ display: "inline-block", position: "relative" }}>
        <Svg size={size} val={val} fullVal={fullVal} color={color}>
          <circle cx={cr} cy={cr} r={cr}></circle>
          <circle cx={cr} cy={cr} r={cr}></circle>
          <defs>
            <linearGradient id={`grad-${color[0]}-${color[1]}`}>
              <stop id="stop1" offset="0%" stopColor={color[0]} />
              <stop id="stop2" offset="100%" stopColor={color[1]} />
            </linearGradient>
          </defs>
        </Svg>
        <Number color={color}>{val.toFixed(3)}</Number>
      </div>
      <Subtitle>{title}</Subtitle>
    </Circle>
  )
}
