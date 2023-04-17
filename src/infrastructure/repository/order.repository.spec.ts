import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import orderRepository from "./order.repository";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order-item";
import Order from "../../domain/entity/order";

describe("Order repository test", () => {

    let sequelize: Sequelize;
    let orderRepository: orderRepository;
    let customerRepository: CustomerRepository;
    let productRepository: ProductRepository;

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "Zipcode 1", "City 1");
    const product = new Product("123", "Product 1", 10);
    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("123", "123", [orderItem]);

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        orderRepository = new OrderRepository();
        customerRepository = new CustomerRepository();
        productRepository = new ProductRepository();

        await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should create a new order", async () => {
        customer.changeAddress(address);
        await customerRepository.create(customer);
        await productRepository.create(product);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    product_id: orderItem.productId,
                    order_id: "123"
                }
            ]
        })
    });

    // it("should update an order", async () => {
    //     customer.changeAddress(address);
    //     await customerRepository.create(customer);
    //     await productRepository.create(product);
    //     await orderRepository.create(order);

    //     const orderModel = await OrderModel.findOne({
    //         where: { id: order.id },
    //         include: ["items"]
    //     });

    //     expect(orderModel.toJSON()).toStrictEqual({
    //         id: "123",
    //         customer_id: "123",
    //         total: order.total(),
    //         items: [
    //             {
    //                 id: orderItem.id,
    //                 name: orderItem.name,
    //                 price: orderItem.price,
    //                 quantity: orderItem.quantity,
    //                 product_id: orderItem.productId,
    //                 order_id: "123"
    //             }
    //         ]
    //     })

    //     order.changeCustomerId("456");
    //     await orderRepository.update(order);

    //     const orderModel2 = await OrderModel.findOne({
    //         where: { id: order.id },
    //         include: ["items"]
    //     });

    //     expect(orderModel2.toJSON()).toStrictEqual({
    //         id: "123",
    //         customer_id: "456",
    //         total: order.total(),
    //         items: [
    //             {
    //                 id: orderItem.id,
    //                 name: orderItem.name,
    //                 price: orderItem.price,
    //                 quantity: orderItem.quantity,
    //                 product_id: orderItem.productId,
    //                 order_id: "123"
    //             }
    //         ]
    //     })
    // });

})