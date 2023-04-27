import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Jorge");
        }).toThrowError("Id is required")
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123-456-789", "");
        }).toThrowError("Name is required")
    });
    
    it("should change name", (() => {
        const customer = new Customer("123-456-789", "Jorge");

        customer.changeName("Eduardo");

        expect(customer.name).toBe("Eduardo");
    }));

    
    it("should activate customer", (() => {
        const customer = new Customer("123-456-789", "Jorge");
        customer.Address = new Address("Rua do Teste", 999, "52031-382", "Testelandias");

        customer.activate();

        expect(customer.isActive()).toBe(true);
    }));

    it("should deactivate customer", (() => {
        const customer = new Customer("123-456-789", "Jorge");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    }));

    it("should throw error when addres is undefined when you activate a customer", (() => {
        expect(() => {
            const customer = new Customer("123-456-789", "Jorge");
            customer.activate();    
        }).toThrowError("Address is mandatory to activate a customer")
    }));

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });

});