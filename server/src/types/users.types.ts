export interface UserTypes {
    id: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    is_active: boolean,
    is_verified: boolean,
    created_at?: Date,
    updated_at?: Date
};



export type UserRegisterType = Omit<UserTypes, "id" | "created_at" | "updated_at">;

export type UserUpdateType = Pick<UserTypes, "email" | "password" | "firstname" | "lastname" | "is_active">

export type UserAuthType = Pick<UserTypes, "email" | "firstname">;

export type UserEmail = Pick<UserTypes, "email">;

export type UserResponse = Omit<UserRegisterType, "password">;