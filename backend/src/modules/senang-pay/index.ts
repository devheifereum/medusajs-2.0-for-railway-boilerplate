import { ModuleProviderExports } from '@medusajs/framework/types'
import { SenangPayService } from './service/senangpay'

const services = [SenangPayService]

const providerExport: ModuleProviderExports = {
    services,
}

export default providerExport
