import { User } from "src/user/user.entity";
import { DataSource } from "typeorm";
import { person } from "./user.seed";
import bcrypt from 'bcryptjs';
import { UnauthorizedException } from "@nestjs/common";

export async function seedUser(dataSource: DataSource): Promise<void> {
    const UserRepository = dataSource.getRepository(User);
    const user = person;
    for (const data of user) {
        console.log(data);

        const existingUser = await UserRepository.findOneBy({ username: data.username });
        if (existingUser) {
            throw new UnauthorizedException('Username is already exists');
        } else {
            const hashpass = await bcrypt.hash(data.password,10);
            const hashConfirmPass = await bcrypt.hash(data.confirmPassword,10);
            const result = UserRepository.create({
                username: data.username,
                email:data.email,
                password: hashpass,
                confirmPassword:hashConfirmPass,
                role_id:data.role_id,
            });
            const seeding = await UserRepository.save(result);
        }
    }

}