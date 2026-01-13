import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Contact } from "./contact.entity";
import { Products } from "./products.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderDate: Date;

    @Column()
    status: string;

    @Column()
    totalAmount: number;

    @Column()
    shippingAddress: string;

    @Column()
    paymentMethod: number;

    @Column()
    paymentStatus: string;


    @ManyToOne(() => Customer, customer => customer.order)
    @JoinColumn()
    customer: Customer;

    @OneToMany(()=>Products,product=>product.order)
    product:Products[];






}