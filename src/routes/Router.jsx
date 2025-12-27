import { createBrowserRouter } from "react-router";

import RootLayOut from "../layouts/RootLayOut";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayouts from "../layouts/AuthLayouts";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import DashboardLayouts from "../Layouts/DashboardLayouts";
import DashboardHome from "../pages/dashboard/DashboardHome/DashboardHome";
import MyParcels from "../pages/dashboard/myParcels/MyParcels";
import Payment from "../pages/dashboard/Payment/Payment";
import PaymentHistory from "../pages/dashboard/PaymentHistory/PaymentHistory";
import PaymentSuccess from "../pages/dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/dashboard/Payment/PaymentCancelled";
import ApproveRiders from "../pages/dashboard/ApproveRiders/ApproveRiders";
import AssignedDeliveries from "../pages/dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../pages/dashboard/CompletedDeliveries/CompletedDeliveries";
import AssignRiders from "../pages/dashboard/AssignRiders/AssignRiders";
import UsersManagement from "../pages/dashboard/UsersManagement/UsersManagement";

import AdminRoute from "./AdminRoute";
import RiderRoute from "./RiderRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
        loader: () =>
          fetch("../../public/data/division.json").then(res => res.json())
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () =>
          fetch("../../public/data/division.json").then(res => res.json())
      },
      {
        path: "coverage",
        element: <Coverage />,
        loader: () =>
          fetch("../../public/data/warehouses.json").then(res => res.json())
      },
      {
        path: "parcel-track/:trackingId",
        element: <ParcelTrack />
      }
    ]
  },

  {
    path: "/",
    element: <AuthLayouts />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayouts />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: "my-parcels",
        element: <MyParcels />
      },
      {
        path: "payment/:parcelId",
        element: <Payment />
      },
      {
        path: "payment-history",
        element: <PaymentHistory />
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled />
      },

      // rider only
      {
        path: "assigned-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries />
          </RiderRoute>
        )
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries />
          </RiderRoute>
        )
      },

      // admin only
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders />
          </AdminRoute>
        )
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        )
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        )
      }
    ]
  }
]);
