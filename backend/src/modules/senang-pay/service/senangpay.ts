import {
    AuthorizePaymentInput, CancelPaymentInput, CancelPaymentOutput,
    CapturePaymentInput, DeletePaymentInput, DeletePaymentOutput,
    GetPaymentStatusInput, GetPaymentStatusOutput, InitiatePaymentInput,
    InitiatePaymentOutput, ProviderWebhookPayload, RefundPaymentInput,
    RefundPaymentOutput, RetrievePaymentInput, RetrievePaymentOutput,
    UpdatePaymentInput, UpdatePaymentOutput, WebhookActionResult
} from "@medusajs/framework/types"
import { AbstractPaymentProvider, PaymentActions, PaymentSessionStatus } from "@medusajs/framework/utils"
import { Logger } from "@medusajs/medusa"





type InjectedDependencies = {
    logger: Logger
}

interface SenangPayServiceConfig {
    apiKey: string
}

export interface SenangPayServiceOptions {
    api_key: string
}


export class SenangPayService extends AbstractPaymentProvider {
    static identifier = "senang-pay"
    protected config_: SenangPayServiceConfig
    protected logger_: Logger

    constructor({ logger }: InjectedDependencies, options: SenangPayServiceOptions) {
        super()
        this.config_ = {
            apiKey: options.api_key,
        }
        this.logger_ = logger
        console.log('SenangPayService', this.config_)
    }

    async authorizePayment(input: AuthorizePaymentInput) {
        console.log('AuthorizePayment', input)
        return {
            status: PaymentSessionStatus.AUTHORIZED
        }
    }

    async capturePayment(input: CapturePaymentInput) {
        console.log('CapturePayment', input)
        return {
            data: {
                status: PaymentSessionStatus.CAPTURED
            }
        }
    }

    async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
        console.log('RetrievePayment', input)
        return {
            data: {
                status: PaymentSessionStatus.CAPTURED
            }
        }
    }

    async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
        console.log('UpdatePayment', input)
        return {
            data: {
                status: PaymentSessionStatus.AUTHORIZED
            }
        }
    }

    async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
        console.log('CancelPayment', input)
        return {
            data: {
                status: PaymentSessionStatus.CANCELED
            }
        }
    }

    async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
        console.log('DeletePayment', input)
        return {
            data: {
                status: PaymentSessionStatus.CANCELED
            }
        }
    }

    async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
        console.log('RefundPayment', input)
        return {
            data: {
                status: PaymentSessionStatus.CANCELED
            }
        }
    }

    async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {


        console.log('InitiatePayment', input)
        return {
            id: "test_id",
            data: {
                amount: 100,
                session_id: "test_session_id"
            }
        }
    }

    async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
        console.log('GetPaymentStatus', input)
        return {
            status: PaymentSessionStatus.AUTHORIZED
        }
    }

    async getWebhookActionAndData(data: ProviderWebhookPayload["payload"]): Promise<WebhookActionResult> {
        console.log('GetWebhookActionAndData', data)
        return {
            action: PaymentActions.SUCCESSFUL,
            data: {
                amount: 100,
                session_id: "test_session_id"
            }
        }
    }
}