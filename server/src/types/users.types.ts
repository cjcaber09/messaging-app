export interface UserTypes {
  id: string;
  email: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  is_active: boolean;
  is_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type UserRegisterType = Omit<
  UserTypes,
  "id" | "created_at" | "updated_at"
>;

export type UserUpdateType = Pick<
  UserTypes,
  "email" | "password" | "firstname" | "lastname" | "is_active"
>;

export type UserAuthType =
  | { email: string; username?: never; password: string } // email login
  | { username: string; email?: never; password: string }; // username login

export type UserEmail =
  | { email: string; username?: never }
  | { username: string; email?: never };

export type UserResponse = Partial<Omit<UserTypes, "password">>;