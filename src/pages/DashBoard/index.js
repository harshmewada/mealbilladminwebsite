import React from "react";
import DashboardCreator from "./DashboardCreator";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getReport } from "../../redux/action/reportActions";
import reportData from "./ReportLayoutData";
import { Card } from "react-bootstrap";
import { getAllBranches } from "../../redux/action/branchActions";
import { getDashboard } from "../../redux/action/dashboardActions";
import SubscriptionExpireWarning from "./SubscriptionExpireWarning";
const Reports = () => {
  const { role, restaurantId, branchId, remainingDays } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector((state) => state.dashboard);

  const CurrentReport = reportData[role];
  const CurrentReportData = CurrentReport?.dashboardData;
  // const dataVariable = CurrentReportData.dataVariable || "data";

  const intialFunction = () => {
    dispatch(
      getDashboard({
        role: role,
        restaurantId,
        branchId,
      })
    );
  };

  return (
    <div>
      {remainingDays && (
        <SubscriptionExpireWarning remainingDays={remainingDays} />
      )}
      {CurrentReportData ? (
        <DashboardCreator
          reportInfo={CurrentReportData}
          reportData={data}
          initialEffectFunction={() => intialFunction()}
        />
      ) : (
        <Card>
          <Card.Body>No Data Avaialble</Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Reports;
