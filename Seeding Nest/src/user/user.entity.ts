import { Exclude } from "class-transformer";
import { Customer } from "src/Entities/customer.entity";
import { Rolee } from "src/seed/role.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Timestamp, OneToOne } from "typeorm";
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column('uuid')
    role_id: string;

    @Column()
    confirmPassword:string;

    @Column({ default: null, type: 'varchar', length: 1024 })
    Code: string;

    @Column({ type: 'timestamp', default:null })
    otp_expires_at: Date;

    @Column({default:null})
    otpSessionId:string

    @Column({ nullable: true })
    otp: string;

    @Column({ default: false })
    isVarified: boolean;

    @ManyToOne(() => Rolee, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Rolee;

    @OneToOne(()=> Customer, customer=>customer.user)
    customer:Customer;
    
    constructor(partial: Partial<User>) {
        Object.assign(this, partial)
    }


}