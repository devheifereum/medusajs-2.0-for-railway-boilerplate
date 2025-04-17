// src/workflows/fulfillment-workflow.ts
import { createStep, createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"

const getFulfillmentOptionsStep = createStep<
    Record<string, never>,
    { options: ShippingOption[] },
    any
>(
    "get-fulfillment-options",
    async (input, { container }) => {
        const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
        const options = await fulfillmentModuleService.listShippingOptions();
        return { options }
    }
)

const createFulfillmentIStore = createStep<
    Record<string, never>,
    { success: boolean; message: string },
    any
>(
    "create-fulfillment-istore",
    async (input, { container }) => {
        return {
            success: true,
            message: 'Trigger IStore Fulfillment'
        }
    }
)

export const fulfillmentWorkflow = createWorkflow(
    "fulfillment-workflow",
    () => {
        const { options } = getFulfillmentOptionsStep()
        return new WorkflowResponse({ options })
    }
)

export const createFulfillmentIStoreWorkflow = createWorkflow(
    "create-fulfillment-istore-workflow",
    () => {
        const { success, message } = createFulfillmentIStore()
        return new WorkflowResponse({ success, message })
    }
)