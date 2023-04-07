export interface User {
    id: string,
    email: string,
    password: string,
    name: string
    role: 'customer' | 'admin';
}
export interface CreateUser extends Omit <User,'id' > {}