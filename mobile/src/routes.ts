import { createBrowserRouter } from "react-router";
import { LoginScreen } from "./components/auth/LoginScreen";
import { RegistrationScreen } from "./components/auth/RegistrationScreen";

// Farmer Screens
import { FarmerDashboard } from "./components/farmer/FarmerDashboard";
import { FarmerMapView } from "./components/farmer/FarmerMapView";
import { FarmerAlerts } from "./components/farmer/FarmerAlerts";
import { FarmerReports } from "./components/farmer/FarmerReports";
import { FarmerWorkApproval } from "./components/farmer/FarmerWorkApproval";

// Operator Screens
import { OperatorDashboard } from "./components/operator/OperatorDashboard";
import { OperatorJobDetails } from "./components/operator/OperatorJobDetails";
import { OperatorWorkControl } from "./components/operator/OperatorWorkControl";
import { OperatorTelemetry } from "./components/operator/OperatorTelemetry";
import { OperatorThresholds } from "./components/operator/OperatorThresholds";
import { OperatorEarnings } from "./components/operator/OperatorEarnings";

// Owner Screens
import { OwnerDashboard } from "./components/owner/OwnerDashboard";
import { OwnerFleetManagement } from "./components/owner/OwnerFleetManagement";
import { OwnerAddTractor } from "./components/owner/OwnerAddTractor";
import { OwnerAddImplement } from "./components/owner/OwnerAddImplement";
import { OwnerMachineDetails } from "./components/owner/OwnerMachineDetails";
import { OwnerFleetTracking } from "./components/owner/OwnerFleetTracking";
import { OwnerTelemetry } from "./components/owner/OwnerTelemetry";
import { OwnerReports } from "./components/owner/OwnerReports";

// System Screens
import { NotificationsScreen } from "./components/system/NotificationsScreen";
import { DecisionSupport } from "./components/system/DecisionSupport";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginScreen,
  },
  {
    path: "/register",
    Component: RegistrationScreen,
  },
  // Farmer Routes
  {
    path: "/farmer/dashboard",
    Component: FarmerDashboard,
  },
  {
    path: "/farmer/map",
    Component: FarmerMapView,
  },
  {
    path: "/farmer/alerts",
    Component: FarmerAlerts,
  },
  {
    path: "/farmer/reports",
    Component: FarmerReports,
  },
  {
    path: "/farmer/approval/:workId",
    Component: FarmerWorkApproval,
  },
  // Operator Routes
  {
    path: "/operator/dashboard",
    Component: OperatorDashboard,
  },
  {
    path: "/operator/job/:jobId",
    Component: OperatorJobDetails,
  },
  {
    path: "/operator/work/:jobId",
    Component: OperatorWorkControl,
  },
  {
    path: "/operator/telemetry",
    Component: OperatorTelemetry,
  },
  {
    path: "/operator/thresholds",
    Component: OperatorThresholds,
  },
  {
    path: "/operator/earnings",
    Component: OperatorEarnings,
  },
  // Owner Routes
  {
    path: "/owner/dashboard",
    Component: OwnerDashboard,
  },
  {
    path: "/owner/fleet",
    Component: OwnerFleetManagement,
  },
  {
    path: "/owner/add-tractor",
    Component: OwnerAddTractor,
  },
  {
    path: "/owner/add-implement",
    Component: OwnerAddImplement,
  },
  {
    path: "/owner/machine/:machineId",
    Component: OwnerMachineDetails,
  },
  {
    path: "/owner/tracking",
    Component: OwnerFleetTracking,
  },
  {
    path: "/owner/telemetry/:machineId",
    Component: OwnerTelemetry,
  },
  {
    path: "/owner/reports",
    Component: OwnerReports,
  },
  // System Routes
  {
    path: "/notifications",
    Component: NotificationsScreen,
  },
  {
    path: "/decision-support",
    Component: DecisionSupport,
  },
]);
