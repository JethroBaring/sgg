import React, { useState, useEffect } from "react";
import {
  Users,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Eye,
  UserCheck,
  UserX,
  Search,
  Filter,
  Download,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Star,
  AlertCircle,
  ArrowLeft,
  Settings,
  Bell,
  LogOut,
  FileText,
  Activity,
  ShoppingBag,
  Home,
  BarChart3,
  Menu,
  X,
  ChevronRight,
  Moon,
  Sun,
  Ticket,
  MessageSquare,
  Wrench,
  Zap,
  Droplet,
  Paintbrush,
  Send,
} from "lucide-react";

interface RiderApplication {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicleType: string;
  vehiclePlate: string;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
  address: string;
  rating?: number;
}

interface ActiveRider {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  status: "online" | "offline" | "busy";
  rating: number;
  totalDeliveries: number;
  earnings: string;
  joinedDate: string;
}

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  riderId: string;
  riderName: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  total: string;
  createdAt: string;
  from: string;
  to: string;
}

interface ServiceTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceType: "plumbing" | "electrician" | "cleaning" | "aircon" | "painting" | "carpentry" | "other";
  title: string;
  description: string;
  status: "open" | "assigned" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  assignedTo?: string;
  assignedToName?: string;
  location: string;
  images?: string[];
  lastMessage?: string;
  unreadCount: number;
}

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState<
    "overview" | "riders" | "applications" | "orders" | "customers" | "tickets" | "settings"
  >("overview");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);
  const [showRiderDetails, setShowRiderDetails] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [showTicketChat, setShowTicketChat] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{type: string, id: string} | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("info");
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("adminDarkMode");
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("adminDarkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    showToastMessage(`${!darkMode ? "Dark" : "Light"} mode enabled`, "success");
  };

  // Dark mode utility classes
  const cardBg = darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white';
  const textPrimary = darkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const hoverBg = darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100';
  const inputBg = darkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-800';
  const tableBg = darkMode ? 'bg-gray-900' : 'bg-white';
  const tableHeaderBg = darkMode ? 'bg-gray-800' : 'bg-gray-50';
  const tableRowHover = darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50';
  const borderColor = darkMode ? 'border-gray-800' : 'border-gray-200';
  const modalBg = darkMode ? 'bg-gray-900' : 'bg-white';

  // Mock data
  const [riderApplications, setRiderApplications] = useState<RiderApplication[]>([
    {
      id: "APP-001",
      name: "Mark Rider",
      phone: "+63 912 345 6789",
      email: "mark.rider@email.com",
      vehicleType: "Motorcycle",
      vehiclePlate: "ABC 123",
      status: "pending",
      appliedDate: "2024-10-10",
      address: "Cebu City, Philippines",
    },
    {
      id: "APP-002",
      name: "Sarah Driver",
      phone: "+63 923 456 7890",
      email: "sarah.driver@email.com",
      vehicleType: "Motorcycle",
      vehiclePlate: "XYZ 789",
      status: "pending",
      appliedDate: "2024-10-11",
      address: "Mandaue City, Philippines",
    },
    {
      id: "APP-003",
      name: "John Cruz",
      phone: "+63 934 567 8901",
      email: "john.cruz@email.com",
      vehicleType: "Motorcycle",
      vehiclePlate: "DEF 456",
      status: "pending",
      appliedDate: "2024-10-12",
      address: "Lapu-Lapu City, Philippines",
    },
  ]);

  const [activeRiders, setActiveRiders] = useState<ActiveRider[]>([
    {
      id: "RDR-001",
      name: "Carlos Santos",
      phone: "+63 945 678 9012",
      email: "carlos@email.com",
      vehicle: "Honda Click 125",
      status: "online",
      rating: 4.8,
      totalDeliveries: 487,
      earnings: "₱45,230",
      joinedDate: "2024-01-15",
    },
    {
      id: "RDR-002",
      name: "Maria Garcia",
      phone: "+63 956 789 0123",
      email: "maria@email.com",
      vehicle: "Yamaha Mio",
      status: "busy",
      rating: 4.9,
      totalDeliveries: 623,
      earnings: "₱58,940",
      joinedDate: "2023-12-05",
    },
    {
      id: "RDR-003",
      name: "Pedro Reyes",
      phone: "+63 967 890 1234",
      email: "pedro@email.com",
      vehicle: "Suzuki Raider",
      status: "online",
      rating: 4.7,
      totalDeliveries: 356,
      earnings: "₱33,890",
      joinedDate: "2024-02-20",
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-2846",
      customerId: "CST-001",
      customerName: "Juan Dela Cruz",
      riderId: "RDR-001",
      riderName: "Carlos Santos",
      status: "in-progress",
      total: "₱150",
      createdAt: "2024-10-13 14:30",
      from: "Ayala Center",
      to: "Banilad",
    },
    {
      id: "ORD-2845",
      customerId: "CST-002",
      customerName: "Anna Smith",
      riderId: "RDR-002",
      riderName: "Maria Garcia",
      status: "completed",
      total: "₱120",
      createdAt: "2024-10-13 13:15",
      from: "SM City",
      to: "Lahug",
    },
    {
      id: "ORD-2844",
      customerId: "CST-003",
      customerName: "Roberto Tan",
      riderId: "RDR-003",
      riderName: "Pedro Reyes",
      status: "in-progress",
      total: "₱180",
      createdAt: "2024-10-13 15:00",
      from: "IT Park",
      to: "Mabolo",
    },
  ]);

  const [serviceTickets, setServiceTickets] = useState<ServiceTicket[]>([
    {
      id: "TKT-001",
      customerId: "CST-004",
      customerName: "Maria Santos",
      customerPhone: "+63 912 345 6789",
      serviceType: "plumbing",
      title: "Leaking kitchen sink",
      description: "Kitchen sink has been leaking for 2 days. Water dripping from under the sink.",
      status: "open",
      priority: "high",
      createdAt: "2024-10-18 09:30",
      location: "Cebu City, Banilad",
      unreadCount: 3,
      lastMessage: "When can someone come to check?",
    },
    {
      id: "TKT-002",
      customerId: "CST-005",
      customerName: "John Reyes",
      customerPhone: "+63 923 456 7890",
      serviceType: "electrician",
      title: "Power outlet not working",
      description: "Living room power outlet suddenly stopped working. Need electrician to check.",
      status: "assigned",
      priority: "medium",
      createdAt: "2024-10-18 10:15",
      assignedTo: "PRO-001",
      assignedToName: "Roberto Electrician",
      location: "Mandaue City, Centro",
      unreadCount: 1,
      lastMessage: "I'll be there in 30 minutes",
    },
    {
      id: "TKT-003",
      customerId: "CST-006",
      customerName: "Ana Garcia",
      customerPhone: "+63 934 567 8901",
      serviceType: "aircon",
      title: "Aircon not cooling",
      description: "Bedroom aircon running but not cooling properly. Might need cleaning or freon.",
      status: "in-progress",
      priority: "medium",
      createdAt: "2024-10-18 08:00",
      assignedTo: "PRO-002",
      assignedToName: "Mike Aircon Tech",
      location: "Lapu-Lapu City, Mactan",
      unreadCount: 0,
      lastMessage: "Cleaning the filters now",
    },
    {
      id: "TKT-004",
      customerId: "CST-007",
      customerName: "Pedro Cruz",
      customerPhone: "+63 945 678 9012",
      serviceType: "painting",
      title: "Room repainting needed",
      description: "Need to repaint bedroom walls. Looking for professional painter.",
      status: "open",
      priority: "low",
      createdAt: "2024-10-17 16:45",
      location: "Cebu City, Lahug",
      unreadCount: 2,
      lastMessage: "What colors do you recommend?",
    },
    {
      id: "TKT-005",
      customerId: "CST-008",
      customerName: "Lisa Tan",
      customerPhone: "+63 956 789 0123",
      serviceType: "plumbing",
      title: "Clogged bathroom drain",
      description: "Bathroom drain completely clogged. Water not draining at all.",
      status: "open",
      priority: "urgent",
      createdAt: "2024-10-18 11:20",
      location: "Cebu City, Mabolo",
      unreadCount: 5,
      lastMessage: "This is urgent, please help!",
    },
  ]);

  const stats = {
    totalRiders: activeRiders.length,
    pendingApplications: riderApplications.filter((r) => r.status === "pending").length,
    activeOrders: orders.filter((o) => o.status === "in-progress").length,
    todayRevenue: "₱12,450",
    totalCustomers: 1247,
    completedToday: 89,
    weekRevenue: "₱87,340",
    monthRevenue: "₱352,890",
    openTickets: serviceTickets.filter((t) => t.status === "open").length,
    totalTickets: serviceTickets.length,
    urgentTickets: serviceTickets.filter((t) => t.priority === "urgent" && t.status !== "closed" && t.status !== "resolved").length,
  };

  // Helper functions
  const showToastMessage = (message: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleApproveRider = (appId: string) => {
    setRiderApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: "approved" as const } : app))
    );
    showToastMessage(`Application ${appId} approved successfully!`, "success");
    setShowConfirmModal(false);
  };

  const handleRejectRider = (appId: string) => {
    setRiderApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: "rejected" as const } : app))
    );
    showToastMessage(`Application ${appId} rejected.`, "info");
    setShowConfirmModal(false);
  };

  const handleViewApplicationDetails = (app: RiderApplication) => {
    setSelectedItem(app);
    setShowApplicationDetails(true);
  };

  const handleViewRiderDetails = (rider: ActiveRider) => {
    setSelectedItem(rider);
    setShowRiderDetails(true);
  };

  const handleViewOrderDetails = (order: Order) => {
    setSelectedItem(order);
    setShowOrderDetails(true);
  };

  const handleViewTicketDetails = (ticket: ServiceTicket) => {
    setSelectedItem(ticket);
    setShowTicketDetails(true);
  };

  const handleAssignTicket = (ticketId: string, providerId: string, providerName: string) => {
    setServiceTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: "assigned" as const, assignedTo: providerId, assignedToName: providerName }
          : ticket
      )
    );
    showToastMessage(`Ticket ${ticketId} assigned to ${providerName}`, "success");
  };

  const handleUpdateTicketStatus = (ticketId: string, newStatus: ServiceTicket["status"]) => {
    setServiceTickets((prev) =>
      prev.map((ticket) => (ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket))
    );
    showToastMessage(`Ticket ${ticketId} status updated to ${newStatus}`, "success");
  };

  const handleOpenChat = (ticketId: string) => {
    const ticket = serviceTickets.find(t => t.id === ticketId);
    if (ticket) {
      setSelectedItem(ticket);
      setShowTicketChat(true);
    }
  };

  const handleExportData = (type: string) => {
    showToastMessage(`Exporting ${type} data...`, "info");
    // In real app, this would trigger download
  };

  const handleToggleRiderStatus = (riderId: string) => {
    setActiveRiders((prev) =>
      prev.map((rider) =>
        rider.id === riderId
          ? {
              ...rider,
              status:
                rider.status === "online"
                  ? ("offline" as const)
                  : ("online" as const),
            }
          : rider
      )
    );
    showToastMessage("Rider status updated", "success");
  };

  const confirmApproval = (appId: string) => {
    setConfirmAction({ type: "approve", id: appId });
    setShowConfirmModal(true);
  };

  const confirmRejection = (appId: string) => {
    setConfirmAction({ type: "reject", id: appId });
    setShowConfirmModal(true);
  };

  const executeConfirmAction = () => {
    if (!confirmAction) return;
    
    if (confirmAction.type === "approve") {
      handleApproveRider(confirmAction.id);
    } else if (confirmAction.type === "reject") {
      handleRejectRider(confirmAction.id);
    }
    
    setConfirmAction(null);
  };

  // Filter data based on search
  const filteredApplications = riderApplications.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.phone.includes(searchQuery) ||
    app.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRiders = activeRiders.filter((rider) =>
    rider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rider.phone.includes(searchQuery) ||
    rider.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.riderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTickets = serviceTickets.filter((ticket) =>
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sidebar Navigation
  const Sidebar = () => (
    <div className={`fixed left-0 top-0 h-full ${darkMode ? 'bg-gray-900 border-r border-gray-800' : 'bg-white'} shadow-xl transition-all duration-300 z-20 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && <h2 className="text-2xl font-bold text-red-600">Sugo Admin</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition`}
          >
            <Menu className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </button>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setCurrentView("overview")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
              currentView === "overview"
                ? "bg-red-600 text-white"
                : darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Overview</span>}
          </button>

          <button
            onClick={() => setCurrentView("applications")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm relative ${
              currentView === "applications"
                ? "bg-red-600 text-white"
                : darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <UserCheck className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Applications</span>}
            {stats.pendingApplications > 0 && sidebarOpen && (
              <span className="ml-auto bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {stats.pendingApplications}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentView("riders")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
              currentView === "riders"
                ? "bg-red-600 text-white"
                : darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Users className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Riders</span>}
          </button>

          <button
            onClick={() => setCurrentView("orders")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
              currentView === "orders"
                ? "bg-red-600 text-white"
                : darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Package className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Orders</span>}
          </button>

          <button
            onClick={() => setCurrentView("tickets")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm relative ${
              currentView === "tickets"
                ? "bg-red-600 text-white"
                : darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Ticket className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Service Tickets</span>}
            {stats.urgentTickets > 0 && sidebarOpen && (
              <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {stats.urgentTickets}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentView("customers")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
              currentView === "customers"
                ? "bg-red-600 text-white"
                : darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ShoppingBag className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Customers</span>}
          </button>

          <button
            onClick={() => setCurrentView("settings")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
              currentView === "settings"
                ? "bg-red-600 text-white"
                : darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Settings</span>}
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-1">
          <button
            onClick={toggleDarkMode}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm ${
              darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4 flex-shrink-0" /> : <Moon className="w-4 h-4 flex-shrink-0" />}
            {sidebarOpen && <span className="font-medium">{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
          <button
            onClick={() => showToastMessage("Logout functionality would be implemented here", "info")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 transition text-sm ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-red-50"
            }`}>
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );

  // Overview Section
  const OverviewView = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${darkMode ? 'bg-red-900/30' : 'bg-red-50'} rounded-xl flex items-center justify-center`}>
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className={`text-3xl font-bold ${textPrimary} mb-1`}>{stats.totalRiders}</p>
          <p className={`text-sm ${textSecondary}`}>Active Riders</p>
        </div>

        <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${darkMode ? 'bg-orange-900/30' : 'bg-orange-50'} rounded-xl flex items-center justify-center`}>
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
          <p className={`text-3xl font-bold ${textPrimary} mb-1`}>{stats.pendingApplications}</p>
          <p className={`text-sm ${textSecondary}`}>Pending Applications</p>
        </div>

        <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-xl flex items-center justify-center`}>
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <p className={`text-3xl font-bold ${textPrimary} mb-1`}>{stats.activeOrders}</p>
          <p className={`text-sm ${textSecondary}`}>Active Orders</p>
        </div>

        <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${darkMode ? 'bg-green-900/30' : 'bg-green-50'} rounded-xl flex items-center justify-center`}>
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className={`text-3xl font-bold ${textPrimary} mb-1`}>{stats.todayRevenue}</p>
          <p className={`text-sm ${textSecondary}`}>Today's Revenue</p>
        </div>
      </div>

      {/* Revenue Chart & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 ${cardBg} rounded-2xl p-6 shadow-sm`}>
          <h3 className={`font-semibold ${textPrimary} mb-6 text-lg`}>Revenue Overview</h3>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className={`text-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
              <p className={`text-2xl font-bold ${textPrimary}`}>{stats.todayRevenue}</p>
              <p className={`text-sm ${textSecondary} mt-1`}>Today</p>
            </div>
            <div className={`text-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
              <p className={`text-2xl font-bold ${textPrimary}`}>{stats.weekRevenue}</p>
              <p className={`text-sm ${textSecondary} mt-1`}>This Week</p>
            </div>
            <div className={`text-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
              <p className={`text-2xl font-bold ${textPrimary}`}>{stats.monthRevenue}</p>
              <p className={`text-sm ${textSecondary} mt-1`}>This Month</p>
            </div>
          </div>
          <div className="h-48 flex items-end justify-between gap-4">
            {[65, 45, 78, 90, 55, 70, 85].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className={`w-full ${darkMode ? 'bg-red-900/30' : 'bg-red-100'} rounded-t-lg relative`} style={{ height: `${height}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg"></div>
                </div>
                <p className={`text-xs ${textSecondary}`}>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
          <h3 className={`font-semibold ${textPrimary} mb-6 text-lg`}>Quick Stats</h3>
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
              <div>
                <p className={`text-sm ${textSecondary}`}>Completed Today</p>
                <p className={`text-2xl font-bold ${textPrimary}`}>{stats.completedToday}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
              <div>
                <p className={`text-sm ${textSecondary}`}>Total Customers</p>
                <p className={`text-2xl font-bold ${textPrimary}`}>{stats.totalCustomers}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-purple-500" />
            </div>
            <div className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl`}>
              <div>
                <p className={`text-sm ${textSecondary}`}>Online Riders</p>
                <p className={`text-2xl font-bold ${textPrimary}`}>
                  {activeRiders.filter((r) => r.status === "online").length}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`font-semibold ${textPrimary} text-lg`}>Recent Orders</h3>
            <button
              onClick={() => setCurrentView("orders")}
              className="text-red-600 text-sm font-medium hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{order.id}</p>
                    <p className="text-xs text-gray-600">{order.customerName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{order.total}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "in-progress"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800 text-lg">Pending Applications</h3>
            <button
              onClick={() => setCurrentView("applications")}
              className="text-red-600 text-sm font-medium hover:underline"
            >
              Review All
            </button>
          </div>
          <div className="space-y-3">
            {riderApplications
              .filter((app) => app.status === "pending")
              .slice(0, 5)
              .map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden">
                      <img src="/rider.jpg" alt="Rider" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{app.name}</p>
                      <p className="text-xs text-gray-600">{app.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmApproval(app.id);
                      }}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmRejection(app.id);
                      }}
                      className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Rider Applications View
  const ApplicationsView = () => (
    <div className="space-y-6">
      <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className={`w-5 h-5 ${textSecondary} absolute left-4 top-1/2 -translate-y-1/2`} />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 border ${inputBg} rounded-xl focus:outline-none focus:border-red-500`}
            />
          </div>
          <button
            onClick={() => showToastMessage("Filter options coming soon!", "info")}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button
            onClick={() => handleExportData("applications")}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {filteredApplications.filter((app) => app.status === "pending").length === 0 ? (
        <div className={`${cardBg} rounded-2xl p-16 shadow-sm text-center`}>
          <div className={`w-20 h-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <UserCheck className={`w-10 h-10 ${textSecondary}`} />
          </div>
          <p className={`${textSecondary} font-medium text-lg`}>No pending applications</p>
          <p className={`text-sm ${textSecondary} mt-2`}>All applications have been reviewed</p>
        </div>
      ) : (
        <div className={`${tableBg} rounded-2xl shadow-sm overflow-hidden`}>
          <table className="w-full">
            <thead className={`${tableHeaderBg} border-b ${borderColor}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Applicant</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Contact</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Address</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Vehicle</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Applied Date</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Status</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${borderColor}`}>
              {filteredApplications
                .filter((app) => app.status === "pending")
                .map((app) => (
                  <tr key={app.id} className={`${tableRowHover} transition`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${darkMode ? 'bg-red-900/30' : 'bg-red-100'} rounded-full flex items-center justify-center overflow-hidden`}>
                          <img src="/rider.jpg" alt="Rider" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className={`font-medium ${textPrimary}`}>{app.name}</p>
                          <p className={`text-xs ${textSecondary}`}>{app.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-sm ${textPrimary}`}>{app.phone}</p>
                      <p className={`text-xs ${textSecondary}`}>{app.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-sm ${textPrimary}`}>{app.address}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-sm ${textPrimary}`}>{app.vehicleType}</p>
                      <p className={`text-xs ${textSecondary}`}>{app.vehiclePlate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-sm ${textPrimary}`}>{app.appliedDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                        Pending Review
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => confirmApproval(app.id)}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmRejection(app.id)}
                          className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleViewApplicationDetails(app)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  // Active Riders View
  const RidersView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search riders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>
          <button
            onClick={() => showToastMessage("Filter options coming soon!", "info")}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button
            onClick={() => handleExportData("riders")}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rider</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Contact</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vehicle</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Deliveries</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Earnings</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRiders.map((rider) => (
              <tr key={rider.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center overflow-hidden relative">
                      <img src="/rider.jpg" alt="Rider" className="w-full h-full object-cover" />
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          rider.status === "online"
                            ? "bg-green-500"
                            : rider.status === "busy"
                            ? "bg-orange-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{rider.name}</p>
                      <p className="text-xs text-gray-600">{rider.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-800">{rider.phone}</p>
                  <p className="text-xs text-gray-600">{rider.email}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-800">{rider.vehicle}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      rider.status === "online"
                        ? "bg-green-100 text-green-600"
                        : rider.status === "busy"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {rider.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-800">{rider.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-800">{rider.totalDeliveries}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-green-600">{rider.earnings}</p>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleViewRiderDetails(rider)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5 text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Orders View
  const OrdersView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>
          <button
            onClick={() => showToastMessage("Filter options coming soon!", "info")}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button
            onClick={() => handleExportData("orders")}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rider</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Route</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-800">{order.id}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-800">{order.customerName}</p>
                  <p className="text-xs text-gray-600">{order.customerId}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-800">{order.riderName}</p>
                  <p className="text-xs text-gray-600">{order.riderId}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-gray-800">
                      <span className="text-gray-600">From:</span> {order.from}
                    </p>
                    <p className="text-gray-800">
                      <span className="text-gray-600">To:</span> {order.to}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "in-progress"
                        ? "bg-blue-100 text-blue-600"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-800">{order.total}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">{order.createdAt}</p>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleViewOrderDetails(order)}
                    className="text-red-600 font-medium text-sm hover:underline flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Customers View
  const CustomersView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Customers</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalCustomers}</p>
            </div>
            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Today</p>
              <p className="text-3xl font-bold text-gray-800">342</p>
            </div>
            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">New This Week</p>
              <p className="text-3xl font-bold text-gray-800">127</p>
            </div>
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>
          <button
            onClick={() => handleExportData("customers")}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
            Export
          </button>
        </div>

        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium text-lg">Customer Management</p>
          <p className="text-sm text-gray-500 mt-2">
            View and manage customer accounts, orders, and preferences
          </p>
        </div>
      </div>
    </div>
  );

  // Service Tickets View
  const TicketsView = () => {
    const getServiceIcon = (serviceType: ServiceTicket["serviceType"]) => {
      switch (serviceType) {
        case "plumbing":
          return <Droplet className="w-5 h-5 text-blue-600" />;
        case "electrician":
          return <Zap className="w-5 h-5 text-yellow-600" />;
        case "painting":
          return <Paintbrush className="w-5 h-5 text-purple-600" />;
        case "cleaning":
        case "aircon":
        case "carpentry":
        default:
          return <Wrench className="w-5 h-5 text-gray-600" />;
      }
    };

    const getPriorityColor = (priority: ServiceTicket["priority"]) => {
      switch (priority) {
        case "urgent":
          return "bg-red-100 text-red-600";
        case "high":
          return "bg-orange-100 text-orange-600";
        case "medium":
          return "bg-yellow-100 text-yellow-600";
        case "low":
          return "bg-green-100 text-green-600";
        default:
          return "bg-gray-100 text-gray-600";
      }
    };

    const getStatusColor = (status: ServiceTicket["status"]) => {
      switch (status) {
        case "open":
          return "bg-blue-100 text-blue-600";
        case "assigned":
          return "bg-purple-100 text-purple-600";
        case "in-progress":
          return "bg-orange-100 text-orange-600";
        case "resolved":
          return "bg-green-100 text-green-600";
        case "closed":
          return "bg-gray-100 text-gray-600";
        default:
          return "bg-gray-100 text-gray-600";
      }
    };

    return (
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-xl flex items-center justify-center`}>
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className={`text-3xl font-bold ${textPrimary} mb-1`}>{stats.openTickets}</p>
            <p className={`text-sm ${textSecondary}`}>Open Tickets</p>
          </div>

          <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${darkMode ? 'bg-red-900/30' : 'bg-red-50'} rounded-xl flex items-center justify-center`}>
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className={`text-3xl font-bold ${textPrimary} mb-1`}>{stats.urgentTickets}</p>
            <p className={`text-sm ${textSecondary}`}>Urgent</p>
          </div>

          <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${darkMode ? 'bg-orange-900/30' : 'bg-orange-50'} rounded-xl flex items-center justify-center`}>
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className={`text-3xl font-bold ${textPrimary} mb-1`}>
              {serviceTickets.filter((t) => t.status === "in-progress").length}
            </p>
            <p className={`text-sm ${textSecondary}`}>In Progress</p>
          </div>

          <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${darkMode ? 'bg-green-900/30' : 'bg-green-50'} rounded-xl flex items-center justify-center`}>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className={`text-3xl font-bold ${textPrimary} mb-1`}>
              {serviceTickets.filter((t) => t.status === "resolved").length}
            </p>
            <p className={`text-sm ${textSecondary}`}>Resolved</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className={`w-5 h-5 ${textSecondary} absolute left-4 top-1/2 -translate-y-1/2`} />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 border ${inputBg} rounded-xl focus:outline-none focus:border-red-500`}
              />
            </div>
            <button
              onClick={() => showToastMessage("Filter options coming soon!", "info")}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button
              onClick={() => handleExportData("tickets")}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Tickets Table */}
        <div className={`${tableBg} rounded-2xl shadow-sm overflow-hidden`}>
          <table className="w-full">
            <thead className={`${tableHeaderBg} border-b ${borderColor}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Ticket</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Customer</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Service</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Priority</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Status</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Assigned To</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Created</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${textPrimary}`}>Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${borderColor}`}>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className={`${tableRowHover} transition`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                        {getServiceIcon(ticket.serviceType)}
                      </div>
                      <div>
                        <p className={`font-medium ${textPrimary}`}>{ticket.title}</p>
                        <p className={`text-xs ${textSecondary}`}>{ticket.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-sm ${textPrimary}`}>{ticket.customerName}</p>
                    <p className={`text-xs ${textSecondary}`}>{ticket.customerPhone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                      {ticket.serviceType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)} uppercase`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)} capitalize`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ticket.assignedToName ? (
                      <p className={`text-sm ${textPrimary}`}>{ticket.assignedToName}</p>
                    ) : (
                      <p className={`text-sm ${textSecondary} italic`}>Unassigned</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-sm ${textPrimary}`}>{ticket.createdAt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenChat(ticket.id)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition relative"
                        title="Open Chat"
                      >
                        <MessageSquare className="w-4 h-4" />
                        {ticket.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {ticket.unreadCount}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => handleViewTicketDetails(ticket)}
                        className={`p-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition`}
                        title="View Details"
                      >
                        <Eye className={`w-4 h-4 ${textSecondary}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Settings View
  const SettingsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-6 text-lg">Platform Settings</h3>
          <div className="space-y-3">
            <button
              onClick={() => showToastMessage("Platform configuration settings coming soon!", "info")}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Platform Configuration</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={() => showToastMessage("Pricing & fees settings coming soon!", "info")}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Pricing & Fees</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={() => showToastMessage("Notification settings coming soon!", "info")}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Notifications</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button
              onClick={() => showToastMessage("Reports & analytics coming soon!", "info")}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Reports & Analytics</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-6 text-lg">Account</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Admin Account</p>
              <p className="font-medium text-gray-800">admin@sugo.com</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Role</p>
              <p className="font-medium text-gray-800">Super Administrator</p>
            </div>
            <button
              onClick={() => showToastMessage("Logout functionality would be implemented here", "info")}
              className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition flex items-center justify-center gap-2 mt-6">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Toast Notification
  const ToastNotification = () => (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 ${
          toastType === "success"
            ? "bg-green-600 text-white"
            : toastType === "error"
            ? "bg-red-600 text-white"
            : "bg-blue-600 text-white"
        }`}
      >
        {toastType === "success" && <CheckCircle className="w-5 h-5" />}
        {toastType === "error" && <XCircle className="w-5 h-5" />}
        {toastType === "info" && <AlertCircle className="w-5 h-5" />}
        <p className="font-medium">{toastMessage}</p>
      </div>
    </div>
  );

  // Confirm Modal
  const ConfirmModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`${modalBg} rounded-2xl max-w-md w-full p-6 shadow-xl`}>
        <h3 className={`text-xl font-bold ${textPrimary} mb-2`}>
          {confirmAction?.type === "approve" ? "Approve Application?" : "Reject Application?"}
        </h3>
        <p className={`${textSecondary} mb-6`}>
          {confirmAction?.type === "approve"
            ? "Are you sure you want to approve this rider application? This will grant them access to the platform."
            : "Are you sure you want to reject this application? This action cannot be undone."}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowConfirmModal(false)}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={executeConfirmAction}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition ${
              confirmAction?.type === "approve"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {confirmAction?.type === "approve" ? "Approve" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );

  // Application Details Modal
  const ApplicationDetailsModal = () => {
    if (!selectedItem) return null;
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{selectedItem.name}</h3>
              <p className="text-gray-600">{selectedItem.id}</p>
            </div>
            <button
              onClick={() => setShowApplicationDetails(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/rider.jpg" alt="Rider" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Phone Number</label>
                <p className="font-medium text-gray-800">{selectedItem.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Email</label>
                <p className="font-medium text-gray-800">{selectedItem.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Address</label>
                <p className="font-medium text-gray-800">{selectedItem.address}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Vehicle Type</label>
                <p className="font-medium text-gray-800">{selectedItem.vehicleType}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Plate Number</label>
                <p className="font-medium text-gray-800">{selectedItem.vehiclePlate}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Applied Date</label>
                <p className="font-medium text-gray-800">{selectedItem.appliedDate}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  confirmApproval(selectedItem.id);
                  setShowApplicationDetails(false);
                }}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => {
                  confirmRejection(selectedItem.id);
                  setShowApplicationDetails(false);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Rider Details Modal
  const RiderDetailsModal = () => {
    if (!selectedItem) return null;
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{selectedItem.name}</h3>
              <p className="text-gray-600">{selectedItem.id}</p>
            </div>
            <button
              onClick={() => setShowRiderDetails(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center overflow-hidden relative">
                <img src="/rider.jpg" alt="Rider" className="w-full h-full object-cover" />
                <div
                  className={`absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white ${
                    selectedItem.status === "online"
                      ? "bg-green-500"
                      : selectedItem.status === "busy"
                      ? "bg-orange-500"
                      : "bg-gray-400"
                  }`}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-4 flex-1">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-gray-800">{selectedItem.totalDeliveries}</p>
                  <p className="text-xs text-gray-600">Deliveries</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <p className="text-2xl font-bold text-gray-800">{selectedItem.rating}</p>
                  </div>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedItem.earnings}</p>
                  <p className="text-xs text-gray-600">Earnings</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Phone Number</label>
                <p className="font-medium text-gray-800">{selectedItem.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Email</label>
                <p className="font-medium text-gray-800">{selectedItem.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Vehicle</label>
                <p className="font-medium text-gray-800">{selectedItem.vehicle}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Joined Date</label>
                <p className="font-medium text-gray-800">{selectedItem.joinedDate}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Current Status</label>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedItem.status === "online"
                      ? "bg-green-100 text-green-600"
                      : selectedItem.status === "busy"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selectedItem.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => handleToggleRiderStatus(selectedItem.id)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Toggle Status
              </button>
              <button
                onClick={() => setShowRiderDetails(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Order Details Modal
  const OrderDetailsModal = () => {
    if (!selectedItem) return null;
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Order {selectedItem.id}</h3>
              <p className="text-gray-600">{selectedItem.createdAt}</p>
            </div>
            <button
              onClick={() => setShowOrderDetails(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">Order Status</h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedItem.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : selectedItem.status === "in-progress"
                      ? "bg-blue-100 text-blue-600"
                      : selectedItem.status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {selectedItem.status}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-800">{selectedItem.total}</div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 block mb-1">Customer</label>
                <p className="font-medium text-gray-800">{selectedItem.customerName}</p>
                <p className="text-sm text-gray-600">{selectedItem.customerId}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 block mb-1">Rider</label>
                <p className="font-medium text-gray-800">{selectedItem.riderName}</p>
                <p className="text-sm text-gray-600">{selectedItem.riderId}</p>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-3">Route</label>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pickup</p>
                    <p className="font-medium text-gray-800">{selectedItem.from}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Drop-off</p>
                    <p className="font-medium text-gray-800">{selectedItem.to}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowOrderDetails(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Ticket Details Modal
  const TicketDetailsModal = () => {
    if (!selectedItem) return null;
    
    const getServiceIcon = (serviceType: ServiceTicket["serviceType"]) => {
      switch (serviceType) {
        case "plumbing":
          return <Droplet className="w-6 h-6 text-blue-600" />;
        case "electrician":
          return <Zap className="w-6 h-6 text-yellow-600" />;
        case "painting":
          return <Paintbrush className="w-6 h-6 text-purple-600" />;
        case "cleaning":
        case "aircon":
        case "carpentry":
        default:
          return <Wrench className="w-6 h-6 text-gray-600" />;
      }
    };

    const getPriorityColor = (priority: ServiceTicket["priority"]) => {
      switch (priority) {
        case "urgent":
          return "bg-red-100 text-red-600";
        case "high":
          return "bg-orange-100 text-orange-600";
        case "medium":
          return "bg-yellow-100 text-yellow-600";
        case "low":
          return "bg-green-100 text-green-600";
        default:
          return "bg-gray-100 text-gray-600";
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className={`${modalBg} rounded-2xl max-w-3xl w-full p-8 shadow-xl max-h-[90vh] overflow-y-auto`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl flex items-center justify-center`}>
                {getServiceIcon(selectedItem.serviceType)}
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${textPrimary}`}>{selectedItem.title}</h3>
                <p className={textSecondary}>{selectedItem.id}</p>
              </div>
            </div>
            <button
              onClick={() => setShowTicketDetails(false)}
              className={`p-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition`}
            >
              <X className={`w-6 h-6 ${textSecondary}`} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Status and Priority */}
            <div className="grid grid-cols-3 gap-4">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-4`}>
                <p className={`text-sm ${textSecondary} mb-2`}>Status</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedItem.status === "open" ? "bg-blue-100 text-blue-600" :
                  selectedItem.status === "assigned" ? "bg-purple-100 text-purple-600" :
                  selectedItem.status === "in-progress" ? "bg-orange-100 text-orange-600" :
                  selectedItem.status === "resolved" ? "bg-green-100 text-green-600" :
                  "bg-gray-100 text-gray-600"
                } capitalize`}>
                  {selectedItem.status}
                </span>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-4`}>
                <p className={`text-sm ${textSecondary} mb-2`}>Priority</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedItem.priority)} uppercase`}>
                  {selectedItem.priority}
                </span>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-4`}>
                <p className={`text-sm ${textSecondary} mb-2`}>Service Type</p>
                <p className={`font-medium ${textPrimary} capitalize`}>{selectedItem.serviceType}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-6`}>
              <h4 className={`font-semibold ${textPrimary} mb-4`}>Customer Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-sm ${textSecondary} block mb-1`}>Name</label>
                  <p className={`font-medium ${textPrimary}`}>{selectedItem.customerName}</p>
                </div>
                <div>
                  <label className={`text-sm ${textSecondary} block mb-1`}>Phone</label>
                  <p className={`font-medium ${textPrimary}`}>{selectedItem.customerPhone}</p>
                </div>
                <div className="col-span-2">
                  <label className={`text-sm ${textSecondary} block mb-1`}>Location</label>
                  <p className={`font-medium ${textPrimary}`}>{selectedItem.location}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={`text-sm ${textSecondary} block mb-2`}>Description</label>
              <p className={`${textPrimary} leading-relaxed`}>{selectedItem.description}</p>
            </div>

            {/* Assignment Info */}
            {selectedItem.assignedToName && (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-6`}>
                <h4 className={`font-semibold ${textPrimary} mb-4`}>Assigned To</h4>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full flex items-center justify-center`}>
                    <Users className={`w-6 h-6 ${textSecondary}`} />
                  </div>
                  <div>
                    <p className={`font-medium ${textPrimary}`}>{selectedItem.assignedToName}</p>
                    <p className={`text-sm ${textSecondary}`}>{selectedItem.assignedTo}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Last Message */}
            {selectedItem.lastMessage && (
              <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} rounded-xl p-4`}>
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className={`text-sm ${textSecondary} mb-1`}>Last Message</p>
                    <p className={`${textPrimary}`}>{selectedItem.lastMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className={`text-sm ${textSecondary} pt-4 border-t ${borderColor}`}>
              <p>Created: {selectedItem.createdAt}</p>
              {selectedItem.unreadCount > 0 && (
                <p className="mt-1">Unread messages: {selectedItem.unreadCount}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => handleOpenChat(selectedItem.id)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Open Chat
                {selectedItem.unreadCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {selectedItem.unreadCount}
                  </span>
                )}
              </button>
              {!selectedItem.assignedToName && selectedItem.status === "open" && (
                <button
                  onClick={() => {
                    handleAssignTicket(selectedItem.id, "PRO-003", "Sample Provider");
                    setShowTicketDetails(false);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  Assign Provider
                </button>
              )}
              {selectedItem.status !== "closed" && selectedItem.status !== "resolved" && (
                <button
                  onClick={() => {
                    handleUpdateTicketStatus(selectedItem.id, "resolved");
                    setShowTicketDetails(false);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Resolved
                </button>
              )}
              <button
                onClick={() => setShowTicketDetails(false)}
                className={`flex-1 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'} py-2 rounded-lg text-sm font-medium ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'} transition`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Ticket Chat Modal
  const TicketChatModal = () => {
    if (!selectedItem) return null;

    const [chatMessages, setChatMessages] = useState([
      {
        id: 1,
        sender: "customer",
        message: "Hello, I need help with my plumbing issue",
        time: "10:30 AM",
      },
      {
        id: 2,
        sender: "admin",
        message: "Hi! I've received your ticket. A plumber will be assigned to you shortly.",
        time: "10:32 AM",
      },
      {
        id: 3,
        sender: "provider",
        message: "Hello! I'm Roberto, your assigned plumber. I'll be there in 30 minutes.",
        time: "10:35 AM",
      },
    ]);

    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
      if (!newMessage.trim()) return;
      
      const message = {
        id: chatMessages.length + 1,
        sender: "admin",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      
      setChatMessages(prev => [...prev, message]);
      setNewMessage("");
    };

    const getServiceIcon = (serviceType: ServiceTicket["serviceType"]) => {
      switch (serviceType) {
        case "plumbing":
          return <Droplet className="w-5 h-5 text-blue-600" />;
        case "electrician":
          return <Zap className="w-5 h-5 text-yellow-600" />;
        case "painting":
          return <Paintbrush className="w-5 h-5 text-purple-600" />;
        case "cleaning":
        case "aircon":
        case "carpentry":
        default:
          return <Wrench className="w-5 h-5 text-gray-600" />;
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className={`${modalBg} rounded-2xl max-w-4xl w-full h-[80vh] flex flex-col shadow-xl`}>
          <div className={`flex items-center justify-between p-4 border-b ${borderColor}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                {getServiceIcon(selectedItem.serviceType)}
              </div>
              <div>
                <h3 className={`font-semibold ${textPrimary}`}>{selectedItem.title}</h3>
                <p className={`text-sm ${textSecondary}`}>{selectedItem.id}</p>
              </div>
            </div>
            <button
              onClick={() => setShowTicketChat(false)}
              className={`p-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition`}
            >
              <X className={`w-5 h-5 ${textSecondary}`} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                    msg.sender === "admin"
                      ? "bg-blue-600 text-white"
                      : msg.sender === "customer"
                      ? "bg-gray-600 text-white"
                      : "bg-green-600 text-white"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`p-4 border-t ${borderColor}`}>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className={`flex-1 px-4 py-2 border ${inputBg} rounded-lg focus:border-blue-500 focus:outline-none`}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Notifications Panel
  const NotificationsPanel = () => (
    <div className="fixed top-20 right-4 w-96 bg-white rounded-2xl shadow-xl p-6 z-40 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-lg">Notifications</h3>
        <button
          onClick={() => setShowNotifications(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="space-y-3">
        {riderApplications.filter(app => app.status === "pending").map((app) => (
          <div
            key={app.id}
            className="p-4 bg-orange-50 rounded-xl cursor-pointer hover:bg-orange-100 transition"
            onClick={() => {
              handleViewApplicationDetails(app);
              setShowNotifications(false);
            }}
          >
            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-orange-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-800">New Application</p>
                <p className="text-sm text-gray-600">{app.name} applied for rider position</p>
              </div>
            </div>
          </div>
        ))}
        {riderApplications.filter(app => app.status === "pending").length === 0 && (
          <p className="text-center text-gray-500 py-8">No new notifications</p>
        )}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-50'} flex transition-colors duration-300`}>
      <Sidebar />

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <div className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-10 transition-colors duration-300`}>
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {currentView === "overview" && "Dashboard overview and analytics"}
                {currentView === "applications" && "Review and approve rider applications"}
                {currentView === "riders" && "Manage active riders"}
                {currentView === "orders" && "Monitor all orders"}
                {currentView === "tickets" && "Manage service tickets and customer requests"}
                {currentView === "customers" && "Customer management"}
                {currentView === "settings" && "Platform settings and configuration"}
              </p>
            </div>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition`}
            >
              <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              {stats.pendingApplications > 0 && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {currentView === "overview" && <OverviewView />}
          {currentView === "applications" && <ApplicationsView />}
          {currentView === "riders" && <RidersView />}
          {currentView === "orders" && <OrdersView />}
          {currentView === "tickets" && <TicketsView />}
          {currentView === "customers" && <CustomersView />}
          {currentView === "settings" && <SettingsView />}
        </div>
      </div>

      {/* Modals and Overlays */}
      {showToast && <ToastNotification />}
      {showConfirmModal && <ConfirmModal />}
      {showApplicationDetails && <ApplicationDetailsModal />}
      {showRiderDetails && <RiderDetailsModal />}
      {showOrderDetails && <OrderDetailsModal />}
      {showTicketDetails && <TicketDetailsModal />}
      {showTicketChat && <TicketChatModal />}
      {showNotifications && <NotificationsPanel />}
    </div>
  );
}
