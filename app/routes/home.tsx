import React, { useState, useEffect, useRef } from "react";
import {
  Package,
  MapPin,
  User,
  Home,
  Clock,
  MessageSquare,
  MessageCircle,
  CreditCard,
  Phone,
  Mail,
  ChevronRight,
  Send,
  X,
  Star,
  CheckCircle,
  Wrench,
  Wind,
  PlugZap,
  Settings,
  HelpCircle,
  Bell,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  ArrowLeft,
  Navigation,
  Map,
  Calendar,
  DollarSign,
  Shield,
  Lock,
  LogOut,
  Camera,
  Image,
  FileText,
  Download,
  Share,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  MoreVertical,
} from "lucide-react";

export default function SugoApp() {
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [userType, setUserType] = useState("customer");
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [currentDelivery, setCurrentDelivery] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<
    "delivery" | "plumbing" | "aircon" | "electrician"
  >("delivery");
  const [workerService, setWorkerService] = useState<
    "delivery" | "plumbing" | "aircon" | "electrician"
  >("delivery");
  const [showCompleteConfirmation, setShowCompleteConfirmation] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showDocumentPicker, setShowDocumentPicker] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showOfflineMode, setShowOfflineMode] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [currentRating, setCurrentRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [orderStatus, setOrderStatus] = useState("pending");
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "cash",
      name: "Cash on Delivery",
      icon: DollarSign,
      enabled: true,
      isDefault: true,
      details: null,
    },
    {
      id: "gcash",
      name: "GCash",
      icon: CreditCard,
      enabled: true,
      isDefault: false,
      details: { number: "**** 1234", type: "mobile" },
    },
    {
      id: "qrph",
      name: "QRPH",
      icon: CreditCard,
      enabled: true,
      isDefault: false,
      details: { number: "**** 5678", type: "qr" },
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      enabled: false,
      isDefault: false,
      details: null,
    },
  ]);
  const [paymentValidation, setPaymentValidation] = useState({
    isValid: true,
    error: "",
  });
  const [orderTotal, setOrderTotal] = useState({
    baseAmount: 80,
    serviceFee: 5,
    total: 85,
    currency: "PHP",
  });
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "gcash",
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [trackingLocation, setTrackingLocation] = useState({ lat: 0, lng: 0 });
  const [userSettings, setUserSettings] = useState({
    notifications: true,
    locationServices: true,
    darkMode: false,
    language: "en",
    currency: "PHP",
    autoAccept: false,
    maxDistance: 10,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    dateRange: "all",
    status: "all",
    service: "all",
    priceRange: "all",
  });
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);
  const [earnings, setEarnings] = useState({
    today: 0,
    week: 0,
    month: 0,
    total: 0,
  });
  const [userProfile, setUserProfile] = useState({
    name: "Juan Dela Cruz",
    phone: "+63 912 345 6789",
    email: "juan@email.com",
    avatar: null,
    rating: 4.8,
    totalOrders: 47,
    joinDate: "2023-01-15",
    verified: true,
  });

  // Utility functions
  const showToastMessage = (message: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogout = () => {
    setCurrentScreen("login");
    setUserType("customer");
    setCurrentOrder(null);
    setCurrentDelivery(null);
    setShowLogoutConfirm(false);
    showToastMessage("Logged out successfully", "success");
  };

  const handleDeleteAccount = () => {
    setCurrentScreen("login");
    setUserType("customer");
    setCurrentOrder(null);
    setCurrentDelivery(null);
    setShowDeleteAccount(false);
    showToastMessage("Account deleted successfully", "success");
  };

  const handleRatingSubmit = () => {
    showToastMessage("Thank you for your rating!", "success");
    setShowRatingModal(false);
    setCurrentRating(0);
    setRatingComment("");
  };

  const handlePaymentSubmit = () => {
    const selectedMethod = paymentMethods.find(method => method.id === selectedPaymentMethod);
    
    if (!selectedMethod) {
      setPaymentValidation({ isValid: false, error: "Please select a payment method" });
      return;
    }

    if (!selectedMethod.enabled) {
      setPaymentValidation({ isValid: false, error: "This payment method is not available" });
      return;
    }

    // Process payment based on method
    if (selectedMethod.id === "cash") {
      processCashPayment();
    } else if (selectedMethod.id === "gcash" || selectedMethod.id === "qrph") {
      processDigitalPayment(selectedMethod);
    } else if (selectedMethod.id === "card") {
      processCardPayment();
    }
  };

  const processCashPayment = () => {
    const payment = {
      id: `PAY-${Date.now()}`,
      method: "cash",
      amount: orderTotal.total,
      status: "pending",
      timestamp: new Date().toISOString(),
      orderId: currentOrder?.id || "ORD-001",
    };
    
    setPaymentHistory(prev => [payment, ...prev]);
    showToastMessage("Order placed! Payment will be collected on delivery.", "success");
    setShowPaymentModal(false);
    setPaymentValidation({ isValid: true, error: "" });
    
    // Create the order after payment
    createOrderAfterPayment();
  };

  const processDigitalPayment = (method: any) => {
    const payment = {
      id: `PAY-${Date.now()}`,
      method: method.id,
      amount: orderTotal.total,
      status: "processing",
      timestamp: new Date().toISOString(),
      orderId: currentOrder?.id || "ORD-001",
      details: method.details,
    };
    
    setPaymentHistory(prev => [payment, ...prev]);
    showToastMessage(`Redirecting to ${method.name}...`, "info");
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentHistory(prev => 
        prev.map(p => 
          p.id === payment.id 
            ? { ...p, status: "completed" }
            : p
        )
      );
      showToastMessage("Payment successful!", "success");
      setShowPaymentModal(false);
      setPaymentValidation({ isValid: true, error: "" });
      
      // Create the order after payment
      createOrderAfterPayment();
    }, 2000);
  };

  const processCardPayment = () => {
    // Validate card details
    if (!newPaymentMethod.number || !newPaymentMethod.expiry || !newPaymentMethod.cvv) {
      setPaymentValidation({ isValid: false, error: "Please fill in all card details" });
      return;
    }

    const payment = {
      id: `PAY-${Date.now()}`,
      method: "card",
      amount: orderTotal.total,
      status: "processing",
      timestamp: new Date().toISOString(),
      orderId: currentOrder?.id || "ORD-001",
      details: {
        number: `****${newPaymentMethod.number.slice(-4)}`,
        expiry: newPaymentMethod.expiry,
      },
    };
    
    setPaymentHistory(prev => [payment, ...prev]);
    showToastMessage("Processing card payment...", "info");
    
    // Simulate card processing
    setTimeout(() => {
      setPaymentHistory(prev => 
        prev.map(p => 
          p.id === payment.id 
            ? { ...p, status: "completed" }
            : p
        )
      );
      showToastMessage("Payment successful!", "success");
      setShowPaymentModal(false);
      setPaymentValidation({ isValid: true, error: "" });
      
      // Create the order after payment
      createOrderAfterPayment();
    }, 3000);
  };

  const createOrderAfterPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (selectedService === "delivery") {
        setCurrentOrder({
          id: `ORD-${Date.now()}`,
          item: "Delivery",
          receiver: "John Doe",
          contact: "+1 234 567 8900",
          rider: "Mike Johnson",
          status: "in_transit",
          paymentMethod: selectedPaymentMethod,
          total: orderTotal.total,
        });
      } else {
        setCurrentOrder({
          id: `SRV-${Date.now()}`,
          item: selectedService === "plumbing" ? "Plumbing" : selectedService === "aircon" ? "Aircon Repair" : "Electrician",
          receiver: "Home Service",
          contact: "+1 234 567 8900",
          rider: "Assigned Pro",
          status: "in_transit",
          paymentMethod: selectedPaymentMethod,
          total: orderTotal.total,
        });
      }
      setCurrentScreen("home");
    }, 2000);
  };

  const addPaymentMethod = () => {
    if (!newPaymentMethod.name || !newPaymentMethod.number) {
      showToastMessage("Please fill in all required fields", "error");
      return;
    }

    const newMethod = {
      id: `${newPaymentMethod.type}-${Date.now()}`,
      name: newPaymentMethod.name,
      icon: CreditCard,
      enabled: true,
      isDefault: false,
      details: {
        number: `****${newPaymentMethod.number.slice(-4)}`,
        type: newPaymentMethod.type,
      },
    };

    setPaymentMethods(prev => [...prev, newMethod]);
    setShowAddPaymentMethod(false);
    setNewPaymentMethod({ type: "gcash", name: "", number: "", expiry: "", cvv: "" });
    showToastMessage("Payment method added successfully!", "success");
  };

  const setDefaultPaymentMethod = (methodId: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    );
    setSelectedPaymentMethod(methodId);
    showToastMessage("Default payment method updated", "success");
  };

  const removePaymentMethod = (methodId: string) => {
    if (paymentMethods.find(m => m.id === methodId)?.isDefault) {
      showToastMessage("Cannot remove default payment method", "error");
      return;
    }
    
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
    showToastMessage("Payment method removed", "success");
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    showToastMessage(isOnline ? "You're now offline" : "You're now online", "info");
  };

  // Function to complete current order/delivery
  const completeOrder = () => {
    if (currentOrder) {
      setCurrentOrder(null);
      setShowChat(false);
      setCurrentScreen("orders");
      setShowRatingModal(true);
    }
    if (currentDelivery) {
      setCurrentDelivery(null);
      setShowChat(false);
      setCurrentScreen("deliveries");
      setShowRatingModal(true);
    }
    setShowCompleteConfirmation(false);
    showToastMessage("Order completed successfully!", "success");
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "rider",
      text: "Hello! I have picked up your order.",
      time: "2:30 PM",
    },
    {
      id: 2,
      sender: "rider",
      text: "On my way to delivery location.",
      time: "2:31 PM",
    },
    {
      id: 3,
      sender: "customer",
      text: "Thank you! How long will it take?",
      time: "2:32 PM",
    },
    {
      id: 4,
      sender: "rider",
      text: "Around 10-15 minutes. Traffic is light.",
      time: "2:33 PM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Addresses state (customer)
  type SavedAddress = {
    id: string;
    label: string;
    address: string;
    landmark?: string;
    isDefault?: boolean;
  };
  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: "addr-home",
      label: "Home",
      address: "123 Main Street, Barangay Lahug, Cebu City, Cebu 6000",
      landmark: "Near SM City Cebu",
      isDefault: true,
    },
    {
      id: "addr-office",
      label: "Office",
      address: "456 IT Park, Cebu Business Park, Cebu City, Cebu 6000",
      landmark: "Near Ayala Center Cebu",
    },
  ]);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [viewingAddress, setViewingAddress] = useState<SavedAddress | null>(null);

  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("login");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  useEffect(() => {
    if (showChat) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showChat]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
        id: messages.length + 1,
          sender: "customer",
        text: newMessage,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
    }
  };

  // Splash Screen
  const SplashScreen = () => (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex flex-col items-center justify-center">
      <div className="animate-bounce">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl mb-6">
          <Package className="w-16 h-16 text-red-600" />
        </div>
      </div>
      <h1 className="text-6xl font-bold text-white mb-2 animate-pulse">SUGO</h1>
      <p className="text-red-100 text-lg">Fast & Reliable Delivery</p>
      <div className="mt-12 flex space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div
          className="w-2 h-2 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-white rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );

  // Login Screen
  const LoginScreen = () => (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-5xl font-bold text-red-600 mb-2">SUGO</h1>
          <p className="text-gray-500">Welcome back!</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800"
          />
          <button 
            onClick={() => setCurrentScreen("dashboard")}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Login
          </button>
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={() => setCurrentScreen("signup")}
            className="text-red-600 font-medium"
          >
            Sign up with OTP →
          </button>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => setUserType("customer")}
            className={`flex-1 py-2 rounded-lg font-medium transition ${userType === "customer" ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600"}`}
          >
            Customer
          </button>
          <button
            onClick={() => setUserType("rider")}
            className={`flex-1 py-2 rounded-lg font-medium transition ${userType === "rider" ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600"}`}
          >
            Worker
          </button>
        </div>

        {userType === "rider" && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Select your service</p>
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => setWorkerService("delivery")} className={`p-2 rounded-lg border ${workerService === "delivery" ? "border-red-400 bg-red-50 text-red-600" : "border-gray-200 text-gray-600"}`}>
                <Package className="w-5 h-5 mx-auto mb-1" />
                <span className="text-[10px]">Delivery</span>
              </button>
              <button onClick={() => setWorkerService("plumbing")} className={`p-2 rounded-lg border ${workerService === "plumbing" ? "border-blue-400 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-600"}`}>
                <Wrench className="w-5 h-5 mx-auto mb-1" />
                <span className="text-[10px]">Plumbing</span>
              </button>
              <button onClick={() => setWorkerService("aircon")} className={`p-2 rounded-lg border ${workerService === "aircon" ? "border-teal-400 bg-teal-50 text-teal-600" : "border-gray-200 text-gray-600"}`}>
                <Wind className="w-5 h-5 mx-auto mb-1" />
                <span className="text-[10px]">Aircon</span>
              </button>
              <button onClick={() => setWorkerService("electrician")} className={`p-2 rounded-lg border ${workerService === "electrician" ? "border-amber-400 bg-amber-50 text-amber-600" : "border-gray-200 text-gray-600"}`}>
                <PlugZap className="w-5 h-5 mx-auto mb-1" />
                <span className="text-[10px]">Electrician</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Signup Screen
  const SignupScreen = () => (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500">Enter your details to sign up</p>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800"
          />
          <button className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition">
            Send OTP
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-600 text-center mb-4">
            Enter OTP sent to your phone
          </p>
          <div className="flex gap-3 justify-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none text-gray-800"
              />
            ))}
          </div>
        </div>

        <button 
          onClick={() => setCurrentScreen("dashboard")}
          className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition mt-6"
        >
          Verify & Sign Up
        </button>

        <div className="text-center mt-6">
          <button 
            onClick={() => setCurrentScreen("login")}
            className="text-red-600 font-medium"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );


  // Loading Screen
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm mx-4 text-center">
        <div className="animate-spin w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-8 h-8 text-red-600" />
            </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Finding Rider</h3>
        <p className="text-gray-600 mb-6">
          Please wait while we match you with the best available rider...
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              Searching nearby riders
            </span>
              </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div
              className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <span className="text-sm text-gray-600">
              Calculating best route
            </span>
            </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div
              className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <span className="text-sm text-gray-600">
              Confirming delivery details
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Complete Confirmation Dialog
  const CompleteConfirmationDialog = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Complete {currentOrder ? "Order" : "Delivery"}?
          </h3>
          <p className="text-sm text-gray-600">
            {currentOrder 
              ? "Are you sure you want to mark this order as delivered?" 
              : "Are you sure you want to complete this delivery?"
            }
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={completeOrder}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Yes, Complete
          </button>
          <button
            onClick={() => setShowCompleteConfirmation(false)}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Rating Modal
  const RatingModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Rate Your Experience</h3>
          <p className="text-sm text-gray-600">How was your {currentOrder ? "delivery" : "service"} experience?</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setCurrentRating(star)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                  star <= currentRating
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <Star className={`w-6 h-6 ${star <= currentRating ? "fill-current" : ""}`} />
              </button>
            ))}
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Comments (optional)</label>
            <textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              placeholder="Tell us about your experience..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400 resize-none"
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRatingSubmit}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Submit Rating
            </button>
            <button
              onClick={() => setShowRatingModal(false)}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Payment Modal
  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
          <button
            onClick={() => setShowPaymentModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Payment Methods */}
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition ${
                  selectedPaymentMethod === method.id
                    ? "border-red-500 bg-red-50"
                    : method.enabled
                    ? "border-gray-200 hover:border-red-300"
                    : "border-gray-100 bg-gray-50 opacity-50"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPaymentMethod === method.id}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  disabled={!method.enabled}
                  className="w-4 h-4 text-red-600"
                />
                <method.icon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{method.name}</span>
                    {method.isDefault && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                    {!method.enabled && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  {method.details && (
                    <p className="text-sm text-gray-500">{method.details.number}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDefaultPaymentMethod(method.id);
                    }}
                    className="text-gray-400 hover:text-red-600 transition"
                    disabled={method.isDefault}
                  >
                    <Star className={`w-4 h-4 ${method.isDefault ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </button>
                  {!method.isDefault && method.id !== "cash" && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removePaymentMethod(method.id);
                      }}
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </label>
            ))}
          </div>

          {/* Add Payment Method Button */}
          <button
            onClick={() => setShowAddPaymentMethod(true)}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-red-300 hover:text-red-600 transition flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Payment Method
          </button>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Payment Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Amount</span>
                <span className="text-gray-800">₱{orderTotal.baseAmount}.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Service Fee</span>
                <span className="text-gray-800">₱{orderTotal.serviceFee}.00</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Total Amount</span>
                  <span className="text-lg font-bold text-red-600">₱{orderTotal.total}.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {!paymentValidation.isValid && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600">{paymentValidation.error}</span>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePaymentSubmit}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!paymentValidation.isValid}
          >
            {selectedPaymentMethod === "cash" ? "Place Order" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );

  // Order Tracking Modal
  const OrderTrackingModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Track Your Order</h3>
          <button
            onClick={() => setShowOrderTracking(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Order #{currentOrder?.id || "ORD-001"}</p>
                <p className="text-sm text-gray-600">Estimated arrival: 15 mins</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Navigation className="w-4 h-4" />
              <span>Rider is on the way</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { status: "confirmed", title: "Order Confirmed", time: "2:30 PM", completed: true },
              { status: "preparing", title: "Preparing Order", time: "2:32 PM", completed: true },
              { status: "picked", title: "Order Picked Up", time: "2:45 PM", completed: true },
              { status: "delivering", title: "Out for Delivery", time: "2:50 PM", completed: false },
              { status: "delivered", title: "Delivered", time: "3:05 PM", completed: false },
            ].map((step, index) => (
              <div key={step.status} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step.completed ? "bg-green-500" : "bg-gray-200"
                }`}>
                  {step.completed && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    step.completed ? "text-gray-800" : "text-gray-500"
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400">{step.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
              <Phone className="w-4 h-4 inline mr-2" />
              Call Rider
            </button>
            <button className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Settings Modal
  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
          <button
            onClick={() => setShowSettings(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Notifications</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Push Notifications</span>
                <div className={`w-12 h-6 rounded-full relative ${
                  userSettings.notifications ? "bg-red-500" : "bg-gray-300"
                }`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    userSettings.notifications ? "right-1" : "left-1"
                  }`}></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email Notifications</span>
                <div className={`w-12 h-6 rounded-full relative ${
                  userSettings.notifications ? "bg-red-500" : "bg-gray-300"
                }`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                    userSettings.notifications ? "right-1" : "left-1"
                  }`}></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Location</h4>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Location Services</span>
              <div className={`w-12 h-6 rounded-full relative ${
                userSettings.locationServices ? "bg-red-500" : "bg-gray-300"
              }`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                  userSettings.locationServices ? "right-1" : "left-1"
                }`}></div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Appearance</h4>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Dark Mode</span>
              <div className={`w-12 h-6 rounded-full relative ${
                userSettings.darkMode ? "bg-red-500" : "bg-gray-300"
              }`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                  userSettings.darkMode ? "right-1" : "left-1"
                }`}></div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Account</h4>
            <div className="space-y-3">
              <button
                onClick={() => setShowEditProfile(true)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="text-gray-700">Edit Profile</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => setShowChangePassword(true)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="text-gray-700">Change Password</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="text-gray-700">Logout</span>
                <LogOut className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Support</h4>
            <div className="space-y-3">
              <button
                onClick={() => setShowHelp(true)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="text-gray-700">Help & Support</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <span className="text-gray-700">Privacy Policy</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <span className="text-gray-700">Terms of Service</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Toast Notification
  const ToastNotification = () => (
    <div className={`fixed top-4 left-4 right-4 z-50 transform transition-all duration-300 ${
      showToast ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    }`}>
      <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-500">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-red-600" />
          </div>
          <p className="text-gray-800 font-medium">{toastMessage}</p>
        </div>
      </div>
    </div>
  );

  // Help & Support Modal
  const HelpModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Help & Support</h3>
          <button
            onClick={() => setShowHelp(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-red-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Contact Support</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-600">+63 2 1234 5678</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-600">support@sugo.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Frequently Asked Questions</h4>
            <div className="space-y-3">
              {[
                "How do I track my order?",
                "What payment methods do you accept?",
                "How do I cancel an order?",
                "What are your delivery areas?",
                "How do I become a rider?",
              ].map((faq, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-sm text-gray-700">{faq}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 float-right" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Report an Issue</h4>
            <button
              onClick={() => setShowReportModal(true)}
              className="w-full p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              Report Problem
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Notifications Modal
  const NotificationsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <button
            onClick={() => setShowNotifications(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 1,
              title: "Order Confirmed",
              message: "Your order #ORD-001 has been confirmed",
              time: "2:30 PM",
              unread: true,
            },
            {
              id: 2,
              title: "Rider Assigned",
              message: "Mike Johnson is on the way to pick up your order",
              time: "2:32 PM",
              unread: true,
            },
            {
              id: 3,
              title: "Order Picked Up",
              message: "Your order has been picked up and is on the way",
              time: "2:45 PM",
              unread: false,
            },
            {
              id: 4,
              title: "Payment Received",
              message: "Payment of ₱85.00 has been received",
              time: "3:05 PM",
              unread: false,
            },
          ].map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border ${
                notification.unread
                  ? "bg-red-50 border-red-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.unread ? "bg-red-500" : "bg-gray-300"
                }`}></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Search Modal
  const SearchModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, riders, or locations..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800"
            />
          </div>
          <button
            onClick={() => setShowSearch(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">Recent Searches</h4>
          {["SM City Cebu", "IT Park", "Ayala Center", "Robinsons Fuente"].map((search, index) => (
            <button
              key={index}
              className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="text-sm text-gray-700">{search}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Logout Confirmation Modal
  const LogoutConfirmationModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Logout</h3>
          <p className="text-sm text-gray-600">Are you sure you want to logout?</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => setShowLogoutConfirm(false)}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Delete Account Confirmation Modal
  const DeleteAccountModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Account</h3>
          <p className="text-sm text-gray-600">
            This action cannot be undone. All your data will be permanently deleted.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
          >
            Yes, Delete Account
          </button>
          <button
            onClick={() => setShowDeleteAccount(false)}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Add Payment Method Modal
  const AddPaymentMethodModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Add Payment Method</h3>
          <button
            onClick={() => setShowAddPaymentMethod(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Payment Type Selection */}
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Payment Type</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "gcash", name: "GCash", icon: CreditCard },
                { id: "qrph", name: "QRPH", icon: CreditCard },
                { id: "card", name: "Card", icon: CreditCard },
                { id: "bank", name: "Bank", icon: CreditCard },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setNewPaymentMethod(prev => ({ ...prev, type: type.id }))}
                  className={`p-3 border-2 rounded-xl text-center transition ${
                    newPaymentMethod.type === type.id
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-200 text-gray-600 hover:border-red-300"
                  }`}
                >
                  <type.icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Details Form */}
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Name on Card/Account</label>
              <input
                type="text"
                value={newPaymentMethod.name}
                onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                {newPaymentMethod.type === "card" ? "Card Number" : "Account Number"}
              </label>
              <input
                type="text"
                value={newPaymentMethod.number}
                onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, number: e.target.value }))}
                placeholder={newPaymentMethod.type === "card" ? "1234 5678 9012 3456" : "Enter account number"}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800"
              />
            </div>

            {newPaymentMethod.type === "card" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Expiry Date</label>
                  <input
                    type="text"
                    value={newPaymentMethod.expiry}
                    onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, expiry: e.target.value }))}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">CVV</label>
                  <input
                    type="text"
                    value={newPaymentMethod.cvv}
                    onChange={(e) => setNewPaymentMethod(prev => ({ ...prev, cvv: e.target.value }))}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="setAsDefault"
                className="w-4 h-4 text-red-600"
              />
              <label htmlFor="setAsDefault" className="text-sm text-gray-600">
                Set as default payment method
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={addPaymentMethod}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Add Payment Method
            </button>
            <button
              onClick={() => setShowAddPaymentMethod(false)}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Customer Dashboard
  const CustomerDashboard = () => {
    // If there's a current order, show chat details
    if (currentOrder) {
      return (
        <div className="h-full bg-gray-50 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-2xl font-bold">Current Order</h2>
                <p className="text-red-100">Order #{currentOrder.id} - In Progress</p>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5" />
            </div>
          </div>
        </div>
          <div className="p-6 flex flex-col gap-4 flex-1 overflow-hidden min-h-0">
            {/* Order Details */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Order Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item:</span>
                  <span className="text-gray-800 font-medium">{currentOrder.item}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Receiver:</span>
                  <span className="text-gray-800 font-medium">{currentOrder.receiver}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <span className="text-gray-800 font-medium">{currentOrder.contact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rider:</span>
                  <span className="text-gray-800 font-medium">{currentOrder.rider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className="text-gray-800 font-medium capitalize">{currentOrder.paymentMethod || "Cash"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-gray-800 font-medium">₱{currentOrder.total || orderTotal.total}.00</span>
                </div>
          </div>
        </div>

            {/* Chat Section */}
            <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col flex-1 min-h-0">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-red-600" />
                Chat with Rider
              </h3>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 bg-gray-50 rounded-xl p-3 min-h-0">
          {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "customer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs ${
                        msg.sender === "customer"
                          ? "bg-red-600 text-white rounded-2xl rounded-br-sm px-4 py-2"
                          : "bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm px-4 py-2"
                      }`}
                    >
                  <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

              {/* Chat Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-red-500 focus:outline-none text-gray-800"
            />
            <button 
              onClick={sendMessage}
              className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowOrderTracking(true)}
                  className="bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Track Order</span>
                </button>
                <button className="bg-gray-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Rider</span>
                </button>
              </div>
              <button
                onClick={() => setShowCompleteConfirmation(true)}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Mark as Delivered</span>
              </button>
            </div>
      </div>
    </div>
  );
    }

    // Default dashboard when no current order
    return (
      <div className="h-full bg-gray-50 flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">New Request</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearch(true)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowNotifications(true)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition relative"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

          {/* Services Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 space-y-4">
            <div className="bg-white/90 rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-800">Services</h3>
                <span className="text-xs text-gray-500">Choose one</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedService("delivery")}
                  className={`group flex flex-col items-center gap-2 ${selectedService === "delivery" ? "opacity-100" : "opacity-80"}`}
                >
                  <div className={`w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shadow-sm group-active:scale-95 transition ${selectedService === "delivery" ? "ring-2 ring-red-300" : ""}`}>
                    <Package className="w-6 h-6 text-red-600" />
                  </div>
                  <span className="text-[11px] text-gray-700 leading-tight">Delivery</span>
                </button>
                <button
                  onClick={() => setSelectedService("plumbing")}
                  className={`group flex flex-col items-center gap-2 ${selectedService === "plumbing" ? "opacity-100" : "opacity-80"}`}
                >
                  <div className={`w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shadow-sm group-active:scale-95 transition ${selectedService === "plumbing" ? "ring-2 ring-blue-300" : ""}`}>
                    <Wrench className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-[11px] text-gray-700 leading-tight">Plumbing</span>
                </button>
                <button
                  onClick={() => setSelectedService("aircon")}
                  className={`group flex flex-col items-center gap-2 ${selectedService === "aircon" ? "opacity-100" : "opacity-80"}`}
                >
                  <div className={`w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center shadow-sm group-active:scale-95 transition ${selectedService === "aircon" ? "ring-2 ring-teal-300" : ""}`}>
                    <Wind className="w-6 h-6 text-teal-600" />
                  </div>
                  <span className="text-[11px] text-gray-700 leading-tight">Aircon</span>
                </button>
                <button
                  onClick={() => setSelectedService("electrician")}
                  className={`group flex flex-col items-center gap-2 ${selectedService === "electrician" ? "opacity-100" : "opacity-80"}`}
                >
                  <div className={`w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shadow-sm group-active:scale-95 transition ${selectedService === "electrician" ? "ring-2 ring-amber-300" : ""}`}>
                    <PlugZap className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-[11px] text-gray-700 leading-tight">Electrician</span>
                </button>
              </div>
            </div>

        </div>
      </div>

        <div className="p-6 space-y-4 flex-1 overflow-hidden min-h-0">
          {selectedService === "delivery" && (
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Locations</h3>
              <div className="space-y-4">
          <div className="flex items-start gap-3">
                  <div className="bg-red-50 p-2 rounded-lg mt-1">
                    <MapPin className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Pickup Location</p>
              <input
                type="text"
                placeholder="Enter pickup address"
                      className="w-full px-0 py-2 border-b border-gray-200 focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex items-start gap-3">
                  <div className="bg-green-50 p-2 rounded-lg mt-1">
                    <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Delivery Location</p>
              <input
                type="text"
                placeholder="Enter delivery address"
                      className="w-full px-0 py-2 border-b border-gray-200 focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
          )}
          {selectedService === "delivery" ? (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Order Details</h3>
              <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Item Description</label>
                  <textarea
                    placeholder="Describe what you're sending (e.g., Documents, Food, Package, etc.)"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400 resize-none"
                  />
            </div>
              <div>
                  <label className="text-sm text-gray-600 mb-1 block">Receiver Name</label>
                  <input type="text" placeholder="Full name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400" />
              </div>
              <div>
                  <label className="text-sm text-gray-600 mb-1 block">Receiver Contact</label>
                  <input type="tel" placeholder="09XX XXX XXXX" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400" />
              </div>
            </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Service Request</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Describe the problem</label>
                  <textarea placeholder="Tell us what's wrong (leak, no cooling, power issue, etc.)" rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400 resize-none" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Service Address</label>
                  <input type="text" placeholder="Full address" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400" />
                </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                    <label className="text-sm text-gray-600 mb-1 block">Preferred Date</label>
                    <input type="date" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800" />
              </div>
              <div>
                    <label className="text-sm text-gray-600 mb-1 block">Preferred Time</label>
                    <input type="time" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800" />
              </div>
            </div>
                <div className="grid grid-cols-2 gap-3">
            <div>
                    <label className="text-sm text-gray-600 mb-1 block">Contact Name</label>
                    <input type="text" placeholder="Full name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400" />
            </div>
            <div>
                    <label className="text-sm text-gray-600 mb-1 block">Contact Phone</label>
                    <input type="tel" placeholder="09XX XXX XXXX" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400" />
            </div>
          </div>
        </div>
            </div>
          )}

          {selectedService === "delivery" && (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Payment Method</h3>
          <div className="space-y-2">
                {["Cash", "GCash", "QRPH"].map((method) => (
              <label key={method} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 transition">
                <input type="radio" name="payment" className="w-4 h-4 text-red-600" />
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{method}</span>
              </label>
            ))}
          </div>
        </div>
          )}

          <button
            onClick={() => {
              // Show payment modal first
              setShowPaymentModal(true);
            }}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-red-700 transition"
          >
            {selectedService === "delivery" ? `Book Delivery - ₱${orderTotal.total}.00` : `Book Service - ₱${orderTotal.total}.00`}
        </button>
      </div>
    </div>
  );
  };

  // Orders Screen
  const OrdersScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl shadow-lg">
        <h2 className="text-2xl font-bold">Past Orders</h2>
        <p className="text-red-100">Your delivery history</p>
      </div>

      <div className="p-4 space-y-3">
        {[
          {
            id: "DLV-2846",
            status: "Completed",
            from: "Ayala Center",
            to: "Banilad",
            time: "Delivered",
            rider: "John Driver",
            rating: 4.9,
            phone: "0923 456 7890",
          },
          {
            id: "DLV-2845",
            status: "Completed",
            from: "Mabolo",
            to: "Lahug",
            time: "Delivered",
            rider: "Sarah Wilson",
            rating: 4.7,
            phone: "0911 222 3333",
          },
          {
            id: "DLV-2844",
            status: "Completed",
            from: "Colon Street",
            to: "Fuente Circle",
            time: "Delivered",
            rider: "Mike Johnson",
            rating: 4.8,
            phone: "0922 333 4444",
          },
        ].map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-bold text-gray-800">{order.id}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                {order.status}
              </span>
            </div>

            {order.rider && (
              <div className="bg-red-50 rounded-xl p-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-red-600" />
                </div>
                  <div>
                    <p className="font-semibold text-gray-800">{order.rider}</p>
                    <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">
                          {order.rating}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">
                        {order.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  From:{" "}
                  <span className="font-medium text-gray-800">
                    {order.from}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  To:{" "}
                  <span className="font-medium text-gray-800">{order.to}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{order.time}</span>
              </div>
            </div>

            {order.status === "In Transit" && (
                <button 
                  onClick={() => setShowChat(true)}
                className="w-full bg-green-50 text-green-600 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-green-100 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );

  // Profile Screen
  const ProfileScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Juan Dela Cruz</h2>
            <p className="text-red-100">+63 912 345 6789</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 -mt-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-800">Personal Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-medium">Juan Dela Cruz</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium">+63 912 345 6789</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">juan@email.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Saved Addresses</h3>
            <button onClick={() => setIsAddAddressOpen(true)} className="text-red-600 font-medium text-sm flex items-center gap-1">
              <Plus className="w-4 h-4" />
              Add Address
            </button>
          </div>

          <div className="space-y-3">
            {addresses.map((addr) => (
              <div key={addr.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className={`w-5 h-5 mt-0.5 ${addr.isDefault ? "text-red-600" : "text-gray-400"}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-800">{addr.label}</p>
                    {addr.isDefault && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                  {addr.landmark && (
                    <p className="text-xs text-gray-500 mt-1">Landmark: {addr.landmark}</p>
                  )}
                </div>
                <button onClick={() => setViewingAddress(addr)} className="text-gray-400 hover:text-red-600 transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Payment Methods</h3>
            <button 
              onClick={() => setShowAddPaymentMethod(true)}
              className="text-red-600 font-medium text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Method
            </button>
          </div>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <method.icon className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="font-medium">{method.name}</span>
                    {method.details && (
                      <p className="text-xs text-gray-500">{method.details.number}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Default</span>
                  )}
                  <button
                    onClick={() => setDefaultPaymentMethod(method.id)}
                    className="text-gray-400 hover:text-red-600 transition"
                    disabled={method.isDefault}
                  >
                    <Star className={`w-4 h-4 ${method.isDefault ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </button>
                  {!method.isDefault && method.id !== "cash" && (
                    <button
                      onClick={() => removePaymentMethod(method.id)}
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <Settings className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <HelpCircle className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">Help</span>
            </button>
            <button className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <Share className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">Share App</span>
            </button>
            <button className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <Heart className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">Rate App</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {isAddAddressOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Address</h3>
              <button onClick={() => setIsAddAddressOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <input type="text" placeholder="Label (e.g., Home, Office)" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400" />
              <textarea placeholder="Full address" rows={3} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400 resize-none" />
              <input type="text" placeholder="Landmark (optional)" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400" />
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input id="setDefaultAddress" type="checkbox" className="w-4 h-4" />
                Set as default
              </label>
            </div>
            <button
              onClick={() => {
                const labelInput = (document.querySelector('input[placeholder="Label (e.g., Home, Office)"]') as HTMLInputElement)?.value || "Address";
                const addressInput = (document.querySelector('textarea[placeholder="Full address"]') as HTMLTextAreaElement)?.value || "";
                const landmarkInput = (document.querySelector('input[placeholder="Landmark (optional)"]') as HTMLInputElement)?.value || undefined;
                const setDefault = (document.getElementById('setDefaultAddress') as HTMLInputElement)?.checked || false;

                if (!addressInput.trim()) return setIsAddAddressOpen(false);

                setAddresses((prev) => {
                  const next = setDefault ? prev.map(a => ({ ...a, isDefault: false })) : prev;
                  return [
                    ...next,
                    {
                      id: `addr-${Date.now()}`,
                      label: labelInput.trim() || "Address",
                      address: addressInput,
                      landmark: landmarkInput,
                      isDefault: setDefault,
                    },
                  ];
                });
                setIsAddAddressOpen(false);
              }}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition mt-5"
            >
              Save Address
            </button>
          </div>
        </div>
      )}

      {/* View Address Modal */}
      {viewingAddress && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{viewingAddress.label}</h3>
              <button onClick={() => setViewingAddress(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">{viewingAddress.address}</p>
                  {viewingAddress.landmark && (
                    <p className="text-xs text-gray-500 mt-1">Landmark: {viewingAddress.landmark}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setAddresses((prev) => prev.map(a => ({ ...a, isDefault: a.id === viewingAddress.id })));
                  setViewingAddress(null);
                }}
                className="bg-red-50 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-100 transition"
              >
                Set Default
              </button>
              <button
                onClick={() => {
                  setAddresses((prev) => prev.filter(a => a.id !== viewingAddress.id));
                  setViewingAddress(null);
                }}
                className="bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Worker Dashboard (generic)
  const RiderDashboard = () => {
    // If there's a current delivery, show chat details
    if (currentDelivery) {
      return (
        <div className="h-full bg-gray-50 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Current Delivery</h2>
                <p className="text-red-100">Order #{currentDelivery.id} - In Progress</p>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-full px-4 py-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Online</span>
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4 flex-1 overflow-hidden min-h-0">
            {/* Delivery Details */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Delivery Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="text-gray-800 font-medium">{currentDelivery.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="text-gray-800 font-medium">{currentDelivery.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pickup:</span>
                  <span className="text-gray-800 font-medium">{currentDelivery.pickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Drop-off:</span>
                  <span className="text-gray-800 font-medium">{currentDelivery.dropoff}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee:</span>
                  <span className="font-medium text-red-600">{currentDelivery.fee}</span>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col flex-1 min-h-0">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-red-600" />
                Chat with Customer
              </h3>
              
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 bg-gray-50 rounded-xl p-3 min-h-0">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "rider" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs ${
                        msg.sender === "rider"
                          ? "bg-red-600 text-white rounded-2xl rounded-br-sm px-4 py-2"
                          : "bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm px-4 py-2"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-red-500 focus:outline-none text-gray-800"
                />
                <button
                  onClick={sendMessage}
                  className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
                <button
                  onClick={() => setShowCompleteConfirmation(true)}
                  className="bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default dashboard when no current job
    return (
    <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Good Day, Mark!</h2>
            <p className="text-red-100 text-sm">Ready for {workerService === "delivery" ? "deliveries" : "jobs"}?</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSearch(true)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowNotifications(true)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition relative"
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-full px-4 py-2">
            <div className={`w-3 h-3 rounded-full animate-pulse ${isOnline ? "bg-green-400" : "bg-gray-400"}`}></div>
            <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
          </div>
          <button
            onClick={toggleOnlineStatus}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              isOnline 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            {isOnline ? "Go Offline" : "Go Online"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-red-100">Today</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">₱1,240</p>
            <p className="text-xs text-red-100">Earnings</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 text-center">
            <p className="text-2xl font-bold">4.8</p>
            <p className="text-xs text-red-100">Rating</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Available {workerService === "delivery" ? "Orders" : "Jobs"}</h3>
          <span className="text-sm text-gray-500">3 nearby</span>
        </div>

        <div className="space-y-3">
          {[
              {
                id: "DLV-2848",
                pickup: "SM City Cebu",
                dropoff: "IT Park",
                distance: "3.2 km",
                fee: "₱95",
                time: "15 mins",
              },
              {
                id: "DLV-2849",
                pickup: "Ayala Center",
                dropoff: "Capitol Site",
                distance: "2.1 km",
                fee: "₱75",
                time: "10 mins",
              },
              {
                id: "DLV-2850",
                pickup: "Robinsons Fuente",
                dropoff: "Mabolo",
                distance: "1.5 km",
                fee: "₱65",
                time: "8 mins",
              },
          ].map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-5 shadow-sm border-2 border-gray-100"
              >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-bold text-gray-800">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-red-600">{order.fee}</p>
                  <p className="text-xs text-gray-500">{order.distance}</p>
                </div>
              </div>

              {workerService === "delivery" ? (
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Pickup:{" "}
                      <span className="font-medium text-gray-800">{order.pickup}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Drop-off:{" "}
                      <span className="font-medium text-gray-800">{order.dropoff}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Est. {order.time}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Job:{" "}
                      <span className="font-medium text-gray-800">{workerService === "plumbing" ? "Plumbing" : workerService === "aircon" ? "Aircon Repair" : "Electrical"}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Location: <span className="font-medium text-gray-800">Cebu City</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Preferred: Today</span>
                  </div>
                </div>
              )}

                <button 
                  onClick={() => {
                    // Create a new current delivery
                  if (workerService === "delivery") {
                    setCurrentDelivery({
                      id: order.id,
                      customer: "John Doe",
                      phone: "+1 234 567 8900",
                      pickup: order.pickup,
                      dropoff: order.dropoff,
                      fee: order.fee,
                      status: "in_transit"
                    });
                  } else {
                    setCurrentDelivery({
                      id: order.id.replace("DLV","SRV"),
                      customer: "Homeowner",
                      phone: "+1 234 567 8900",
                      pickup: undefined,
                      dropoff: "Cebu City",
                      fee: order.fee,
                      status: "in_transit"
                    });
                  }
                    setCurrentScreen("home");
                  }}
                  className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                >
                {workerService === "delivery" ? "Accept Order" : "Accept Job"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Worker Past Jobs/Deliveries
  const RiderActiveDeliveries = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl shadow-lg">
        <h2 className="text-2xl font-bold">Past {workerService === "delivery" ? "Deliveries" : "Jobs"}</h2>
        <p className="text-red-100">Your {workerService === "delivery" ? "delivery" : "service"} history</p>
      </div>

      <div className="p-4 space-y-3">
        {[
          {
            id: "DLV-2846",
            status: "Completed",
            pickup: "Ayala Center",
            dropoff: "Banilad",
            customer: "Maria Santos",
            phone: "0923 456 7890",
            fee: "₱120",
          },
          {
            id: "DLV-2845",
            status: "Completed",
            pickup: "SM City Cebu",
            dropoff: "IT Park",
            customer: "Juan Dela Cruz",
            phone: "0912 345 6789",
            fee: "₱95",
          },
          {
            id: "DLV-2844",
            status: "Completed",
            pickup: "Robinsons Fuente",
            dropoff: "Mabolo",
            customer: "Sarah Wilson",
            phone: "0911 222 3333",
            fee: "₱85",
          },
        ].map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-500">{workerService === "delivery" ? "Order ID" : "Job ID"}</p>
                <p className="font-bold text-gray-800">{order.id}</p>
              </div>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                {order.status}
              </span>
            </div>
            <div className="bg-red-50 rounded-xl p-4 mb-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.phone}</p>
                </div>
              </div>
            </div>

            {workerService === "delivery" ? (
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Pickup:{" "}
                    <span className="font-medium text-gray-800">{order.pickup}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Drop-off:{" "}
                    <span className="font-medium text-gray-800">{order.dropoff}</span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Job: <span className="font-medium text-gray-800">{workerService === "plumbing" ? "Plumbing" : workerService === "aircon" ? "Aircon Repair" : "Electrical"}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Location: <span className="font-medium text-gray-800">Cebu City</span></span>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="text-right">
                <p className="text-sm text-gray-500">{workerService === "delivery" ? "Earnings" : "Fee"}</p>
                <p className="text-lg font-bold text-red-600">{order.fee}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Rating</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-800">4.8</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Rider Earnings
  const RiderEarnings = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Earnings</h2>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
          <p className="text-red-100 text-sm mb-2">Total Earnings Today</p>
          <p className="text-4xl font-bold mb-4">₱1,240.00</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-red-100 text-xs">Deliveries</p>
              <p className="text-xl font-bold">12</p>
            </div>
            <div>
              <p className="text-red-100 text-xs">Avg per delivery</p>
              <p className="text-xl font-bold">₱103</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">This Week</h3>
          <span className="text-sm text-red-600 font-medium">₱6,840.00</span>
        </div>

        <div className="space-y-2">
          {[
            { date: "Today", deliveries: 12, amount: "₱1,240" },
            { date: "Yesterday", deliveries: 15, amount: "₱1,680" },
            { date: "Oct 04", deliveries: 14, amount: "₱1,520" },
            { date: "Oct 03", deliveries: 11, amount: "₱1,210" },
            { date: "Oct 02", deliveries: 10, amount: "₱1,190" },
          ].map((day, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-gray-800">{day.date}</p>
                <p className="text-sm text-gray-500">
                  {day.deliveries} deliveries
                </p>
              </div>
              <p className="text-lg font-bold text-red-600">{day.amount}</p>
            </div>
          ))}
        </div>

        <button className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition">
          Cash Out Earnings
        </button>
      </div>
    </div>
  );

  // Rider Profile
  const RiderProfile = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Mark Rider</h2>
            <p className="text-red-100">+63 912 345 6789</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.8</span>
              <span className="text-red-100 text-sm">(124 ratings)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 -mt-4">
        {/* Rider Stats */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Rider Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-600">487</p>
              <p className="text-sm text-gray-600">Total Deliveries</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-red-600">98%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-800">Personal Information</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-medium">Mark Rider</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium">+63 912 345 6789</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium">mark.rider@email.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Package className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Vehicle</p>
                <p className="font-medium">Motorcycle - ABC 1234</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Service Areas</h3>
            <button 
              onClick={() => setIsAddAddressOpen(true)}
              className="text-red-600 font-medium text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Area
            </button>
          </div>
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div key={addr.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className={`w-5 h-5 mt-0.5 ${addr.isDefault ? "text-red-600" : "text-gray-400"}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-800">{addr.label}</p>
                    {addr.isDefault && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">Primary</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                  {addr.landmark && (
                    <p className="text-xs text-gray-500 mt-1">Landmark: {addr.landmark}</p>
                  )}
                </div>
                <button onClick={() => setViewingAddress(addr)} className="text-gray-400 hover:text-red-600 transition">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Payment Methods</h3>
            <button 
              onClick={() => setShowAddPaymentMethod(true)}
              className="text-red-600 font-medium text-sm flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Method
            </button>
          </div>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <method.icon className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="font-medium">{method.name}</span>
                    {method.details && (
                      <p className="text-xs text-gray-500">{method.details.number}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Default</span>
                  )}
                  <button
                    onClick={() => setDefaultPaymentMethod(method.id)}
                    className="text-gray-400 hover:text-red-600 transition"
                    disabled={method.isDefault}
                  >
                    <Star className={`w-4 h-4 ${method.isDefault ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </button>
                  {!method.isDefault && method.id !== "cash" && (
                    <button
                      onClick={() => removePaymentMethod(method.id)}
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Account Settings</h3>
          <div className="space-y-2">
            <button 
              onClick={toggleOnlineStatus}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="font-medium text-gray-500">Online/Offline Status</span>
              <div className={`w-12 h-6 rounded-full relative ${isOnline ? "bg-green-500" : "bg-gray-300"}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${isOnline ? "right-1" : "left-1"}`}></div>
              </div>
            </button>
            <button 
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="font-medium text-gray-500">Payment Settings</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <span className="font-medium text-gray-500">Documents</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <Settings className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <HelpCircle className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">Help</span>
            </button>
            <button className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <Share className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">Share App</span>
            </button>
            <button className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
              <Heart className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">Rate App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Bottom Navigation
  const BottomNav = () => {
    if (userType === "rider") {
      return (
        <div className="max-w-md mx-auto fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 shadow-lg">
          <div className="flex justify-around items-center max-w-md mx-auto">
            <button
              onClick={() => setCurrentScreen("home")}
              className={`flex flex-col items-center gap-1 transition ${currentScreen === "home" ? "text-red-600" : "text-gray-400"}`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button
              onClick={() => setCurrentScreen("deliveries")}
              className={`flex flex-col items-center gap-1 transition ${currentScreen === "deliveries" ? "text-red-600" : "text-gray-400"}`}
            >
              <Package className="w-6 h-6" />
              <span className="text-xs font-medium">{workerService === "delivery" ? "Deliveries" : "Jobs"}</span>
            </button>
            <button
              onClick={() => setCurrentScreen("earnings")}
              className={`flex flex-col items-center gap-1 transition ${currentScreen === "earnings" ? "text-red-600" : "text-gray-400"}`}
            >
              <CreditCard className="w-6 h-6" />
              <span className="text-xs font-medium">Earnings</span>
            </button>
            <button
              onClick={() => setCurrentScreen("profile")}
              className={`flex flex-col items-center gap-1 transition ${currentScreen === "profile" ? "text-red-600" : "text-gray-400"}`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => setCurrentScreen("home")}
            className={`flex flex-col items-center gap-1 transition ${currentScreen === "home" ? "text-red-600" : "text-gray-400"}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setCurrentScreen("orders")}
            className={`flex flex-col items-center gap-1 transition ${currentScreen === "orders" ? "text-red-600" : "text-gray-400"}`}
          >
            <Package className="w-6 h-6" />
            <span className="text-xs font-medium">Orders</span>
          </button>
          <button
            onClick={() => setCurrentScreen("profile")}
            className={`flex flex-col items-center gap-1 transition ${currentScreen === "profile" ? "text-red-600" : "text-gray-400"}`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </div>
    );
  };

  if (currentScreen === "splash") {
    return <SplashScreen />;
  }

  if (currentScreen === "login") {
    return <LoginScreen />;
  }

  if (currentScreen === "signup") {
    return <SignupScreen />;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative pb-20 flex flex-col">
      {userType === "rider" ? (
        <>
          {currentScreen === "home" && <RiderDashboard />}
          {currentScreen === "deliveries" && <RiderActiveDeliveries />}
          {currentScreen === "earnings" && <RiderEarnings />}
          {currentScreen === "profile" && <RiderProfile />}
        </>
      ) : (
        <>
          {currentScreen === "home" && <CustomerDashboard />}
          {currentScreen === "orders" && <OrdersScreen />}
          {currentScreen === "profile" && <ProfileScreen />}
        </>
      )}
      <BottomNav />
      {isLoading && <LoadingScreen />}
      {showCompleteConfirmation && <CompleteConfirmationDialog />}
      {showRatingModal && <RatingModal />}
      {showPaymentModal && <PaymentModal />}
      {showOrderTracking && <OrderTrackingModal />}
      {showSettings && <SettingsModal />}
      {showHelp && <HelpModal />}
      {showNotifications && <NotificationsModal />}
      {showSearch && <SearchModal />}
      {showLogoutConfirm && <LogoutConfirmationModal />}
      {showDeleteAccount && <DeleteAccountModal />}
      {showAddPaymentMethod && <AddPaymentMethodModal />}
      {showToast && <ToastNotification />}
    </div>
  );
}
