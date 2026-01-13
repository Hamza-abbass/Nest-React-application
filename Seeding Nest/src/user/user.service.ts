import { Injectable, UseInterceptors } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>) { }
    async create(user: Partial<User>): Promise<User> {
        return this.userRepository.save(user);
    }
    async findByEmail(email: string): Promise<any> {
        return this.userRepository.findOne({ where: { email } });
        
    }


     async findByEmaill(email: string): Promise<any> {
        return this.userRepository.findOne({ where: { email } });
        
    }

    async findbyId(id: number){
         return await this.userRepository.findBy({id});
        // console.log(data);
        
        
    }

 



    async updated(id: number, user: User) {
        await this.userRepository.findOneBy({ id });

        await this.userRepository.update(id, user);
    }
    async remove(id: string) {
        return this.userRepository.delete(id)
    }
}