import {
  EmailOutlined,
  AssignmentTurnedInOutlined,
  CalendarMonthOutlined,
  CheckBoxOutlined,
  AccessTimeOutlined,
  Article,
  CalendarMonth,
  List,
  Build,
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
    id: "intervention_module",
    name: "intervention",
    label: "Intervention",
    icon: Build,
    description: "Suivi du temps de travail",
    color: "#04e2ffff",
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

export const MockedTemplatesCategories = [
  { id: "software", label: "Logiciel" },
  { id: "user", label: "Personalisées" },
];

const messagingTemplate = [
  {
    id: "messaging_list_1",
    name: "Liste de conversations standard",
    module: "messaging",
    model_name: "list",
    view_type: "list",
    row_count: 2,
    device: "desktop",
    origin: "software",
    rows: [
      {
        id: "row-0",
        order: 0,
        columns: [
          { id: "column-0-0", order: 0, width: "xs", widgets: [] },
          { id: "column-0-1", order: 1, width: "lg", widgets: [] },
          { id: "column-0-2", order: 2, width: "md", widgets: [] },
        ],
      },
      {
        id: "row-1",
        order: 1,
        columns: [{ id: "column-1-0", order: 0, width: "xl", widgets: [] }],
      },
    ],
  },
  {
    id: "messaging_details",
    name: "Détails simple messagerie",
    module: "messaging",
    model_name: "detail",
    view_type: "detail",
    row_count: 1,
    device: "desktop",
    origin: "software",
    rows: [
      {
        id: "row-0",
        order: 0,
        columns: [
          { id: "column-0-0", order: 0, width: "sm", widgets: [] },
          { id: "column-0-1", order: 1, width: "xl", widgets: [] },
        ],
      },
    ],
  },
  {
    id: "messaging_details_user_1",
    name: "Détails personnalisé messagerie",
    module: "messaging",
    model_name: "detail",
    view_type: "detail",
    row_count: 1,
    device: "desktop",
    origin: "user",
    rows: [
      {
        id: "row-0",
        order: 0,
        columns: [{ id: "column-0-0", order: 0, width: "", widgets: [] }],
      },
    ],
  },
];

const helpdeskTemplate = [
  {
    id: "helpdesk_list_1",
    name: "Liste tickets standard",
    module: "helpdesk",
    model_name: "list",
    view_type: "list",
    row_count: 1,
    device: "desktop",
    origin: "software",
    rows: [
      {
        id: "row-0",
        order: 0,
        columns: [
          { id: "column-0-0", order: 0, width: "xs", widgets: [] },
          { id: "column-0-1", order: 1, width: "md", widgets: [] },
          { id: "column-0-2", order: 2, width: "sm", widgets: [] },
          { id: "column-0-3", order: 3, width: "sm", widgets: [] },
        ],
      },
    ],
  },
  {
    id: "helpdesk_detail_1",
    name: "Detail d'un ticket",
    module: "helpdesk",
    model_name: "detail",
    view_type: "detail",
    row_count: 1,
    device: "desktop",
    origin: "software",
    rows: [
      {
        id: "row-0",
        order: 0,
        columns: [{ id: "column-0-0", order: 0, width: "xs", widgets: [] }],
      },
    ],
  },
];

const interventionTemplate = [
  {
    id: "intervention_list_1",
    name: "Liste interventions",
    module: "intervention",
    model_name: "list",
    view_type: "list",
    row_count: 1,
    device: "desktop",
    origin: "software",
    rows: [
      {
        id: "row-0",
        order: 0,
        columns: [
          { id: "column-0-0", order: 0, width: "xs", widgets: [] },
          { id: "column-0-1", order: 1, width: "md", widgets: [] },
          { id: "column-0-2", order: 2, width: "sm", widgets: [] },
          { id: "column-0-3", order: 3, width: "sm", widgets: [] },
        ],
      },
    ],
  },
  {
    id: "intervention_calendar_2",
    name: "Vue calendrier",
    module: "intervention",
    model_name: "calendar",
    view_type: "calendar",
    row_count: 1,
    device: "desktop",
    origin: "software",
    rows: [
      {
        id: "row-0",
        order: 0,
        columns: [
          { id: "column-0-0", order: 0, width: "sm", widgets: [] },
          { id: "column-0-1", order: 1, width: "lg", widgets: [] },
        ],
      },
    ],
  },
];

export const MockedTemplates = [
  ...messagingTemplate,
  ...helpdeskTemplate,
  ...interventionTemplate,
];
