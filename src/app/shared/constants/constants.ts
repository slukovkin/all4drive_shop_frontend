export const Constants = {

  BASE_URL: 'http://localhost:5000/',

  METHODS: {
    LOGIN: 'auth/login',
    REGISTRATION: 'auth/registration',
    UPDATE_USER_BY_ID: 'auth/profile/',
    GET_ALL_PRODUCTS: 'products',
    CREATE_PRODUCT: 'products',
    GET_PRODUCT_BY_ID: 'products/',
    GET_PRODUCT_BY_CODE: 'products/search',
    GET_PRODUCT_BY_CROSS: 'products/search/cross/',
    GET_PRODUCTS_BY_ORIGIN: 'products/search/origin/',
    UPDATE_PRODUCT_BY_ID: 'products/',
    DELETE_PRODUCT_BY_ID: 'products/',
    GET_ALL_CUSTOMERS: 'users',
    GET_CUSTOMER_BY_ID: 'users/',
    CREATE_CUSTOMERS: 'customers',
    UPDATE_CUSTOMERS_BY_ID: 'users/profile/',
    DELETE_CUSTOMERS_BY_ID: 'users/',
    UPLOAD_IMAGE: 'storage',
    GET_IMAGE_BY_FILENAME: 'storage/',
    GET_ALL_STORES: 'stores',
    GET_STORE_BY_ID: 'stores/search/',
    CREATE_STORE: 'stores',
    UPDATE_STORE_BY_ID: 'stores/',
    DELETE_STORE_BY_ID: 'stores/',
    GET_ALL_CURRENCY: 'currency',
    GET_CURRENCY_BY_ID: 'currency/',
    CREATE_CURRENCY: 'currency',
    UPDATE_CURRENCY_RATE_BY_ID: 'currency/',
    DELETE_CURRENCY_BY_ID: 'currency/',
    CREATE_SETTING: 'settings',
    GET_ALL_SETTINGS: 'settings',
    GET_SETTING_BY_ID: 'settings/',
    UPDATE_SETTING_BY_ID: 'settings/',
    DELETE_SETTING_BY_ID: 'settings/',
    CREATE_CATEGORY: 'categories',
    GET_ALL_CATEGORIES: 'categories',
    GET_CATEGORY_BY_ID: 'categories/',
    UPDATE_CATEGORY_BY_ID: 'categories/',
    DELETE_CATEGORY_BY_ID: 'categories/',
    ADD_PRODUCTS_IN_STORE: 'product_store',
    GET_ALL_PRODUCTS_FROM_STORE: 'product_store/',
    GET_PRODUCT_FROM_STORE_BY_ID: 'product_store/search/',
    FIND_PRODUCTS_BY_ARRAY_ID: 'products/findProductById',
    DELETE_PRODUCT_FROM_STORE_BY_ID: 'product_store/remove/',
    CHECK_TOKEN: 'auth/',
    CREATE_ORDER: 'orders',
    GET_ALL_ORDERS: 'orders',
    GET_ORDER_BY_ID: 'orders/',
    DELETE_ORDER_BY_ID: 'orders/',
    SEND_EMAIL: 'email',
    CREATE_INCOMING_INVOICE: 'incoming_invoices',
    GET_ALL__INVOICES: 'invoices/',
    GET_ALL_INCOMING_INVOICES: 'incoming_invoices/',
    GET_LAST_INCOMING_INVOICE_NUMBER: 'incoming_invoices/last',
    CREATE_OUTGOING_INVOICE: 'outgoing_invoices',
    GET_ALL_OUTGOING_INVOICES: 'outgoing_invoices/',
    GET_LAST_OUTGOING_INVOICE_NUMBER: 'outgoing_invoices/last',
    UPLOAD_CROSS_TABLE: 'cross',
    SEARCH_PRODUCT_BY_ORIGIN_IN_CROSSTABLE: 'cross/origin/',
    SEARCH_PRODUCTS_BY_CODE_IN_CROSSTABLE: 'cross/code/',
  },
}
