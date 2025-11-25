import {
  EmailOutlined,
  AssignmentTurnedInOutlined,
  CalendarMonthOutlined,
  CheckBoxOutlined,
  AccessTimeOutlined,
  Article,
  CalendarMonth,
  List,
} from "@mui/icons-material";

export const modules = [
  {
    id: "messaging_module",
    name: "messaging",
    label: "Messagerie",
    icon: EmailOutlined,
    description: "Gestion des emails et communications",
    color: "#2563eb",
  },
  {
    id: "helpdesk_module",
    name: "helpdesk",
    label: "Helpdesk",
    icon: AssignmentTurnedInOutlined,
    description: "Support et tickets clients",
    color: "#ffa406ff",
  },
  {
    id: "reservation_module",
    name: "reservation",
    label: "Réservation",
    icon: CalendarMonthOutlined,
    description: "Gestion des réservations et calendriers",
    color: "#ee0008ff",
  },
  {
    id: "tasks_module",
    name: "tasks",
    label: "Tâches",
    icon: CheckBoxOutlined,
    description: "Gestions des tâches et projets",
    color: "#008709ff",
  },
  {
    id: "entry_time_module",
    name: "entry_time",
    label: "Saisie de temps",
    icon: AccessTimeOutlined,
    description: "Suivi du temps de travail",
    color: "#c600b5ff",
  },
];

export const viewTypes = [
  { id: "list", label: "Liste", icon: List },
  { id: "detail", label: "Détail", icon: Article },
  { id: "calendar", label: "Calendrier", icon: CalendarMonth },
];
