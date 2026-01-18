import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  Sprout,
  Clock,
  CheckCircle,
  ChevronRight,
  TrendingUp,
  Image as ImageIcon,
  XCircle,
  Loader2,
  FileText,
  ShieldCheck,
  MapPin,
  Landmark,
  AlertCircle,
} from "lucide-react";
import { Button } from "../components/Button";
import { investmentApi } from "../api/investments";
import { walletApi } from "../api/wallet";
import { useAuth } from "../contexts/AuthContext";

// --- SUB-COMPONENT: WITHDRAWAL MODAL ---
const WithdrawalModal = ({ isOpen, onClose, balance, onRefresh }: any) => {
  const [step, setStep] = useState(1);
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
      await walletApi.requestWithdrawal({
        amount,
        payment_method_id: selectedBank,
        description: "Investor Portfolio Withdrawal",
      });
      setStep(3);
      onRefresh();
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
            <XCircle />
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
              <input
                type="number"
                placeholder="Enter Amount"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:ring-1 focus:ring-farm-500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="space-y-2">
                <p className="text-xs text-gray-400">Select Bank Account</p>
                {banks.length > 0 ? (
                  banks.map((bank: any) => (
                    <div
                      key={bank.id}
                      onClick={() => setSelectedBank(bank.id)}
                      className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedBank === bank.id
                          ? "border-farm-500 bg-farm-500/5"
                          : "border-gray-700"
                      }`}
                    >
                      <Landmark className="mr-3 text-gray-500" />
                      <div className="text-sm">
                        <p className="text-white font-bold">{bank.bank_name}</p>
                        <p className="text-gray-500">
                          {bank.account_number_last4}****
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 italic">
                    No bank accounts linked.
                  </p>
                )}
              </div>
              <Button
                variant="primary"
                className="w-full py-4"
                onClick={handleWithdraw}
                disabled={loading || !selectedBank}
              >
                {loading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Request Payout"
                )}
              </Button>
            </div>
          )}
          {step === 3 && (
            <div className="text-center py-6">
              <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
              <h4 className="text-white font-bold">Request Submitted</h4>
              <p className="text-gray-400 text-sm mb-6">
                Funds will reach your bank within 48 hours.
              </p>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT: DASHBOARD ---
export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [selectedInv, setSelectedInv] = useState<any>(null);
  const [showFullReport, setShowFullReport] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [stats, setStats] = useState({
    totalValue: 0,
    totalYield: 0,
    activeProjects: 0,
  });

  const STAGES = ["funding", "preparation", "active", "harvesting", "payout"];

  const fetchData = async () => {
    try {
      const [portRes, walletRes] = await Promise.all([
        investmentApi.getPortfolio(),
        walletApi.getWalletData(),
      ]);

      if (portRes.data?.success) {
        const investments = portRes.data.data.portfolio;
        setPortfolio(investments);
        setStats({
          totalValue: investments.reduce(
            (acc: any, curr: any) => acc + parseFloat(curr.amount_invested),
            0
          ),
          totalYield: investments.reduce(
            (acc: any, curr: any) => acc + parseFloat(curr.expected_roi),
            0
          ),
          activeProjects: investments.filter((i: any) => i.status === "active")
            .length,
        });
      }
      if (walletRes.data?.success) {
        setWalletBalance(parseFloat(walletRes.data.data.wallet.balance));
      }
    } catch (error) {
      console.error("Dashboard Load Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch full details (updates) only when a new investment is selected
  useEffect(() => {
    if (selectedInv?.id) {
      setFetchingDetails(true);
      investmentApi.getDetails(selectedInv.id).then((res) => {
        if (res.data.success) {
          setSelectedInv(res.data.data.investment);
        }
        setFetchingDetails(false);
      });
    }
  }, [selectedInv?.id]);

  const growthData = [
    { month: "Jan", value: stats.totalValue * 0.8 },
    { month: "Feb", value: stats.totalValue * 0.85 },
    { month: "Mar", value: stats.totalValue * 0.92 },
    { month: "Apr", value: stats.totalValue },
  ];

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="animate-spin text-farm-500 w-12 h-12" />
      </div>
    );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome, {user?.name?.split(" ")[0]}
          </h1>
          <p className="text-gray-400">
            Managing {stats.activeProjects} active farm assets.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="border-gray-700"
            onClick={() => setShowWithdrawModal(true)}
          >
            Cash Out
          </Button>
          <Link to="/invest">
            <Button variant="primary">New Investment</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
              <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">
                Withdrawable Balance
              </p>
              <h3 className="text-2xl font-bold text-farm-500">
                ₦{walletBalance.toLocaleString()}
              </h3>
              <div className="flex items-center text-gray-500 text-[10px] mt-2 gap-1">
                <AlertCircle size={10} /> Ready for withdrawal
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
              <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">
                Portfolio Value
              </p>
              <h3 className="text-2xl font-bold text-white">
                ₦{stats.totalValue.toLocaleString()}
              </h3>
              <div className="flex items-center text-green-500 text-[10px] mt-2 gap-1">
                <TrendingUp size={10} /> Healthy Growth
              </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
              <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider">
                Projected Profit
              </p>
              <h3 className="text-2xl font-bold text-green-400">
                ₦{stats.totalYield.toLocaleString()}
              </h3>
              <div className="flex items-center text-gray-500 text-[10px] mt-2 gap-1">
                <Clock size={10} /> Accruing...
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">
              Asset Performance
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    fontSize={10}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    fill="#22c55e33"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-gray-700/50 uppercase text-[10px] font-bold text-gray-300">
                <tr>
                  <th className="px-6 py-4">Farm Project</th>
                  <th className="px-6 py-4">Invested</th>
                  <th className="px-6 py-4">Stage</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {portfolio.map((inv) => (
                  <tr
                    key={inv.id}
                    className={`hover:bg-gray-700/30 cursor-pointer transition-all ${
                      selectedInv?.id === inv.id
                        ? "bg-gray-700/60 border-l-4 border-farm-500"
                        : ""
                    }`}
                    onClick={() => setSelectedInv(inv)}
                  >
                    <td className="px-6 py-4 text-white font-medium">
                      {inv.FarmProject?.title}
                    </td>
                    <td className="px-6 py-4">
                      ₦{parseFloat(inv.amount_invested).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] px-2 py-1 bg-farm-500/10 text-farm-500 rounded uppercase font-bold">
                        {inv.FarmProject?.current_stage || "Funding"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight size={18} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="lg:col-span-1">
          {selectedInv ? (
            <div className="space-y-6 sticky top-24 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
                <div className="relative h-32">
                  <img
                    src={`http://localhost:5000${selectedInv.FarmProject?.image_url}`}
                    className="w-full h-full object-cover"
                    alt="Farm"
                  />
                  <div
                    className={`absolute top-4 right-4 px-2 py-1 rounded text-[10px] font-bold text-white shadow-lg flex items-center gap-1 ${
                      selectedInv.FarmProject?.health_status === "excellent"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    <ShieldCheck size={12} /> Health:{" "}
                    {selectedInv.FarmProject?.health_status || "Excellent"}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-white mb-6 leading-tight">
                    {selectedInv.FarmProject?.title}
                  </h4>
                  <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">
                    Biological Lifecycle
                  </h5>
                  <div className="relative mb-8 pl-2">
                    {STAGES.map((stage, idx) => {
                      const currentIdx = STAGES.indexOf(
                        selectedInv.FarmProject?.current_stage || "funding"
                      );
                      return (
                        <div
                          key={stage}
                          className="flex items-center mb-6 last:mb-0 relative"
                        >
                          {idx < STAGES.length - 1 && (
                            <div
                              className={`absolute left-[9px] top-5 w-[2px] h-6 ${
                                idx < currentIdx ? "bg-farm-500" : "bg-gray-700"
                              }`}
                            />
                          )}
                          <div
                            className={`w-5 h-5 rounded-full z-10 flex items-center justify-center ${
                              idx <= currentIdx
                                ? "bg-farm-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
                                : "bg-gray-700"
                            }`}
                          >
                            {idx <= currentIdx ? (
                              <CheckCircle size={12} className="text-white" />
                            ) : (
                              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                            )}
                          </div>
                          <p
                            className={`ml-4 text-xs font-bold capitalize ${
                              idx <= currentIdx ? "text-white" : "text-gray-500"
                            }`}
                          >
                            {stage}{" "}
                            {idx === currentIdx && (
                              <span className="ml-2 text-[8px] text-farm-500 animate-pulse">
                                ● LIVE
                              </span>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-6 border-t border-gray-700 space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 flex items-center gap-1">
                        <MapPin size={12} /> Location
                      </span>
                      <span className="text-white">
                        {selectedInv.FarmProject?.location}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full text-xs flex items-center justify-center gap-2 border-gray-700 py-4"
                    >
                      <FileText size={16} /> Asset Certificate
                    </Button>
                    <Button
                      variant="primary"
                      className="w-full text-xs py-4"
                      onClick={() => setShowFullReport(true)}
                      disabled={fetchingDetails}
                    >
                      {fetchingDetails ? (
                        <Loader2 className="animate-spin h-4 w-4" />
                      ) : (
                        "Field Updates"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/50 rounded-xl border border-dashed border-gray-700 p-12 text-center sticky top-24">
              <Sprout size={48} className="mx-auto text-gray-700 mb-4" />
              <p className="text-gray-500 text-xs">
                Select an asset to track its growth and lifecycle.
              </p>
            </div>
          )}
        </div>
      </div>

      <WithdrawalModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        balance={walletBalance}
        onRefresh={fetchData}
      />

      {/* FULL FIELD REPORT MODAL */}
      {showFullReport && selectedInv && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[110] flex items-center justify-center p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Field Report</h3>
                <p className="text-sm text-gray-400">
                  {selectedInv.FarmProject?.title}
                </p>
              </div>
              <button
                onClick={() => setShowFullReport(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <XCircle size={28} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {fetchingDetails ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="animate-spin text-farm-500 w-10 h-10" />
                </div>
              ) : selectedInv.FarmProject?.Updates?.length > 0 ? (
                selectedInv.FarmProject.Updates.map(
                  (update: any, idx: number) => (
                    <div
                      key={idx}
                      className="relative pl-10 border-l-2 border-gray-700 last:border-0 pb-10"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-farm-500 border-4 border-gray-800 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                      <p className="text-xs font-bold text-farm-500 mb-2 uppercase tracking-widest">
                        {new Date(update.update_date).toLocaleDateString(
                          undefined,
                          { dateStyle: "long" }
                        )}
                      </p>
                      <h4 className="text-xl font-bold text-white mb-3">
                        {update.title}
                      </h4>
                      {update.image_url && (
                        <img
                          src={`http://localhost:5000${update.image_url}`}
                          className="rounded-xl mb-4 w-full h-64 object-cover border border-gray-700 shadow-lg"
                          alt="Progress Photo"
                        />
                      )}
                      <p className="text-gray-400 leading-relaxed whitespace-pre-wrap text-sm">
                        {update.content}
                      </p>
                    </div>
                  )
                )
              ) : (
                <div className="text-center py-20">
                  <ImageIcon size={56} className="mx-auto text-gray-700 mb-4" />
                  <p className="text-gray-500">
                    No detailed reports are available for this field yet.
                  </p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-700 bg-gray-900/50 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowFullReport(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
