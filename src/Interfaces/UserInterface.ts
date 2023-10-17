export interface UserData {
    message: string;
    getUser: User[];
}

export interface User {
    name:           string;
    password:       string;
    confirmPassword:       string;
    email:          string;
    phone?:          string;
    DOB?:          string;
    userImage:          File | null;
    gender?:         string;
    [key: string]: string |undefined| File | null;

}