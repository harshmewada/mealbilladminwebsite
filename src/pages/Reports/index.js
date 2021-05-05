import React from "react";
import ReportCreator from "./ReportCreator";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getReport } from "../../redux/action/reportActions";
import reportData from "./ReportLayoutData";
import { Card } from "react-bootstrap";
import { getAllBranches } from "../../redux/action/branchActions";
const Reports = () => {
  const { role, restaurantId, branchId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { reportType } = useParams();
  const { data, isLoading } = useSelector((state) => state.report);

  const getData = (data) => {
    dispatch(getReport(data));
  };

  const CurrentReport = reportData[role];
  const CurrentReportData = CurrentReport[reportType];
  const dataVariable = CurrentReportData.dataVariable || "data";
  const branches = useSelector((state) => state.branch.allBranches);

  const intialFunction = () => {
    dispatch(getAllBranches(restaurantId));
  };

  return (
    <div>
      {CurrentReportData ? (
        <ReportCreator
          role={role}
          reportInfo={CurrentReportData}
          reportData={data}
          getData={(data) => getData(data)}
          initialEffectFunction={() => intialFunction()}
          optionData={{ branchId: branches }}
        />
      ) : (
        <Card>
          <Card.Body>No Report Avaialble</Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Reports;
