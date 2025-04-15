import type {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import {
    IApiKeyModuleService,
    IOrderModuleService,
    IProductModuleService,
    ProductCategoryDTO
} from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { fulfillmentWorkflow } from "workflows/istore-fulfillment/istore-fulfillment-workflow";
import { createFulfillmentIStoreWorkflow } from "workflows/istore-fulfillment/istore-fulfillment-workflow";



export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    try {
        const productService: IProductModuleService = req.scope.resolve(Modules.PRODUCT);
        const orderService: IOrderModuleService = req.scope.resolve(Modules.ORDER);
        const categories = await productService.listAndCountProductCategories();
        const orders = await orderService.listAndCountOrders();

        const { result: fulfillmentWorkflowResult } = await fulfillmentWorkflow(req.scope).run()

        const { result: createFulfillmentIStoreResult } = await createFulfillmentIStoreWorkflow(req.scope).run()


        res.json({
            message: "[GET] Hello world!",
            status: 200,
            data: {
                categories,
                orders,
                fulfillmentWorkflowResult,
                createFulfillmentIStoreResult
            }
        })

        //send the api fullfillment
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}