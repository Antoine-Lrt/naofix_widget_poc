import {
  EmailOutlined,
  AssignmentTurnedInOutlined,
  CalendarMonthOutlined,
  CheckBoxOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";

export const modules = [
  {
    id: "messaging_module",
    name: "Messagerie",
    icon: EmailOutlined,
    description: "Gestion des emails et communications",
    color: "#2563eb",
  },
  {
    id: "helpdesk_module",
    name: "Helpdesk",
    icon: AssignmentTurnedInOutlined,
    description: "Support et tickets clients",
    color: "#ffa406ff",
  },
  {
    id: "resa_module",
    name: "Réservation",
    icon: CalendarMonthOutlined,
    description: "Gestion des réservations et calendriers",
    color: "#ee0008ff",
  },
  {
    id: "tasks_module",
    name: "Tâches",
    icon: CheckBoxOutlined,
    description: "Gestions des tâches et projets",
    color: "#008709ff",
  },
  {
    id: "entry_time_module",
    name: "Saisie de temps",
    icon: AccessTimeOutlined,
    description: "Suivi du temps de travail",
    color: "#c600b5ff",
  },
];
