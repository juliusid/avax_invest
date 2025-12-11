import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CreditCard,
  Lock,
  Bell,
  FileText,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  Loader2,
  Save,
  AlertTriangle,
  Check,
  Camera,
} from "lucide-react";

// ✅ Updated all imports to match component/context file extensions
import { Button } from "../components/Button.js";
import { useNotification } from "../contexts/NotificationContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx"; // ✅ New Import
import {
  updateUserProfile,
  changePassword,
  uploadKycDocument,
} from "../api/auth.js"; // ✅ New Import

// --- Initial States (Converted from TypeScript interfaces) ---
const initialUserState = {
  name: "Loading...",
  email: "",
  phone: "",
  location: "N/A",
  joinDate: "N/A",
  kycStatus: "Missing", // Backend-controlled status
  investorType: "Retail Investor",
  avatar: null,
  is2FAEnabled: false,
};

const defaultKycDocs = [
  {
    id: "gov_id",
    label: "Government ID",
    status: "Missing",
    date: null,
    icon: FileText,
  },
  {
    id: "residence",
    label: "Proof of Residence",
    status: "Missing",
    date: null,
    icon: FileText,
  },
  {
    id: "investor",
    label: "Accredited Investor Status",
    status: "Missing",
    icon: Upload,
  },
];

