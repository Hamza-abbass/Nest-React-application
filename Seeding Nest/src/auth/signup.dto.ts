import { IsEmail,isNotEmpty,IsNotEmpty,IsNumberString,IsString,Length,Matches,MinLength } from "class-validator";


export class SignupDto{
    @IsNotEmpty({message:'Username is required'})
    @Matches(/^[A-Za-z]+$/,{message:'Username must only be characters'})
    @Length(5,12,{message:"Username must be between 5 and 12 characters"})
    username:string;

    @IsNotEmpty({message:'Email is required'})
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,{message:'You are not entring a valid email'})
    email:string;

    @IsNotEmpty({message:"Password is required"})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:'Minimum 8 characters in length at least one lowercase letter at least one uppercase letter at least one digit at least one special character no whitespace'})
    password:string;


    @IsNotEmpty({message:'ConfirmPassword is required'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message:'Minimum 8 characters in length at least one lowercase letter at least one uppercase letter at least one digit at least one special character no whitespace'})
    confirmPassword:string;
    

    // @IsNotEmpty({message:'Role cannot be empty'})
    // role_id:string;

}