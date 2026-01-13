import { User } from "src/user/user.entity";
import { Column, Entity,  OneToMany,  PrimaryColumn } from "typeorm";

@Entity('roles')
export class Rolee{
    @PrimaryColumn('uuid')
    role_id:string;

    @Column()
    code:string;

    @Column()
    name:string;

    @OneToMany(() => User,(user)=>user.role_id)
    users:User[];

}