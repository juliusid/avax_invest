import React, { useState, useEffect } from "react";
import { X, Landmark, AlertCircle, Loader2, CheckCircle } from "lucide-react";
import { Button } from "./Button";
import { walletApi } from "../api/wallet";

export const WithdrawalModal = ({ isOpen, onClose, balance, onRefresh }) => {
  const [step, setStep] = useState(1); // 1: Amount/Bank, 2: Processing, 3: Success
  const [amount, setAmount] = useState("");
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      walletApi.getBanks().then((res) => {
        if (res.data.success) setBanks(res.data.data.methods);
      });
    }
  }, [isOpen]);

  const handleWithdraw = async () => {
    if (!selectedBank || !amount) return;
    setLoading(true);
    try {
      const res = await walletApi.requestWithdrawal({
        amount,
        payment_method_id: selectedBank,
        description: "Investor Portfolio Withdrawal",
      });
      if (res.data.success) setStep(3);
    } catch (err) {
      alert("Withdrawal failed. Please check your balance.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Withdraw Funds</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 text-center">
                <p className="text-gray-500 text-xs uppercase mb-1">
                  Available Balance
                </p>
                <p className="text-3xl font-bold text-farm-500">
                  ₦{balance.toLocaleString()}
                </p>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Withdrawal Amount (₦)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-farm-500 outline-none"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-2">
                  Select Destination Bank
                </label>
                <div className="space-y-2">
                  {banks.map((bank: any) => (
                    <label
                      key={bank.id}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedBank === bank.id
                          ? "border-farm-500 bg-farm-500/5"
                          : "border-gray-700 hover:bg-gray-700/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="bank"
                        className="hidden"
                        onChange={() => setSelectedBank(bank.id)}
                      />
                      <Landmark className="text-gray-500 mr-3" size={20} />
                      <div className="flex-grow">
                        <p className="text-sm font-bold text-white">
                          {bank.bank_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {bank.account_number}
                        </p>
                      </div>
                      {selectedBank === bank.id && (
                        <CheckCircle className="text-farm-500" size={16} />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <AlertCircle className="text-yellow-500 shrink-0" size={16} />
                <p className="text-[10px] text-yellow-500/80 italic">
                  Payouts are processed within 24-48 business hours after
                  approval.
                </p>
              </div>

              <Button
                variant="primary"
                className="w-full py-4"
                disabled={loading || !selectedBank || !amount}
                onClick={handleWithdraw}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Request Payout"
                )}
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-500" size={40} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                Request Sent!
              </h4>
              <p className="text-gray-400 text-sm mb-8">
                Your withdrawal request of ₦
                {parseFloat(amount).toLocaleString()} is being processed.
              </p>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
