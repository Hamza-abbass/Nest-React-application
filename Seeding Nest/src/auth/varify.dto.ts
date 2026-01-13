import { IsEmail, IsNotEmpty, IsNumberString, Length } from "class-validator";

export class VarifyDto{

@IsNotEmpty({message:"Otp is required"})
otp:string;

@IsNumberString({},{message:"The OTP must be a number"})
@IsNotEmpty({message:"Id is required"})
id:number





}