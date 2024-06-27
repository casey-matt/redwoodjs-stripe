import type { ApolloClient } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { gql } from "graphql-tag";
import { useEffect } from "react";
import type { Customer } from "../provider/types.js";

const STRIPE_CUSTOMER_SEARCH = gql`
    query stripeCustomerSearch(
      $query: String
    ) {
      stripeCustomerSearch(query: $query) {
        id
        name
        email
      }
    }
  `;
const RETRIEVE_STRIPE_CUSTOMER = gql`
    query retrieveStripeCustomer(
      $data: RetrieveStripeCustomerInput
    ) {
      retrieveStripeCustomer(data: $data) {
        id 
        name
        email
      }
    }
  `;

export interface FetchCustomerContext {
  client: ApolloClient<unknown>;
  id?: string | null | undefined;
  searchString: string | null | undefined;
}

const searchCustomer = async ({
  client,
  searchString,
}: FetchCustomerContext) => {
  const result = await client.query({
    query: STRIPE_CUSTOMER_SEARCH,
    variables: {
      query: searchString,
    },
  });

  if (result.error) {
    throw result.error;
  }

  return result.data?.stripeCustomerSearch ?? null;
};

const retrieveCustomer = async ({ id, client }: FetchCustomerContext) => {
  const result = await client.query({
    query: RETRIEVE_STRIPE_CUSTOMER,
    variables: {
      data: {
        id: id,
      },
    },
  });

  if (result.error) {
    throw result.error;
  }

  return result.data?.retrieveStripeCustomer ?? null;
};

const fetchCustomer = async (context: FetchCustomerContext) => {
  const { id, searchString } = context;
  const hasSearchString = searchString !== "" && !!searchString;
  const hasID = id !== "" && !!id;

  if (!hasSearchString && !hasID) {
    return null;
  }

  let foundCustomer = null;

  if (hasID) {
    foundCustomer = await retrieveCustomer(context);
  } else if (hasSearchString && foundCustomer === null) {
    foundCustomer = await searchCustomer(context);
  }
  return foundCustomer;
};

export const useStripeCustomerFetch = (
  id: string | null | undefined,
  searchString: string | null | undefined,
  setCustomer: (customer: Customer) => unknown,
) => {
  const client = useApolloClient();
  useEffect(() => {
    const doFetch = async () => {
      const context = {
        id,
        client,
        searchString,
      };
      const stripeCustomer = await fetchCustomer(context);
      setCustomer(stripeCustomer);
    };

    doFetch();
  }, [searchString, id]);
};
