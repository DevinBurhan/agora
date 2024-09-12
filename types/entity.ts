import { BasicStatus, PermissionType } from './enum';

export interface UserToken {
  accessToken?: string;
  refreshToken?: string;
}

export interface UserInfo {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  avatar?: string;
  role: Role | string;
  status?: BasicStatus;
  permissions?: Permission[];
  organisationId?: Organization | any;
}

export interface Organization {
  name: string;
  image: any | string;
  organisation_id: string;
  created_at: Date;
  updated_at: Date;
  user: object | any;
}

export interface TaskTemplates {
  id: number;
  name: string;
  desc: string;
  task: { name: string; type: string }[];
  created_at: string;
}

export interface Permission {
  id: string;
  parentId: string;
  name: string;
  label: string;
  type: PermissionType;
  route: string;
  status?: BasicStatus;
  order?: number;
  icon?: string;
  component?: string;
  hide?: boolean;
  hideTab?: boolean;
  frameSrc?: string;
  newFeature?: boolean;
  children?: Permission[];
}

export interface Role {
  id: string;
  name: string;
  label: string;
  status: BasicStatus;
  order?: number;
  desc?: string;
  permission?: Permission[];
}

export interface MenuItems {
  disabled: any | boolean;
  key: string;
  label: object | any;
}

export interface UserDetails {
  id: string;
  title: string;
  gender: string;
  phone_number: number | string;
  position: string;
  department: string;
  province: string;
  persal_number: number | string;
  created_at: Date;
  updated_at: Date;
}
export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  user_details: UserDetails;
}
export interface OptionValues {
  value: string;
  label: string;
}

export interface Model {
  name: string;
  description: string;
  sku: string;
  brand: string;
  category: string;
  image_filename?: string | File;
  glb_filename?: string | File;
}
export interface ModelDetail extends Model {
  id: string;
  uuid: string;
  created_at: Date;
  updated_at: Date;
  type: string;
  preview: string;
  account_id: string;
}

export interface Media {
  name: string;
  description: string;
  type: string;
  brand: string;
  category: string;
  filename?: string | File;
}
export interface MediaDetail extends Media {
  id: string;
  uuid: string;
  created_at: Date;
  updated_at: Date;
  preview: string;
  account_id: string;
}
export interface AssistModule {
  id: string;
  username: string;
  name: string;
  email: string;
  mobile: string | number;
}
export interface Agents extends AssistModule {
  status: string;
}
export type ActionModalProps = {
  data: any;
  Id: string;
  title: string;
  show: boolean;
  onOk: VoidFunction;
  onCancel: VoidFunction;
};
export interface ModelViewerJSX {
  src: string;
  poster?: string;
  iosSrc?: string;
  seamlessPoster?: boolean;
  autoplay?: boolean;
  environmentImage?: string;
  exposure?: string;
  interactionPromptThreshold?: string;
  shadowIntensity?: string;
  ar?: boolean;
  arModes?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  cameraOrbit?: string;
  alt?: string;
  sx?: any;
}
