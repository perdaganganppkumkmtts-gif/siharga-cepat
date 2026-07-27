import {
  CheckCircle2,
  Circle,
  Clock,
  PlayCircle,
  CheckCircle,
  AlertCircle
} from "lucide-react"

export const categories = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Docs",
  },
  {
    value: "improvement",
    label: "Improvement",
  },
  {
    value: "refactor",
    label: "Refactor",
  },
]

export const statuses = [

  {
    label:"Todo",
    value:"todo",
    icon:Circle
  },

  {
    label:"In Progress",
    value:"progress",
    icon:Clock
  },

  {
    label:"Completed",
    value:"completed",
    icon:CheckCircle
  }

]






export const priorities = [

  {
    label:"Low",
    value:"low",
    icon:Circle
  },

  {
    label:"Medium",
    value:"medium",
    icon:Clock
  },

  {
    label:"High",
    value:"high",
    icon:AlertCircle
  }

]
