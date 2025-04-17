import { CreateFulfillmentDTO, FulfillmentOption, IFulfillmentModuleService, IProductModuleService } from "@medusajs/framework/types";
import { AbstractFulfillmentProviderService, Modules } from "@medusajs/framework/utils";
import { container, MedusaContainer } from "@medusajs/framework"


class IstoreFulfillmentService extends AbstractFulfillmentProviderService {

    static identifier = "istore-fulfillment"


    constructor(options) {
        super()
    }


    // async createFulfillment(data: CreateFulfillmentDTO) {
    //     data.
    //     //create the fulfillment
    // }

    async getFulfillmentOptions(): Promise<FulfillmentOption[]> {
        //     const options: FulfillmentOption[] = []

        //     const fulfillmentService = container.resolve(Modules.FULFILLMENT)
        //     const response = await fulfillmentService.listShippingOptions();
        //    response o

        //test
        return [
            {
                id: "standard-shipping",
                name: "Standard Shipping",
                // You can add other data relevant to your provider
            },
            {
                id: "express-shipping",
                name: "Express Shipping",
            }
        ]

    }
}

export default IstoreFulfillmentService;
