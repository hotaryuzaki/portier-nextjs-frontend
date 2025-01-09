export interface Tenant {
  id: number;
  name: string;
  address: string;
  status: string;
  createdAt: Date;
  isActive: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  gender: boolean;
  idNumber: string;
  userImage: string;
  tenantId: number;
  createdAt: Date;
  isActive: boolean;
}

export interface Key {
  id: number;
  name: string;
  createdAt: Date;
  createdBy: number;
  isActive: boolean;
}

export interface Copy {
  id: number;
  name: string;
  keyId: number;
  createdAt: Date;
  createdBy: number;
  isActive: boolean;
}