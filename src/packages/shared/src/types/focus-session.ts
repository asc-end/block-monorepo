import { Commitment } from "./routine";

export type FocusSessionStatus = 'active' | 'completed' | 'canceled';

export interface FocusSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // Duration in minutes
  status: FocusSessionStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  commitment?: Commitment
}

export interface CreateFocusSessionInput {
  userId: string;
  duration: number;
  notes?: string;
}

export interface UpdateFocusSessionInput {
  endTime?: Date;
  status?: FocusSessionStatus;
  notes?: string;
} 

export type FocusSessionType = {
  duration: number
  id:string,
  startTime: string,
  status: FocusSessionStatus,
  userId: string,
  commitment?: {
    id: string;
    amount: string;
    status: string;
    unlockTime: string;
    [key: string]: any;
  }
}