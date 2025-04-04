import Medusa from "@medusajs/js-sdk"
import axios from "axios"

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

export const sdk = new Medusa(
  {
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rvcl9pZCI6InVzZXJfMDFKUTRCVFhZVkhDSFI3OUozQ1ROSjcwTVkiLCJhY3Rvcl90eXBlIjoidXNlciIsImF1dGhfaWRlbnRpdHlfaWQiOiJhdXRoaWRfMDFKUTRCVFhYUERFVEsxWUIzQjFTQlZEQzkiLCJhcHBfbWV0YWRhdGEiOnsidXNlcl9pZCI6InVzZXJfMDFKUTRCVFhZVkhDSFI3OUozQ1ROSjcwTVkifSwiaWF0IjoxNzQzNzU5NzI2LCJleHAiOjE3NDM4NDYxMjZ9.gfOhwvNEEDaCI57yvGWz3GrJRwb63gu_bDA2XSgr0tY",
    baseUrl: MEDUSA_BACKEND_URL,
    debug: process.env.NODE_ENV === "development",
    publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,


  })



export const axiosInstance = axios.create({
  baseURL: MEDUSA_BACKEND_URL,
  headers: {
    "x-publishable-api-key": `${process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY}`
  },
})


