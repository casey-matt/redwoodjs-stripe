import { useContext } from 'react'
import { useMutation } from '@redwoodjs/web'

import { StripeContext } from '../provider/StripeContext'

import gql from 'graphql-tag'

export const useStripeCustomerPortal = () => {
  const context = useContext(StripeContext)

    const [createStripeCustomerPortalSession] = useMutation(
    gql`
      mutation createStripeCustomerPortalSession($variables: StripeCustomerPortalInput ) {
        createStripeCustomerPortalSession(variables: $variables) {
          id
          url
        }
      }
    `
    )
    
  return {
    redirectToStripeCustomerPortal: async(args, skipAuth = false) => {
        // Create Payload
        const payload = {
          variables: {
            variables: {
              ...(context.customer ? { customer: context.customer.id } : {}),
              ...args
            }
          }
        }

      // Check to skipAuth
      if (skipAuth) {
        // Create Customer Portal Session using Test mutation that skips auth
        const { data: { createStripeCustomerPortalSession: { url } } } = await createStripeCustomerPortalSession(payload)
        location.href = url;
      } else {
        // Create Customer Portal Session
        const { data: { createStripeCustomerPortalSession: { url } } } = await createStripeCustomerPortalSession(payload)
        location.href = url;
      }
        
    },
    listStripeCustomerPortalConfigs: async (args) => {
      
    },
    createStripeCustomerPortalConfig: async(args) => {
      
    },
  }
}