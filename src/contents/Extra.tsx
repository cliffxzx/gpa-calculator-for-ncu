import { addStyle } from "browser-extension-utils"
import { $, $$ } from "browser-extension-utils"
import * as React from "react"
import { useEffect, useRef, useState } from "react"

interface ExtraProps {
  setSelectedIDs: React.Dispatch<React.SetStateAction<string[]>>
}

export const Extra = ({ setSelectedIDs }: ExtraProps) => {
  const allCourseBox = useRef($$("div.contents >  div.container")[1])
  if (!allCourseBox.current) {
    return null
  }

  useEffect(() => {
    const header = allCourseBox.current.querySelector("h4")
    const allSelect = interactiveCheckboxFactory("all", true, setSelectedIDs)
    header?.appendChild(allSelect)

    const allCourseRow = [
      ...allCourseBox.current.querySelectorAll("tr").values(),
    ]
    allCourseRow.forEach((row, index) => {
      const [type, credit, score] = [
        row.cells[3]?.innerText,
        row.cells[5]?.innerText,
        row.cells[6]?.innerText,
      ]
      if (!score || !type || !credit) {
        return null
      }

      if (/操行|勞動服務|conduct|service-learning/i.test(type)) {
        return null
      }

      if (
        (isNaN(parseFloat(score)) || isNaN(parseFloat(credit))) &&
        score !== "Score" &&
        score !== "成績"
      ) {
        return null
      }

      const checkbox = interactiveCheckboxFactory(
        `${index}`,
        score === "Score" || score === "成績",
        setSelectedIDs
      )
      row.addEventListener("click", () => checkbox.click())
      row.insertCell(-1).appendChild(checkbox)
    })
    allSelect.click()
  }, [allCourseBox])
}

const interactiveCheckboxFactory = (
  id: string,
  parent: boolean,
  setSelectedIDs: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.className = "gpa-calculate-checkbox"
  checkbox.dataset.gpa_calculator_id = id
  checkbox.checked = false

  if (parent) {
    checkbox.addEventListener("change", (e) => {
      ;(
        e.target as HTMLInputElement
      ).parentElement?.parentElement?.parentElement
        ?.querySelectorAll("input.gpa-calculate-checkbox")
        .forEach(
          (el: HTMLInputElement) =>
            (el.checked = (e.target as HTMLInputElement).checked)
        )
    })
  }

  checkbox.addEventListener("change", () => {
    const ids = $$("div.contents >  div.container input.gpa-calculate-checkbox")
      .filter((el: HTMLInputElement) => el.checked)
      .map((el) => el.dataset.gpa_calculator_id!)

    setSelectedIDs(ids)
  })

  checkbox.addEventListener("click", (e) => e.stopPropagation())
  return checkbox
}
