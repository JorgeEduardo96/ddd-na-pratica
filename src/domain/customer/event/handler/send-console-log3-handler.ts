
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendConsoleLog3Handler implements EventHandlerInterface<CustomerAddressChangedEvent> {

    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Address of client: ${event.eventData.id}, ${event.eventData.name} updated to: ${event.eventData.address.street}, ${event.eventData.address.number} - ${event.eventData.address.zipcode}, ${event.eventData.address.city}`);
    }

}