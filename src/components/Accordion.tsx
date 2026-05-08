"use client"

import { useId, useState, type ReactNode } from "react"

export type AccordionItem = {
  title: string
  content: ReactNode
}

export default function Accordion({ items, allowMultiple = false, className = "" }: {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
}) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])
  const baseId = useId()

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const isOpen = prev.includes(index)
      if (allowMultiple) {
        return isOpen ? prev.filter((i) => i !== index) : [...prev, index]
      }
      return isOpen ? [] : [index]
    })
  }

  return (
    <div className={className}>
      {items.map((item, idx) => {
        const panelId = `${baseId}-panel-${idx}`
        const buttonId = `${baseId}-button-${idx}`
        const isOpen = openIndexes.includes(idx)
        const isLast = idx === items.length - 1
        return (
          <div key={idx} className={isLast ? "" : "border-b border-gray-100"}>
            <button
              id={buttonId}
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => toggle(idx)}
              className={`w-full text-left py-5 px-2 -mx-2 rounded-xl flex items-center justify-between gap-4 group cursor-pointer transition-colors ${isOpen ? "text-gray-900" : "hover:bg-[#FFC325]/5"}`}
            >
              <span className={`text-base md:text-lg font-semibold transition-colors ${isOpen ? "text-gray-900" : "text-gray-800 group-hover:text-gray-900"}`}>{item.title}</span>
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-[#FFC325] text-white rotate-180 shadow-[0_4px_12px_-2px_rgba(255,195,37,0.5)]" : "bg-gray-100 text-gray-500 group-hover:bg-[#FFC325]/15 group-hover:text-[#92560A]"}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="pb-5 px-2 text-gray-600 text-sm md:text-base leading-relaxed">{item.content}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
