import { $, addElement } from "browser-extension-utils"
import type { PlasmoCSConfig } from "plasmo"
import * as React from "react"
import { createRoot } from "react-dom/client"

import { Content } from "./Content"

export const config: PlasmoCSConfig = {
  matches: ["https://cis.ncu.edu.tw/iNCU/academic/register/transcriptQuery"],
  all_frames: true,
}

async function main() {
  if (!document.body) {
    return
  }

  const root = createRoot(
    $("#gpa_calculator_for_ncu") ||
      addElement(document.body, "div", {
        id: "gpa_calculator_for_ncu",
      })
  )
  root.render(<Content />)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
main()
