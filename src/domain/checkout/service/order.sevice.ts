
import Order from "../entity/order";
import {v4 as uuid} from "uuid";
import OrderItem from "../entity/order-item";
import Customer from "../../customer/entity/customer";


export default class OrderService {

    static calculateTotals(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0)
            throw new Error("Order must have at least 1 item");        
        const order = new Order(uuid(), customer.id, items);
        customer.addRewardPoints(order.total() / 2);
        return order;
    }
  
}