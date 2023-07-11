import { $$ } from "browser-extension-utils"
import * as React from "react"
import { useEffect, useRef } from "react"

import { Extra } from "./Extra"
import { Panel } from "./Panel"

export const Content = () => {
  const [courses, setCourses] = React.useState<Courses>({})
  const [selectedIDs, setSelectedIDs] = React.useState<string[]>([])

  const allCourseBox = useRef($$("div.contents >  div.container")[1])
  if (!allCourseBox.current) {
    return null
  }

  useEffect(() => {
    const allCourseRow = [
      ...allCourseBox.current.querySelectorAll("tr").values(),
    ]
    setCourses(
      allCourseRow
        .map((row, index) => {
          const cols = [...row.children]
          if (cols.length < 7) {
            return null
          }

          const [type, credit, score] = [
            cols[3]?.textContent,
            cols[5]?.textContent,
            cols[6]?.textContent,
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

          return {
            id: `${index}`,
            code: cols[0].textContent,
            class: cols[1].textContent,
            name: cols[2].textContent,
            type: cols[3].textContent,
            program: cols[4].textContent,
            credits: parseFloat(cols[5].textContent!),
            score: parseFloat(cols[6].textContent!),
          }
        })
        .filter(Boolean)
        .reduce((acc, cur) => ({ ...acc, [cur!.id]: cur }), {})
    )
  }, [allCourseBox])

  return (
    <>
      <Extra setSelectedIDs={setSelectedIDs} />
      <Panel courses={courses} selectedIDs={selectedIDs} />
    </>
  )
}