export const Profile = () => {
  const { user, refreshUser } = useAuth(); // Get real user and refresh function
  const { showNotification } = useNotification();

  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);

  // --- Profile State (Local state for editing, initialized from context user) ---
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(initialUserState);
  const [editForm, setEditForm] = useState(initialUserState);

  const avatarInputRef = useRef(null);

  // --- OTP Logic ---
  const [otpContext, setOtpContext] = useState({
    isOpen: false,
    type: null,
    payload: null,
  });
  const [otpCode, setOtpCode] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // --- Security State ---
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // --- KYC State ---
  const [kycDocs, setKycDocs] = useState(defaultKycDocs);
  const fileInputRef = useRef(null);
  const [uploadingDocId, setUploadingDocId] = useState(null);

  // ✅ Effect to load user data when context is ready
  useEffect(() => {
    if (user) {
      const mappedUser = {
        name: user.name || "N/A",
        email: user.email || "",
        phone: user.phone || "N/A",
        location: user.location || "N/A",
        // Format joinDate from backend timestamp if provided
        joinDate: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "N/A",
        kycStatus: user.kycStatus || "Missing",
        investorType: user.investorType || "Retail Investor",
        avatar: user.avatarUrl || null,
        is2FAEnabled: user.is2FAEnabled || false,
      };

      setProfileData(mappedUser);
      setEditForm(mappedUser);
      setTwoFactorEnabled(mappedUser.is2FAEnabled);
      setIsRefreshing(false);

      // MOCK KYC Status update based on the user's overall kycStatus
      setKycDocs((prev) =>
        prev.map((doc) => ({
          ...doc,
          status: mappedUser.kycStatus === "Verified" ? "Verified" : doc.status,
        }))
      );
    } else if (user === null) {
      setIsRefreshing(false);
    }
  }, [user]);

  // --- Handlers: Edit Profile & KYC Gating ---
  const handleEditToggle = () => {
    // 1. KYC Check
    if (!isEditing && profileData.kycStatus !== "Verified") {
      showNotification(
        "error",
        "Access Denied: You must complete KYC verification to edit your profile."
      );
      return;
    }

    if (!isEditing) {
      if (activeTab !== "general") {
        setActiveTab("general");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Cancel action: Reset form
      setEditForm(profileData);
    }

    setIsEditing(!isEditing);
  };

  const handleProfileChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAvatarClick = () => {
    if (isEditing && avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, avatar: reader.result }); // Set preview URL
      };
      reader.readAsDataURL(file);
      showNotification(
        "info",
        'New profile picture selected. Click "Save Changes" to upload it.'
      );
    }
  };

  const handleProfileSave = async () => {
    // 2. Critical Info Check (Email/Phone)
    const isCriticalChange =
      editForm.email !== profileData.email ||
      editForm.phone !== profileData.phone;

    if (isCriticalChange) {
      setOtpContext({
        isOpen: true,
        type: "profile_update",
        payload: editForm,
      });
      return;
    }

    // ✅ Normal Save (Non-critical) - API Call
    setIsLoading(true);
    try {
      const updatePayload = {
        name: editForm.name,
        location: editForm.location,
        avatarUrl: editForm.avatar,
      };

      const response = await updateUserProfile(updatePayload);

      if (response.success) {
        await refreshUser();
        setProfileData(editForm);
        setIsEditing(false);
        showNotification("success", "Profile updated successfully!");
      } else {
        throw new Error(response.message || "Failed to save profile.");
      }
    } catch (error) {
      showNotification(
        "error",
        error.message || "An error occurred while saving profile."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handlers: Password ---
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      showNotification("error", "New passwords do not match.");
      return;
    }

    // 3. Password OTP Trigger
    setIsPasswordModalOpen(false);
    setOtpContext({
      isOpen: true,
      type: "password_change",
      payload: passwordForm,
    });
  };

  // --- Handlers: OTP Verification ---
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    if (otpCode.length < 6) return;

    setIsVerifyingOtp(true);

    try {
      let response;
      if (otpContext.type === "profile_update") {
        // 4. API Call: Final Profile Update (now with verified email/phone)
        const updatePayload = {
          ...otpContext.payload,
          otpCode: otpCode, // Pass OTP for final server check
        };

        response = await updateUserProfile(updatePayload);

        if (response.success) {
          await refreshUser();
          setProfileData(otpContext.payload);
          setIsEditing(false);
          showNotification(
            "success",
            "Identity Verified. Contact details updated."
          );
        } else {
          throw new Error(
            response.message || "Profile update failed after verification."
          );
        }
      } else if (otpContext.type === "password_change") {
        // 5. API Call: Change Password
        const { current, new: newPassword } = otpContext.payload;

        response = await changePassword(current, newPassword, otpCode);

        if (response.success) {
          setPasswordForm({ current: "", new: "", confirm: "" });
          showNotification(
            "success",
            "Identity Verified. Password changed successfully."
          );
        } else {
          throw new Error(
            response.message || "Password change failed after verification."
          );
        }
      }

      // Success: Reset OTP State
      setOtpContext({ isOpen: false, type: null, payload: null });
      setOtpCode("");
    } catch (error) {
      showNotification(
        "error",
        error.message || "An error occurred during verification/save."
      );
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // --- Handlers: KYC ---
  const triggerFileUpload = (docId) => {
    setUploadingDocId(docId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0] && uploadingDocId) {
      const file = e.target.files[0];
      const docId = uploadingDocId;
      setIsLoading(true);

      try {
        // 6. API Call: Upload KYC Document
        const response = await uploadKycDocument(docId, file);

        if (response.success) {
          setKycDocs((prev) =>
            prev.map((doc) =>
              doc.id === docId
                ? {
                    ...doc,
                    status: "Pending",
                    date: new Date().toLocaleDateString(),
                  }
                : doc
            )
          );
          showNotification(
            "success",
            "Document uploaded. Status: Pending Review."
          );
        } else {
          throw new Error(response.message || "Document upload failed.");
        }
      } catch (error) {
        showNotification(
          "error",
          error.message || "An error occurred during file upload."
        );
      } finally {
        setIsLoading(false);
        setUploadingDocId(null);
      }
    }
  };

  // --- Render Helpers ---
  const renderKycStatusBadge = (status) => {
    switch (status) {
      case "Verified":
        return (
          <span className="text-xs font-bold text-green-500 uppercase px-2 py-1 bg-green-500/10 rounded border border-green-500/20">
            Verified
          </span>
        );
      case "Pending":
        return (
          <span className="text-xs font-bold text-yellow-500 uppercase px-2 py-1 bg-yellow-500/10 rounded border border-yellow-500/20">
            Pending Review
          </span>
        );
      case "Missing":
        return (
          <span className="text-xs font-bold text-red-500 uppercase px-2 py-1 bg-red-500/10 rounded border border-red-500/20">
            Missing
          </span>
        );
      default:
        return null;
    }
  };

  const displayUser = isEditing ? editForm : profileData;
  const isKycVerified = profileData.kycStatus === "Verified";

  // Show loading spinner while fetching user data
  if (isRefreshing) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="animate-spin text-farm-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden mb-8 shadow-xl">
          <div className="h-32 bg-gradient-to-r from-farm-600 to-green-400"></div>
          <div className="px-8 pb-8 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4 gap-6">
              {/* Avatar Section */}
              <div className="relative group">
                <div
                  className={`w-24 h-24 rounded-2xl bg-gray-700 border-4 border-gray-800 shadow-lg flex items-center justify-center text-gray-400 overflow-hidden relative ${
                    isEditing ? "cursor-pointer hover:border-farm-500" : ""
                  }`}
                  onClick={handleAvatarClick}
                >
                  {displayUser.avatar ? (
                    <img
                      src={displayUser.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={40} />
                  )}

                  {/* Edit Overlay */}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="text-white" size={24} />
                    </div>
                  )}
                </div>

                {/* Hidden Avatar Input */}
                <input
                  type="file"
                  ref={avatarInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />

                {isKycVerified && (
                  <div
                    className="absolute -bottom-2 -right-2 bg-green-500 text-gray-900 p-1 rounded-full border-4 border-gray-800"
                    title="Verified Account"
                  >
                    <CheckCircle
                      size={16}
                      fill="currentColor"
                      className="text-white"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white">
                  {profileData.name}
                </h1>
                <div className="flex items-center gap-4 text-gray-400 mt-1 text-sm">
                  <span>Member since {profileData.joinDate}</span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  <span className="text-farm-500 font-medium">
                    {profileData.investorType}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                {!isEditing ? (
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={handleEditToggle}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      className="text-sm text-red-400 hover:text-red-300"
                      onClick={handleEditToggle}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      className="text-sm"
                      onClick={handleProfileSave}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Save size={16} className="mr-2" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden sticky top-24">
              <nav className="flex flex-col p-2 space-y-1">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "general"
                      ? "bg-farm-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <User size={18} /> General Info
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "security"
                      ? "bg-farm-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <ShieldCheck size={18} /> Security & KYC
                </button>
                <button
                  onClick={() => setActiveTab("billing")}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "billing"
                      ? "bg-farm-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <CreditCard size={18} /> Payment Methods
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Info Tab */}
            {activeTab === "general" && (
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">
                    Personal Information
                  </h2>
                  {isEditing && (
                    <span className="text-xs text-farm-500 font-bold uppercase tracking-wider animate-pulse">
                      Editing Mode
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleProfileChange}
                        className="w-full bg-gray-900 border border-farm-500 rounded-lg p-3 text-white focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 text-gray-300">
                        <User size={18} className="text-gray-500" />
                        {profileData.name}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Email Address
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleProfileChange}
                          className="w-full bg-gray-900 border border-farm-500 rounded-lg p-3 text-white focus:outline-none"
                        />
                        {editForm.email !== profileData.email && (
                          <div
                            className="absolute right-3 top-3 text-yellow-500"
                            title="Requires Verification"
                          >
                            <AlertTriangle size={16} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 text-gray-300">
                        <Mail size={18} className="text-gray-500" />
                        {profileData.email}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={editForm.phone}
                          onChange={handleProfileChange}
                          className="w-full bg-gray-900 border border-farm-500 rounded-lg p-3 text-white focus:outline-none"
                        />
                        {editForm.phone !== profileData.phone && (
                          <div
                            className="absolute right-3 top-3 text-yellow-500"
                            title="Requires Verification"
                          >
                            <AlertTriangle size={16} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 text-gray-300">
                        <Phone size={18} className="text-gray-500" />
                        {profileData.phone}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={editForm.location}
                        onChange={handleProfileChange}
                        className="w-full bg-gray-900 border border-farm-500 rounded-lg p-3 text-white focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700 text-gray-300">
                        <MapPin size={18} className="text-gray-500" />
                        {profileData.location}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-900 rounded-lg text-gray-400">
                          <Bell size={18} />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            Investment Updates
                          </p>
                          <p className="text-xs text-gray-500">
                            Get notified about ROI changes and dividends.
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-farm-500"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-900 rounded-lg text-gray-400">
                          <Mail size={18} />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            New Opportunities
                          </p>
                          <p className="text-xs text-gray-500">
                            Emails about new farm listings.
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-farm-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* KYC Section */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Identity Verification (KYC)
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">
                        Required to invest in regulated agricultural assets.
                      </p>
                    </div>
                    {isKycVerified && (
                      <div className="flex items-start gap-2 p-2 px-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <CheckCircle
                          className="text-green-500 flex-shrink-0 mt-0.5"
                          size={16}
                        />
                        <div>
                          <h4 className="text-green-500 text-sm font-bold">
                            Identity Verified
                          </h4>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />

                  <div className="space-y-4">
                    {kycDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className={`flex items-center justify-between p-4 bg-gray-900 rounded-lg border ${
                          doc.status === "Missing"
                            ? "border-dashed border-gray-600 hover:border-farm-500"
                            : "border-gray-700"
                        } transition-colors`}
                      >
                        <div className="flex items-center gap-3">
                          <doc.icon
                            className={`${
                              doc.status === "Verified"
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                            size={20}
                          />
                          <div>
                            <p className="text-white font-medium">
                              {doc.label}
                            </p>
                            <p className="text-xs text-gray-500">
                              {doc.date
                                ? `Updated on ${doc.date}`
                                : "Document required"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {renderKycStatusBadge(doc.status)}
                          {(doc.status === "Missing" ||
                            doc.status === "Rejected") && (
                            <Button
                              variant="outline"
                              className="text-xs py-1.5 h-auto"
                              onClick={() => triggerFileUpload(doc.id)}
                              disabled={isLoading}
                            >
                              <Upload size={14} className="mr-1" /> Upload
                            </Button>
                          )}
                          {doc.status === "Verified" && (
                            <Button
                              variant="ghost"
                              className="text-xs py-1.5 h-auto text-gray-500 hover:text-white"
                              onClick={() => triggerFileUpload(doc.id)}
                              disabled={isLoading}
                            >
                              Update
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Login Security Section */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-white mb-6">
                    Login Security
                  </h2>
                  <div className="space-y-4">
                    {/* Password Change */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">Password</p>
                        <p className="text-xs text-gray-500">
                          Last changed 3 months ago
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="text-xs"
                        onClick={() => setIsPasswordModalOpen(true)}
                      >
                        Change Password
                      </Button>
                    </div>

                    {/* 2FA Toggle */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                      <div>
                        <p className="text-white font-medium">
                          Two-Factor Authentication
                        </p>
                        <p className="text-xs text-gray-500">
                          Secure your account with 2FA (SMS/Email)
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={twoFactorEnabled}
                          onChange={() => {
                            // TODO: Implement real API call to toggle 2FA
                            const new2FAState = !twoFactorEnabled;
                            setTwoFactorEnabled(new2FAState);
                            showNotification(
                              "info",
                              new2FAState
                                ? "2FA Enabled successfully (MOCK)"
                                : "2FA Disabled (MOCK)"
                            );
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-farm-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Methods Tab (No API changes required) */}
            {activeTab === "billing" && (
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">
                    Linked Accounts
                  </h2>
                  <Button variant="primary" className="text-sm">
                    Add New Method
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-900 rounded-xl border border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center border border-gray-600">
                        <span className="font-bold text-gray-400 text-xs tracking-wider">
                          VISA
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          Chase Sapphire •••• 4242
                        </p>
                        <p className="text-xs text-gray-500">Expires 12/26</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded border border-gray-700">
                      Default
                    </span>
                  </div>

                  <div className="p-4 bg-gray-900 rounded-xl border border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center border border-gray-600">
                        <span className="font-bold text-gray-400 text-xs tracking-wider">
                          BANK
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          Wells Fargo Checking •••• 8891
                        </p>
                        <p className="text-xs text-gray-500">
                          Direct Deposit Enabled
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Transaction History
                  </h3>
                  <div className="text-center py-8 text-gray-500 bg-gray-900/50 rounded-lg border border-gray-700 border-dashed">
                    <AlertCircle
                      className="mx-auto mb-2 opacity-50"
                      size={24}
                    />
                    <p>No recent transactions in the last 30 days.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Change Password Modal --- */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPasswordModalOpen(false)}
          />
          <div className="relative bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-6">
              Change Password
            </h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-farm-500 focus:outline-none"
                  value={passwordForm.current}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      current: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-farm-500 focus:outline-none"
                  value={passwordForm.new}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, new: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400 uppercase">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-farm-500 focus:outline-none"
                  value={passwordForm.confirm}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirm: e.target.value,
                    })
                  }
                />
              </div>
              <Button
                variant="primary"
                className="w-full mt-2"
                disabled={isLoading}
              >
                Continue
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* --- OTP Verification Modal --- */}
      {otpContext.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() =>
              setOtpContext({ isOpen: false, type: null, payload: null })
            }
          />
          <div className="relative bg-gray-900 border border-gray-700 rounded-xl w-full max-w-sm p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <button
              onClick={() =>
                setOtpContext({ isOpen: false, type: null, payload: null })
              }
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-blue-500" size={32} />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Verification Required
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {otpContext.type === "password_change"
                ? "To change your password, please enter the code sent to your email."
                : "You are changing sensitive contact info. Please enter the code sent to your current email."}
            </p>

            <form onSubmit={handleOtpVerify}>
              <input
                type="text"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="w-full bg-gray-800 border-b-2 border-gray-600 text-center text-3xl font-bold tracking-[0.5em] py-4 text-white focus:outline-none focus:border-farm-500 mb-6"
              />

              <Button
                variant="primary"
                className="w-full"
                disabled={isVerifyingOtp || otpCode.length < 6}
              >
                {isVerifyingOtp ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Verify & Save"
                )}
              </Button>
            </form>

            <p className="text-xs text-gray-500 mt-4">
              Code sent to {profileData.email}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-bold">
              MOCK CODE: '123456'
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
