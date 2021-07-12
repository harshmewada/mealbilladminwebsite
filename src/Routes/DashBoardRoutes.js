import React from "react";
import { Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ManageBranches from "../pages/Branches/ManageBranches";
import ManageItemCategories from "../pages/ItemCategories/ManageItemCategories";
import ManageItems from "../pages/Items/ManageItems";
import ManageTables from "../pages/Tables/ManageTables";
import ManageHotKeys from "../pages/HotKeys/ManageHotKeys";
import ManageTableTypes from "../pages/TableTypes/index";
// import ManageCategoryTypes from "../pages/CategoryTypes/index";
import ManageExpense from "../pages/Expense/index";
import ManageBranchExpense from "../pages/Expense/BranchExpense";

import AddRestaurant from "../pages/Restaurant/ManageRestaurant";
import ManageSubScriptions from "../pages/Subscriptions/ManageSubscriptions";
import ManageThemes from "../pages/Themes/ManageThemes";
import ManageUsers from "../pages/Users/ManageUsers";
import AddModal from "../pages/Users/ManageUsers/AddModal";
import { useSelector } from "react-redux";
import OrderDashboard from "../pages/OrderDashboard";

import LeftSideBar from "../components/LeftSideBar/index";
import TopBar from "../components/TopBar";
import DashBoard from "../pages/DashBoard";
import Reports from "../pages/Reports";
import ManageExpenseTypes from "../pages/ExpenseTypes";

import OrderHistory from "../pages/OrderHistory";

import ExpiredSubscription from "../pages/ExpiredSubscription";
import BranchAdminSettings from "../pages/Settings/BranchAdminSettings";

const DashBoardRoutes = () => {
  const role = useSelector((state) => state.user.role);
  const { pathname } = useLocation();

  const isBranchAdmin = role === "branchadmin";
  const isBranchUser = role === "branchuser";
  const isRestaurantAdmin = role === "branchuser";

  const superadmin = "superadmin";
  const restaurantadmin = "restaurantadmin";
  const branchadmin = "branchadmin";
  const branchuser = "branchuser";

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <TopBar hide={isBranchUser && pathname === "/"} />
      <div className="data-container" style={{ height: "100%" }}>
        <LeftSideBar />

        <div
          class="dashboard-container"
          style={{ height: "100%", width: "100%", overflow: "auto" }}
        >
          {isBranchUser && <Route exact path="/" component={OrderDashboard} />}
          <ProtectedRoute
            exact
            roles={[branchadmin, branchuser]}
            path="/order"
            component={OrderDashboard}
          />
          <ProtectedRoute
            exact
            roles={[superadmin, branchadmin, restaurantadmin]}
            path="/"
            component={DashBoard}
          />
          <ProtectedRoute
            roles={[superadmin]}
            path="/managerestaurant"
            component={AddRestaurant}
          />

          <ProtectedRoute
            roles={[superadmin, restaurantadmin]}
            path="/managebranches"
            component={ManageBranches}
          />

          <ProtectedRoute
            roles={[superadmin, restaurantadmin, branchadmin]}
            path="/manageusers"
            component={ManageUsers}
          />

          <ProtectedRoute
            roles={[superadmin, restaurantadmin]}
            path="/adduser"
            component={AddModal}
          />

          <ProtectedRoute
            roles={[superadmin]}
            path="/managethemes"
            component={ManageThemes}
          />

          <ProtectedRoute
            roles={[superadmin]}
            path="/managesubscriptions"
            component={ManageSubScriptions}
          />

          <ProtectedRoute
            roles={[restaurantadmin, superadmin, branchadmin]}
            path="/managecategories"
            component={ManageItemCategories}
          />

          <ProtectedRoute
            roles={[restaurantadmin, branchadmin]}
            path="/manageitems"
            component={ManageItems}
          />

          <ProtectedRoute
            roles={[restaurantadmin, branchadmin]}
            path="/managetables"
            component={ManageTables}
          />

          <ProtectedRoute
            roles={[restaurantadmin, branchadmin]}
            path="/managehotkeys"
            component={ManageHotKeys}
          />

          <ProtectedRoute
            roles={[superadmin]}
            path="/managetabletypes"
            component={ManageTableTypes}
          />
          <ProtectedRoute
            roles={[superadmin]}
            path="/manageexpensetypes"
            component={ManageExpenseTypes}
          />

          <ProtectedRoute
            roles={[restaurantadmin, branchadmin, branchuser]}
            path="/manageexpense"
            component={isRestaurantAdmin ? ManageExpense : ManageBranchExpense}
          />

          <ProtectedRoute
            roles={[restaurantadmin, branchadmin]}
            path="/orderhistory"
            component={OrderHistory}
          />

          <ProtectedRoute
            roles={[branchadmin, branchuser]}
            path="/settings"
            component={BranchAdminSettings}
          />
          {/* 
          <ProtectedRoute
            roles={[superadmin]}
            path="/managecategorytypes"
            component={ManageCategoryTypes}
          /> */}

          <ProtectedRoute
            roles={[restaurantadmin, branchadmin]}
            path="/reports/:reportType"
            component={Reports}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardRoutes;
