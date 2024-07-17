export const schema = /* GraphQL */ `
scalar Metadata

type StripeSubscription {
    id: ID!
    cancel_at_period_end: Boolean
    current_period_end: Int
    current_period_start: Int
    customer: String
    default_payment_method: StripePaymentMethod
    description: String
    items: [StripeSubscriptionItem]
    latest_invoice: String
    metadata: Metadata
    pending_setup_intent: String
    pending_update: StripeSubscriptionPendingUpdate
    status: StripeSubscriptionStatusEnum
    object: String
    application: String
    application_fee_percent: Float
    automatic_tax: StripeSubscriptionAutomaticTax
    billing_cycle_anchor: Int
    billing_thresholds: StripeSubscriptionBillingThreshold
    cancel_at: Int
    canceled_at: Int
    collection_method: StripeSubscriptionCollectionMethodEnum
    created: Int
    days_until_due: Int
    default_source: String
    default_tax_rates: [StripeSubscriptionTaxRates]
    discount: StripeDiscount
    ended_at: Int
    livemode: Boolean
    next_pending_invoice_item_invoice: Int
    pause_collection: StripeSubscriptionPauseCollection
    payment_settings: StripeSubscriptionPaymentSettings
    pending_invoice_item_interval: StripeSubscriptionInvoiceInterval
    schedule: String
    start_date: Int
    test_clock: String
    transfer_data: StripeSubscriptionTransferData
    trial_end: Int
    trial_start: Int
}

type StripeSubscriptionTransferData {
    amount_percent: Float
    destination: String
}

type StripeSubscriptionInvoiceInterval {
    interval: String
    interval_count: Int
}

type StripeSubscriptionPaymentSettings {
    payment_method_options: StripeSubscriptionPaymentMethodOptions
    payment_method_types: [StripeSubscriptionPaymentMethodTypesEnum]
    save_default_payment_method: StripeSubscriptionDefaultPaymentMethodEnum
}

enum StripeSubscriptionDefaultPaymentMethodEnum {
    off
    on_subscription
}

enum StripeSubscriptionPaymentMethodTypesEnum {
    ach_credit_transfer
    ach_debit
    acss_debit
    au_becs_debit
    bacs_debit
    bancontact
    boleto
    card
    customer_balance
    eps
    fpx
    giropay
    grabpay
    ideal
    konbini
    link
    p24
    paynow
    promptpay
    sepa_debit
    sofort
    us_bank_account
    wechat_pay
}

type StripeSubscriptionPaymentMethodOptions {
    object: String
}

type StripeSubscriptionPauseCollection {
    behaviour: String
    resumes_at: Int
}

type StripeSubscriptionBillingThreshold {
    amount_gte: Int
    reset_billing_cycle_anchor: Boolean
}

type StripeSubscriptionAutomaticTax {
    enabled: Boolean!
}

enum StripeSubscriptionStatusEnum {
    incomplete
    incomplete_expired
    trialing
    active
    past_due
    canceled
    unpaid
}

type StripeSubscriptionPendingUpdate {
    billing_cycle_anchor: Int
    expires_at: Int
    subscription_items: [StripeSubscriptionItem]
    trial_end: Int
    trial_from_plan: Boolean
}

type StripeSubscriptionItem {
    object: String
    data: [StripeSubscriptionItemData]
    has_more: Boolean
    url: String
}

type StripeSubscriptionItemData {
    id: String
    object: String
    billing_thresholds: StripeSubscriptionItemBillingThresholds
    created: Int
    metadata: Metadata
    price: StripeSubscriptionPrice
    quantity: Int
    subscription: String
    tax_rates: StripeSubscriptionTaxRates
}

type StripeSubscriptionTaxRates {
    id: String
    object: String
    active: Boolean
    country: String
    created: Int
    description: String
    display_name: String
    inclusive: Boolean
    juristriction: String
    livemode: Boolean
    metadata: Metadata
    percentage: Float
    state: String
    tax_type: String
}

type StripeSubscriptionPrice {
    id: String
    object: String
    active: Boolean
    billing_scheme: String
    created: Int
    currency: String
    custom_unit_amount: StripeSubscriptionPriceCustomUnitAmount 
    livemode: Boolean
    lookup_key: String
    metadata: Metadata
    nickname: String
    product: String
    recurring: StripeSubscriptionPriceRecurring
    tax_behaviour: String
    tiers: [StripeSubscriptionPriceTier]
    tiers_mode: String
    transform_quantity: StripeSubscriptionPriceTransformQuantity
    type: String
    unit_amount: Int
    unit_amount_decimal: String
}

type StripeSubscriptionPriceTransformQuantity {
    divide_by: Int
    round: StripeTransformQuantityRoundEnum
}

enum StripeTransformQuantityRoundEnum {
    up
    down
}

type StripeSubscriptionPriceTier {
    flat_amount: Int
    flat_amount_decimal: String
    unit_amount: Int
    unit_amount_decimal: String
    up_to: Int
}

type StripeSubscriptionPriceRecurring {
    aggregate_usage: String
    interval: StripeSubscriptionPriceRecurringIntervalEnum
    interval_count: Int
    usage_type: StripeSubscriptionPriceRecurringUsageTypeEnum
}

enum StripeSubscriptionPriceRecurringUsageTypeEnum {
    metered
    licensed
}

enum StripeSubscriptionPriceRecurringIntervalEnum {
    month
    year
    week
    day
}

enum StripeSubscriptionCollectionMethodEnum {
    charge_automatically
    send_invoice
}

type StripeSubscriptionPriceCustomUnitAmount {
    maximum: Int
    minimum: Int
    preset: Int
}

type StripeSubscriptionItemBillingThresholds {
    usage_gte: Int
}

input AutomaticTaxInput {
    enabled: Boolean!
}

input ListStripeSubscriptionsParamsInput {
    customer: ID
    price: ID
    status: StripeSubscriptionStatusEnum
    automatic_tax: AutomaticTaxInput
    collection_method: StripeSubscriptionCollectionMethodEnum
    created: Int
    current_period_end: Int
    current_period_start: Int
    ending_before: String
    limit: Int
    starting_after: String
    test_clock: String
}

input ListStripeSubscriptionsInput {
    params: ListStripeSubscriptionsParamsInput
}

type Query {
    listStripeSubscriptions(data: ListStripeSubscriptionsInput): [StripeSubscription] @requireAuth
}
`;
