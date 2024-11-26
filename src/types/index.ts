export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export const PERMISSION_OPTIONS = [
  'read', 'write', 'delete', 'manage_users', 
  'create_content', 'approve_content'
];

export const INITIAL_USERS: User[] = [
  { 
    id: '1', 
    username: 'admin', 
    email: 'admin@example.com', 
    role: 'super_admin', 
    status: 'active' 
  },
  { 
    id: '2', 
    username: 'editor', 
    email: 'editor@example.com', 
    role: 'content_editor', 
    status: 'active' 
  }
];

export const INITIAL_ROLES: Role[] = [
  { 
    id: '1', 
    name: 'Super Admin', 
    permissions: ['read', 'write', 'delete', 'manage_users'] 
  },
  { 
    id: '2', 
    name: 'Content Editor', 
    permissions: ['read', 'write'] 
  }
];