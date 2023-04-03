import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import {v4 as uuid} from "uuid";

export default class OrderService {

    static calculateTotals(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0)
            throw new Error("Order must have at least 1 item");        
        const order = new Order(uuid(), customer.id, items);
        customer.addRewardsPoints(order.total() / 2);
        return order;
    }
  
}