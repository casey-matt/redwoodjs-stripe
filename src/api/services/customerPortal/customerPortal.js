import { stripe } from '../../lib'

export const createStripeCustomerPortalSession = async ({ data }) => {
    const session = await stripe.billingPortal.sessions.create(data);
    return session
}

export const createStripeCustomerPortalSessionSkipAuth = async ({ data }) => {
    const session = await createStripeCustomerPortalSession(data)
    return session
}

export const createStripeCustomerPortalConfig = async ({ data }) => {
    const config = await stripe.billingPortal.configurations.create(data)
    return config
}

export const listStripeCustomerPortalConfig = async ({ params }) => {
    const configArray = await stripe.billingPortal.configurations.list(params)
    console.log("==============================================")
    console.log(configArray)
    console.log("==============================================")

    return configArray
}