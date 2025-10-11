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
} from "lucide-react";

export default function SugoApp() {
  const [currentScreen, setCurrentScreen] = useState("splash");
  const [userType, setUserType] = useState("customer");
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [currentDelivery, setCurrentDelivery] = useState<any>(null);

  // Function to complete current order/delivery
  const completeOrder = () => {
    if (currentOrder) {
      setCurrentOrder(null);
      setShowChat(false);
      setCurrentScreen("orders");
    }
    if (currentDelivery) {
      setCurrentDelivery(null);
      setShowChat(false);
      setCurrentScreen("deliveries");
    }
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
            Rider
          </button>
        </div>
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

            {/* Complete Order Button */}
            <button
              onClick={completeOrder}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Mark as Delivered</span>
            </button>
      </div>
    </div>
  );
    }

    // Default dashboard when no current order
    return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Delivery</h2>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold">👋</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 p-2 rounded-lg mt-1">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-red-100 mb-1">Pickup Location</p>
              <input
                type="text"
                placeholder="Enter pickup address"
                className="w-full bg-transparent border-b border-white/30 pb-2 placeholder-white/60 focus:outline-none focus:border-white text-white"
              />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-white/20 p-2 rounded-lg mt-1">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-red-100 mb-1">Delivery Location</p>
              <input
                type="text"
                placeholder="Enter delivery address"
                className="w-full bg-transparent border-b border-white/30 pb-2 placeholder-white/60 focus:outline-none focus:border-white text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Order Details</h3>
          
            <div className="space-y-4">
            <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Item Description
                </label>
                <textarea
                  placeholder="Describe what you're sending (e.g., Documents, Food, Package, etc.)"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400 resize-none"
                />
            </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Receiver Name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400"
                />
            </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Receiver Contact
                </label>
                <input
                  type="tel"
                  placeholder="09XX XXX XXXX"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 focus:outline-none text-gray-800 placeholder-gray-400"
                />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Payment Method</h3>
          <div className="space-y-2">
              {["Cash", "GCash", "QRPH"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 transition"
                >
                  <input
                    type="radio"
                    name="payment"
                    className="w-4 h-4 text-red-600"
                  />
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="font-medium">{method}</span>
              </label>
            ))}
          </div>
        </div>

          <button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                // Create a new current order
                setCurrentOrder({
                  id: "ORD-001",
                  item: "Electronics Package",
                  receiver: "John Doe",
                  contact: "+1 234 567 8900",
                  rider: "Mike Johnson",
                  status: "in_transit"
                });
                setCurrentScreen("home");
              }, 3000);
            }}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-red-700 transition"
          >
          Book Delivery - ₱85.00
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
            <button className="text-red-600 font-medium text-sm">
              + Add Address
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-800">Home</p>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                    Default
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  123 Main Street, Barangay Lahug, Cebu City, Cebu 6000
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Landmark: Near SM City Cebu
                </p>
              </div>
              <button className="text-gray-400 hover:text-red-600 transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-800">Office</p>
                </div>
                <p className="text-sm text-gray-600">
                  456 IT Park, Cebu Business Park, Cebu City, Cebu 6000
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Landmark: Near Ayala Center Cebu
                </p>
              </div>
              <button className="text-gray-400 hover:text-red-600 transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-800">Other</p>
                </div>
                <p className="text-sm text-gray-600">
                  789 Fuente Circle, Cebu City, Cebu 6000
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Landmark: Near Robinsons Fuente
                </p>
              </div>
              <button className="text-gray-400 hover:text-red-600 transition">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Payment Methods</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="font-medium">GCash</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="font-medium">QRPH</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <button className="w-full mt-3 text-red-600 font-medium py-2 border-2 border-red-200 rounded-lg hover:bg-red-50 transition">
            + Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );

  // Rider Dashboard
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
                  onClick={completeOrder}
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

    // Default dashboard when no current delivery
    return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Good Day, Mark!</h2>
            <p className="text-red-100 text-sm">Ready to deliver?</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-lg rounded-full px-4 py-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Online</span>
          </div>
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
          <h3 className="text-lg font-bold text-gray-800">Available Orders</h3>
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

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Pickup:{" "}
                      <span className="font-medium text-gray-800">
                        {order.pickup}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">
                      Drop-off:{" "}
                      <span className="font-medium text-gray-800">
                        {order.dropoff}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Est. {order.time}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    // Create a new current delivery
                    setCurrentDelivery({
                      id: order.id,
                      customer: "John Doe",
                      phone: "+1 234 567 8900",
                      pickup: order.pickup,
                      dropoff: order.dropoff,
                      fee: order.fee,
                      status: "in_transit"
                    });
                    setCurrentScreen("home");
                  }}
                  className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                >
                  Accept Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Rider Active Deliveries
  const RiderActiveDeliveries = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-b-3xl shadow-lg">
        <h2 className="text-2xl font-bold">Past Deliveries</h2>
        <p className="text-red-100">Your delivery history</p>
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
                <p className="text-sm text-gray-500">Order ID</p>
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
                  <p className="font-semibold text-gray-800">
                    {order.customer}
                  </p>
                  <p className="text-sm text-gray-600">{order.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Pickup:{" "}
                  <span className="font-medium text-gray-800">
                    {order.pickup}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Drop-off:{" "}
                  <span className="font-medium text-gray-800">
                    {order.dropoff}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <div className="text-right">
                <p className="text-sm text-gray-500">Earnings</p>
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

        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-800">Personal Information</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-medium text-gray-800">Mark Rider</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">+63 912 345 6789</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-medium text-gray-800">mark.rider@email.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Package className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Vehicle</p>
                <p className="font-medium text-gray-800">Motorcycle - ABC 1234</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Account Settings</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-500">Online/Offline Status</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-500">Payment Settings</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-500">Documents</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
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
              <span className="text-xs font-medium">Deliveries</span>
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
    </div>
  );
}
