import * as React from "react"
import styled from "styled-components"
import icon from "url:../../assets/enabled.png"

import { GPA4 } from "~calculator/gpa4"
import { GPA43 } from "~calculator/gpa43"

import { Point } from "./Point"

const Card = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");

  font-family: Inter;
  position: relative;
  width: 250px;
  height: 150px;
  border-radius: 12px;
  color: #fff;
  transform: rotateX(1deg) rotateY(-2deg) rotate(1deg);
  transition: all 0.2s ease;
  overflow: hidden;

  z-index: 1;
  background-color: #2c6fd1;
  background-image: linear-gradient(135deg, #21bbfe, #2c6fd1);
  box-shadow:
    20px 20px 60px rgba(34, 50, 84, 0.5),
    1px 1px 0px 1px #2c6fd1;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  &::after {
    position: absolute;
    top: -70px;
    left: 0;
    content: "";
    width: 200%;
    height: 200%;
    background-image: linear-gradient(
      60deg,
      rgba(255, 255, 255, 0) 20%,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0) 80%
    );
    transform: translateX(-100%);
  }

  &:hover {
    transform: rotateX(2deg) rotateY(-15deg) rotate(5deg);
    &::after {
      transform: translateX(100%);
      transition: all 0.7s ease-in-out;
    }
  }
`

const TabContainer = styled.div`
  --primary-color: #185ee0;
  --secondary-color: #e6eef9;
  display: flex;
  align-items: center;
  justify-content: center;

  .tab-box {
    display: flex;
    position: relative;
    background-color: #fff;
    box-shadow:
      0 0 1px 0 rgba(24, 94, 224, 0.15),
      0 6px 12px 0 rgba(24, 94, 224, 0.15);
    padding: 5px;
    border-radius: 99px;
    user-select: none;
  }

  .tab-box * {
    z-index: 2;
  }

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 22px;
    width: 70px;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
    margin-bottom: 0;
    color: #000;
  }

  input[type="radio"] {
    display: none;
  }

  input[type="radio"]:checked + label {
    color: var(--primary-color);
  }
  input[type="radio"]:checked + label > .notificationx {
    background-color: var(--primary-color);
    color: #fff;
  }

  input[id="radio-1"]:checked ~ .glider {
    transform: translateX(0);
  }

  input[id="radio-2"]:checked ~ .glider {
    transform: translateX(100%);
  }

  input[id="radio-3"]:checked ~ .glider {
    transform: translateX(200%);
  }

  .glider {
    position: absolute;
    display: flex;
    height: 22px;
    width: 70px;
    background-color: var(--secondary-color);
    z-index: 1;
    border-radius: 99px;
    transition: 0.25s ease-out;
  }
`

interface PanelProps {
  courses: Courses
  selectedIDs: string[]
}

export const Panel = ({ courses, selectedIDs }: PanelProps) => {
  const selectedCourse = selectedIDs
    .filter((id) => id in courses && !isNaN(courses[id].credits))
    .map((id) => courses[id])

  const requiredCourses = selectedCourse.filter((course) =>
    /Required|必修/i.test(course.type)
  )

  const last60Course = selectedCourse
    .reverse()
    .map(
      (
        (sum) => (course) =>
          (sum += course.credits)
      )(0)
    )
    .findIndex((credits) => credits > 60)
  const last60Courses = selectedCourse.slice(0, last60Course)

  const [calculator, setCalculator] = React.useState(() => GPA43)

  const changeCalculator = (e) => {
    if (e.target.value === "GPA4") {
      setCalculator(() => GPA4)
    } else {
      setCalculator(() => GPA43)
    }
  }

  return (
    <div
      style={{
        display: "block",
        position: "fixed",
        top: 50,
        right: 50,
        zIndex: 1000,
        background: "white",
        borderRadius: 20,
      }}>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0 0 0",
          }}>
          <Point
            val={calculator(selectedCourse)}
            fullval={calculator === GPA4 ? 4 : 4.3}
            title="Overall"
            size={37}
            color={["#e67e22", "#f1c40f"]}
          />
          <Point
            val={calculator(last60Courses)}
            fullval={calculator === GPA4 ? 4 : 4.3}
            title="Last 60"
            size={28}
            color={["#2ecc71", "#1abc9c"]}
          />
          <Point
            val={calculator(requiredCourses)}
            fullval={calculator === GPA4 ? 4 : 4.3}
            title="Required"
            size={32}
            color={["#c0392b", "#e74c3c"]}
          />
        </div>
        <TabContainer>
          <div className="tab-box">
            <input
              type="radio"
              id="radio-1"
              value="GPA43"
              checked={calculator === GPA43}
              onChange={changeCalculator}
            />
            <label className="tab" htmlFor="radio-1">
              GPA 4.3
            </label>
            <input
              type="radio"
              id="radio-2"
              value="GPA4"
              checked={calculator === GPA4}
              onChange={changeCalculator}
            />
            <label className="tab" htmlFor="radio-2">
              GPA 4
            </label>
            <span className="glider"></span>
          </div>
        </TabContainer>
      </Card>
    </div>
  )
}

// prevent rendering from plasmo csui
export const render = () => {}
