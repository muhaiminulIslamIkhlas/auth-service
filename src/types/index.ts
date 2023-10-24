import { Request } from 'express';

export interface UserData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface RegisterUserRequest extends Request {
  body: UserData;
}
