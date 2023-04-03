import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.sevice";

describe("Order service unit tests", () => {

    it("should place an order", () => {
    
        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("i1", "Item 1", 100, "p1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(50);
        expect(order.total()).toBe(100);
    });

    it("should calculate the total of all orders", () => {

        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);

        const order = new Order("o1", "1", [item]);
        const order2 = new Order("o2", "1", [item, item2]);
        const orders = [order, order2];

        let totals = OrderService.calculateTotals(orders);
        
        expect(totals).toBe(800);
    });

});