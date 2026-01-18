import api from "./client";

export const walletApi = {
  /**
   * Fetches the user's wallet balance and basic details
   */
  getWalletData: () => api.get("/wallet"),

  /**
   * Fetches the transaction history for the user's wallet
   */
  getTransactions: () => api.get("/wallet/transactions"),

  /**
   * Fetches the bank accounts/payout methods linked to the investor
   */
  getBanks: () => api.get("/payment-methods"),

  /**
   * Adds a new bank account for the investor
   * @param {Object} data { bank_name, bank_code, account_number, account_name }
   */
  addBank: (data) => api.post("/payment-methods", data),

  /**
   * Submits a withdrawal request
   * @param {Object} data { amount, payment_method_id, description }
   */
  requestWithdrawal: (data) => api.post("/payouts/request", data),

  /**
   * Fetches the history of payout requests (Pending, Approved, Successful)
   */
  getPayoutHistory: () => api.get("/payouts"),
};
