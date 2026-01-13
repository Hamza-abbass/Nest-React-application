import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailDto{
    @IsEmail({},{message:'You are entring an invalid email'})
    @IsNotEmpty({message:'The email cannot be empty'})
    email:string
}