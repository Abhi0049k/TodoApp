export interface userCredentialsI {
    email: string,
    password: string
}

export interface TodoInput {
    task : string;
    description?: string;
    createdAt?: Date;
    email: string
}