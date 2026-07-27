"use client"

import { useEffect } from "react"

export default function VisitorTracker() {
  useEffect(() => {

    let sessionId = localStorage.getItem("visitor_session")

    if (!sessionId) {
      sessionId = crypto.randomUUID()
      localStorage.setItem(
        "visitor_session",
        sessionId
      )
    }

    fetch("/api/visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      }),
    })

  }, [])

  return null
}