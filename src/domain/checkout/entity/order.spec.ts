import Order from "./order";
import OrderItem from "./order-item";

describe("Order unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "1", []);
        }).toThrowError("Id is required")
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required")
    });

    it("should throw error when customer id is empty", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Items are required")
    });

    it("should calculate total", () => {
        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "Item 2", 15, "p2", 2);

        const order = new Order("o1", "1", [item]);
        const order2 = new Order("o2", "1", [item, item2]);

        const total = order.total();
        const total2 = order2.total();

        expect(total).toBe(200);
        expect(total2).toBe(230);
    });

    it("should throw error if item quantity is less/equal zero", () => {
        expect(() => {
            const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
            const order = new Order("o1", "1", [item]);
        }).toThrowError("Quantity must be greater than zero");
    });

});