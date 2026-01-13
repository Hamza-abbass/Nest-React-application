import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rolee } from "./role.entity";
import { User } from "src/user/user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Rolee,User])],
    exports:[TypeOrmModule]
})
export class SeedModule{}