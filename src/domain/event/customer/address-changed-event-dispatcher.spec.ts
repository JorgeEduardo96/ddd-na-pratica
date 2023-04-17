import EventDispatcher from "../@shared/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import SendConsoleLog3Handler from "./handler/send-console-log3-handler";


describe("Customer AddressChanged Domain events tests", () => {

    it("should register AddressChanged event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog3Handler();

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);    

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister AddressChanged event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog3Handler();

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(0);
    });

    it("should unregister all AddressChanged events handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog3Handler();

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLog3Handler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: "123",
            name: "Customer 1",
            address: {
                street: "Street 1",
                zipcode: "Zipcode 1",
                city: "City 1",
                number: "123"
            }
        });

        // When notify is called the SendEmailWhenProductIsCreatedHandler.handle() should be called
        eventDispatcher.notify(customerAddressChangedEvent);
        
        expect(spyEventHandler).toHaveBeenCalled();
    });

});