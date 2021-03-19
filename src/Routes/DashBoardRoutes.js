import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ManageBranches from "../pages/Branches/ManageBranches";
import ManageItemCategories from "../pages/ItemCategories/ManageItemCategories";
import ManageItems from "../pages/Items/ManageItems";
import ManageTables from "../pages/Tables/ManageTables";
import ManageHotKeys from "../pages/HotKeys/ManageHotKeys";

import AddRestaurant from "../pages/Restaurant/ManageRestaurant";
import ManageSubScriptions from "../pages/Subscriptions/ManageSubscriptions";
import ManageThemes from "../pages/Themes/ManageThemes";
import ManageUsers from "../pages/Users/ManageUsers";
import AddModal from "../pages/Users/ManageUsers/AddModal";
import { useSelector } from "react-redux";
import OrderDashboard from "../pages/OrderDashboard";
const DashBoardRoutes = () => {
  const role = useSelector((state) => state.user.role);

  const isBranchAdmin = role === "branchadmin";
  const isBranchUser = role === "branchuser";

  const superadmin = "superadmin";
  const restaurantadmin = "restaurantadmin";
  const branchadmin = "branchadmin";
  const branchuser = "branchuser";

  return (
    <>
      {(isBranchAdmin || isBranchUser) && (
        <Route exact path="/" component={OrderDashboard} />
      )}
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
        roles={[restaurantadmin, branchadmin]}
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
    </>
  );
};

export default DashBoardRoutes;
