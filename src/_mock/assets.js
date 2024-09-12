import { faker } from '@faker-js/faker';

import { BasicStatus, PermissionType } from '#/enum';

/**
 * Organization data mock
 */
export const ORG_LIST = [
  {
    id: '1',
    name: 'East China Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 1,
    children: [
      { id: '1-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '1-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '1-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
  {
    id: '2',
    name: 'South China Branch',
    status: 'enable',
    desc: faker.lorem.words(),
    order: 2,
    children: [
      { id: '2-1', name: 'R&D Department', status: 'disable', desc: '', order: 1 },
      { id: '2-2', name: 'Marketing Department', status: 'enable', desc: '', order: 2 },
      { id: '2-3', name: 'Finance Department', status: 'enable', desc: '', order: 3 },
    ],
  },
];

/**
 * User permission mock
 */
const DASHBOARD_PERMISSION = {
  id: '9100714781927703',
  parentId: '',
  label: 'sys.menu.dashboard',
  name: 'Dashboard',
  icon: 'ic-analysis',
  type: PermissionType.CATALOGUE,
  route: 'dashboard',
  order: 1,
  children: [
    {
      id: '8426999229400979',
      parentId: '9100714781927703',
      icon: 'ph:dot-duotone',
      label: 'sys.menu.workbench',
      name: 'Workbench',
      type: PermissionType.MENU,
      route: 'workbench',
      component: '/dashboard/workbench/index.tsx',
    },
  ],
};

const ADMIN_MANAGEMENT_PERMISSION = {
  id: '0901673425580518',
  parentId: '',
  label: 'sys.menu.management',
  name: 'Management',
  icon: 'ic-management',
  type: PermissionType.CATALOGUE,
  route: 'management',
  order: 2,
  children: [
    {
      id: '1985890042972842',
      parentId: '0901673425580518',
      label: 'sys.menu.organization',
      icon: 'ph:dot-duotone',
      name: 'Health Facility',
      type: PermissionType.MENU,
      route: 'health-facility',
      component: '/management/health-facility/index.tsx',
    },
  ],
};

const ORG_MANAGEMENT_PERMISSION = {
  id: '0901673425580518',
  parentId: '',
  label: 'sys.menu.management',
  name: 'Management',
  icon: 'ic-management',
  type: PermissionType.CATALOGUE,
  route: 'management',
  order: 2,
  children: [
    {
      id: '0157880245365433',
      parentId: '0901673425580518',
      label: 'sys.menu.users',
      icon: 'ph:dot-duotone',
      name: 'Users',
      type: PermissionType.MENU,
      route: 'users',
      component: '/management/users/index.tsx',
    },
  ],
};

const ASSETS_PERMISSION = {
  id: '9100714781927834',
  parentId: '',
  label: 'sys.menu.assets.index',
  name: 'Resources',
  icon: 'solar:widget-5-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'resources',
  order: 3,
  children: [
    {
      id: '9710971640320357',
      parentId: '9100714781927834',
      icon: 'ph:dot-duotone',
      label: 'sys.menu.assets.models',
      name: '3D Models',
      type: PermissionType.MENU,
      route: 'models',
      component: '/resources/models/index.tsx',
    },
    {
      id: '8426999229401934',
      parentId: '9100714781927834',
      icon: 'ph:dot-duotone',
      label: 'sys.menu.assets.media',
      name: 'Media',
      type: PermissionType.MENU,
      route: 'media',
      component: '/resources/media/index.tsx',
    },
    {
      id: '8426999229401963',
      parentId: '9100714781927834',
      icon: 'ph:dot-duotone',
      label: 'sys.menu.assets.documentation',
      name: 'Documentation',
      type: PermissionType.MENU,
      route: 'documentation',
      component: '/resources/documentation/index.tsx',
    },
  ],
};

const TASKS_PERMISSION = {
  id: '9100714781927445',
  parentId: '',
  label: 'sys.menu.tasks.index',
  name: 'Procedures',
  icon: 'clarity:tasks-solid-badged',
  type: PermissionType.CATALOGUE,
  route: 'procedures',
  order: 4,
  children: [
    {
      id: '8426999227503557',
      parentId: '9100714781927445',
      icon: 'ph:dot-duotone',
      label: 'sys.menu.tasks.task_overview',
      name: 'Scheduled Procedures',
      type: PermissionType.MENU,
      route: 'scheduled-procedures',
      component: '/sys/others/kanban/index.tsx',
    },
    {
      id: '8426999229403557',
      parentId: '9100714781927445',
      icon: 'ph:dot-duotone',
      label: 'sys.menu.tasks.task_templates',
      name: 'Templates',
      type: PermissionType.MENU,
      route: 'procedure-templates',
      component: '/procedures/procedure-templates/index.tsx',
    },
    {
      id: '9710971640425463',
      parentId: '9100714781927445',
      icon: 'ph:dot-duotone',
      label: 'sys.menu.tasks.task_assignments',
      name: 'Assignments',
      type: PermissionType.MENU,
      route: 'procedure-assignments',
      component: '/procedures/procedure-assignments/index.tsx',
    },
    {
      id: '9710971640425478',
      parentId: '9100714781927445',
      label: 'sys.menu.tasks.create_task_assignments',
      name: 'Assign Procedure',
      type: PermissionType.MENU,
      route: 'procedure-assignments/assign',
      component: '/procedures/procedure-assignments/assignTask.tsx',
      hide: true,
    },
    {
      id: '971097164042429',
      parentId: '9100714781927445',
      label: 'sys.menu.tasks.task_assignments_details',
      name: 'Assign Procedure Details',
      type: PermissionType.MENU,
      route: 'procedure-assignments/details/:id',
      component: '/procedures/procedure-assignments/detail.tsx',
      hide: true,
    },
    {
      id: '971097164047234',
      parentId: '9100714781927445',
      label: 'sys.menu.tasks.edit_task_assignments',
      name: 'Edit Procedure Details',
      type: PermissionType.MENU,
      route: 'procedure-assignments/edit/:id',
      component: '/procedures/procedure-assignments/assignTask.tsx',
      hide: true,
    },
    {
      id: '9710971640426356',
      parentId: '9100714781927445',
      icon: 'ph:dot-duotone',
      label: 'sys.menu.tasks.task_completed',
      name: 'Completed',
      type: PermissionType.MENU,
      route: 'procedure-completed',
      component: '/procedures/procedure-completed/index.tsx',
    },
  ],
};

const REMOTE_ASSIST_PERMISSION = {
  id: '9100714781925723',
  parentId: '',
  label: 'sys.menu.remote_assist.index',
  name: 'Remote Consultation',
  icon: 'wpf:assistant',
  type: PermissionType.CATALOGUE,
  route: 'remote_assist',
  order: 5,
  children: [
    {
      id: '8426999229712557',
      parentId: '9100714781925723',
      label: 'sys.menu.remote_assist.agents',
      icon: 'ph:dot-duotone',
      name: 'Agents',
      type: PermissionType.MENU,
      route: 'agents',
      component: '/remote-assist/agents/index.tsx',
    },
    {
      id: '9710971640735463',
      parentId: '9100714781925723',
      label: 'sys.menu.remote_assist.screenshots',
      icon: 'ph:dot-duotone',
      name: 'Screenshots',
      type: PermissionType.MENU,
      route: 'screenshots',
      component: '/remote-assist/screenshots/index.tsx',
    },
    {
      id: '9710971640426946',
      parentId: '9100714781925723',
      label: 'sys.menu.remote_assist.videos',
      icon: 'ph:dot-duotone',
      name: 'Videos',
      type: PermissionType.MENU,
      route: 'videos',
      component: '/remote-assist/videos/index.tsx',
    },
  ],
};

const REPORTS_PERMISSION = {
  id: '3981225257359413',
  parentId: '',
  label: 'sys.menu.reports.index',
  name: 'Reports',
  icon: 'solar:documents-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'reports',
  order: 6,
  children: [
    {
      id: '8426999229763557',
      parentId: '3981225257359413',
      label: 'sys.menu.reports.medical_reports',
      icon: 'ph:dot-duotone',
      name: 'Medical Reports',
      type: PermissionType.MENU,
      route: 'medical-reports',
      component: '/reports/medical-reports/index.tsx',
    },
    {
      id: '9710971640735463',
      parentId: '3981225257359413',
      label: 'sys.menu.reports.usage_statistics',
      icon: 'ph:dot-duotone',
      name: 'Usage Statistics',
      type: PermissionType.MENU,
      route: 'usage_statistics',
      component: '/dashboard/analysis/index.tsx',
    },
  ],
};

const APPOINTMENTS_PERMISSION = {
  id: '3981225254567813',
  parentId: '',
  label: 'sys.menu.appointment.index',
  name: 'Appointment',
  icon: 'solar:calendar-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'appointments',
  order: 7,
  children: [
    {
      id: '8426999224523557',
      parentId: '3981225254567813',
      label: 'sys.menu.appointment.calendar',
      name: 'Calendar',
      icon: 'ph:dot-duotone',
      type: PermissionType.MENU,
      route: 'calendar',
      component: '/sys/others/calendar/index.tsx',
    },
  ],
};

const UPCOMING_APPOINTMENTS_PERMISSION = {
  id: '3981225254567633',
  parentId: '',
  label: 'sys.menu.appointment.index',
  name: 'Appointment',
  icon: 'solar:calendar-bold-duotone',
  type: PermissionType.CATALOGUE,
  route: 'appointments',
  order: 7,
  children: [
    {
      id: '8426999224523847',
      parentId: '3981225254567633',
      label: 'sys.menu.appointment.calendar',
      name: 'Calendar',
      icon: 'ph:dot-duotone',
      type: PermissionType.MENU,
      route: 'calendar',
      component: '/sys/others/calendar/upcoming-calendar.tsx',
    },
  ],
};


const PROFILE_PERMISSION = [
  {
    id: '3981225257359224',
    parentId: '',
    label: 'sys.menu.user.profile',
    name: 'Profile',
    icon: 'lets-icons:user-cicrle-duotone',
    type: PermissionType.MENU,
    route: 'profile',
    component: '/profile/account/index.tsx',
    hide: true,
  },
];

const OTHERS_PERMISSION = [
  {
    id: '3981225257367246',
    parentId: '',
    label: 'sys.menu.streaming',
    name: 'Streaming',
    icon: 'ph:video-duotone',
    type: PermissionType.MENU,
    route: 'streaming',
    component: '/streaming/index.tsx',
  },
  {
    id: '3981225257367246',
    parentId: '',
    label: 'sys.menu.join_streaming',
    name: 'Join Streaming',
    icon: '',
    type: PermissionType.MENU,
    route: 'streaming/:id',
    component: '/streaming/react-uikit/index.tsx',
    hide: true,
  },
];

export const PERMISSION_LIST = [
  DASHBOARD_PERMISSION,
  ADMIN_MANAGEMENT_PERMISSION,
  ASSETS_PERMISSION,
  TASKS_PERMISSION,
  REPORTS_PERMISSION,
  REMOTE_ASSIST_PERMISSION,
  ...PROFILE_PERMISSION,
  ...OTHERS_PERMISSION
];

export const ORGANIZATION_PERMISSIONS_LIST = [
  DASHBOARD_PERMISSION,
  ORG_MANAGEMENT_PERMISSION,
  TASKS_PERMISSION,
  REPORTS_PERMISSION,
  REMOTE_ASSIST_PERMISSION,
  APPOINTMENTS_PERMISSION,
  ...PROFILE_PERMISSION,
  ...OTHERS_PERMISSION
];
export const USERS_PERMISSIONS_LIST = [
  DASHBOARD_PERMISSION,
  TASKS_PERMISSION,
  REPORTS_PERMISSION,
  REMOTE_ASSIST_PERMISSION,
  UPCOMING_APPOINTMENTS_PERMISSION, 
  ...PROFILE_PERMISSION,
  ...OTHERS_PERMISSION
];

export const GENDER = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];
export const USER_PREFIX_TITLE = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Miss', label: 'Miss' },
  { value: 'Dr', label: 'Dr' },
  { value: 'Prof', label: 'Prof' },
];
export const USER_POSSITIONS = [
  { value: 'Intern', label: 'Intern' },
  { value: 'Medical Officer', label: 'Medical Officer' },
  { value: 'Registrar', label: 'Registrar' },
  { value: 'Consultant', label: 'Consultant' },
  { value: 'Head of Department', label: 'Head of Department' },
  { value: 'Clinical Manager', label: 'Clinical Manager' },
  { value: 'Supervisor', label: 'Supervisor' },
  { value: 'CEO', label: 'CEO' },
];

export const DEPARTMENTS = [
  { value: 'General Surgery', label: 'General Surgery' },
  { value: 'Casualty', label: 'Casualty' },
  { value: 'Anaesthesiology', label: 'Anaesthesiology' },
  { value: 'Cardiology', label: 'Cardiology' },
  { value: 'ENT', label: 'ENT' },
  { value: 'Gastroenterology', label: 'Gastroenterology' },
  { value: 'Haematology', label: 'Haematology' },
  { value: 'Paediatrics', label: 'Paediatrics' },
  { value: 'Obstetrics and Gynaecology', label: 'Obstetrics and Gynaecology' },
  { value: 'Neurology', label: 'Neurology' },
  { value: 'Intensive Care Unit', label: 'Intensive Care Unit' },
  { value: 'Oncology', label: 'Oncology' },
  { value: 'Ophthalmology', label: 'Ophthalmology' },
  { value: 'Orthopaedics', label: 'Orthopaedics' },
  { value: 'Psychiatry', label: 'Psychiatry' },
  { value: 'Urology', label: 'Urology' },
];

export const MEDIA_TYPE = [
  { value: 'Pdf', label: 'PDF' },
  { value: 'Image', label: 'Image' },
  { value: 'Video', label: 'Video' },
];