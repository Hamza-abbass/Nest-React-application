import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orders.entity";

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @Column()
    discription: string;

    @Column()
    price: number;

    @Column()
    stockQuantity: number;

    @ManyToOne(()=>Order,order=>order.product)
    @JoinColumn()
    order:Order;




}