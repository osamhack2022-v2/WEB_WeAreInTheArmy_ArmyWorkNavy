import React from 'react';

export type HasChild = {
  children: React.ReactNode;
};

export type Post = {
  admit: boolean;
  createdAt: string;
  description: string;
  idx: number;
  image: string;
  location: string;
  done: boolean;
  identifier: string;
  participants: string;
  status: AcceptanceStatus;
  title: string;
  type: string;
  updatedAt: string;
};

export enum Accept {
  Pending = 0,
  Cancel = 1,
  Accept = 2,
}

export enum AccountTypes {
  ADMINISTRATOR = 'administrator',
  CITIZEN = 'citizen',
  MILLITARY = 'millitary',
  DEFAULT = 'default',
}

export enum AcceptanceStatus {
  PENDING = 'pending',
  ACCPEPTED = 'accepted',
  DENIED = 'denied',
}

export type User = {
  idx: number;
  identifier: string;
  password: string;
  type: AccountTypes;
  name: string;
  phone: string;
  organization: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  boards: Board[];
};

export enum RequestTypes {
  ENVIROMENTAL = 'enviromental',
  DISASTOR = 'disastor',
  SOCIAL = 'social',
  DEFAULT = 'default',
}

export type Marker = {
  position: {
    lat: number;
    lng: number;
  };
  content: string;
};

export type Board = {
  idx: number;
  identifier: string;
  type: RequestTypes;
  title: string;
  description: string;
  location: string;
  admit: boolean;
  image: string;
  status: AcceptanceStatus;
  done: boolean;
  participants: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};
