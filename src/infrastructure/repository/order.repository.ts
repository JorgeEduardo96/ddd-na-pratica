import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItem from "../../domain/entity/order-item";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {

        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
        },
        {
            include: [{ model: OrderItemModel }]
        });
    }

    async update(entity: Order): Promise<void> {

        await OrderModel.update({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }
            ))
        },
        {
            where: {
                id: entity.id
            }
        });
    }
    
    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({
            where: { id: id },
            include: ["items"]
       });

       return new Order(
        orderModel.id,
        orderModel.customer_id,
        this.orderItemModelsToOrderItems(orderModel.items)
       )
    }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({ include: ["items"] });
        return ordersModel.map((orderModel) => new Order(orderModel.id, orderModel.customer_id, this.orderItemModelsToOrderItems(orderModel.items)));
    }

    private orderItemModelsToOrderItems(orderItemModels: OrderItemModel[]): OrderItem[] {
        return orderItemModels.map((item) => new OrderItem(
            item.id, item.name, item.price, item.product_id, item.quantity
        ))
    }

}
