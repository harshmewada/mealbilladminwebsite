import React from "react";
import { useSelector } from "react-redux";
import BranchAdminSettings from "./BranchAdminSettings";
import BranchUserSettings from "./BranchUserSettings";

const Settings = () => {
  const role = useSelector((state) => state.user.role);

  const RenderComp = {
    branchuser: BranchUserSettings,
    branchadmin: BranchAdminSettings,
  };
  const Comp = RenderComp[role];
  return (
    <div>
      <Comp />
    </div>
  );
};

export default Settings;
