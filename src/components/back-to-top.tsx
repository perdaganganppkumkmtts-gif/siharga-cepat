"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function BackToTop() {

  const [visible, setVisible] = useState(false)

  useEffect(() => {

    const handleScroll = () => {

      setVisible(window.scrollY > 300)

    }

    window.addEventListener(
      "scroll",
      handleScroll
    )

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      )

  }, [])

  function scrollTop() {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    })

  }

  return (

    <AnimatePresence>

      {visible && (

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.8,
            y: 20,
          }}

          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}

          exit={{
            opacity: 0,
            scale: 0.8,
            y: 20,
          }}

          transition={{
            duration: 0.25,
          }}

          className="
            fixed
            bottom-6
            right-6
            z-50
          "
        >

          <Button

            size="icon"

            onClick={scrollTop}

            className="
  h-12
  w-12
  rounded-full
  backdrop-blur-xl

  bg-red-500/15
  border
  border-red-500/20

  dark:bg-green-500/15
  dark:border-green-500/20

  shadow-xl

  hover:bg-red-500/25
  hover:border-red-500/30

  dark:hover:bg-green-500/25
  dark:hover:border-green-500/30

  hover:scale-110
  transition-all
  duration-300
"
          >

            <ArrowUp className="h-5 w-5 text-red-600 dark:text-green-400" />

          </Button>

        </motion.div>

      )}

    </AnimatePresence>

  )

}