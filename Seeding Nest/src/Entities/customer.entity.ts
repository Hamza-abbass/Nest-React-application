import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orders.entity";
import { Contact } from "./contact.entity";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    phone: string

    @OneToOne(() => User, user => user.customer)
    @JoinColumn()
    user: User;


    @OneToMany(() => Order, order => order.customer)
    order: Order[];


    @OneToMany(()=>Contact,contact=>contact.customer)
    contact:Contact[];








}