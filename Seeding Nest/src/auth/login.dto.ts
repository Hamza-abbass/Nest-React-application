import { IsEmail, IsNotEmpty, IsNumberString, Length, Matches } from "class-validator";

export class LoginDto {

    @IsNotEmpty({ message: 'Email is required' })
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'You are not entring a valid email' })
    email: string;

    @IsNotEmpty({ message: "Password is required" })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Minimum 8 characters in length at least one lowercase letter at least one uppercase letter at least one digit at least one special character no whitespace' })
    password: string;





}






