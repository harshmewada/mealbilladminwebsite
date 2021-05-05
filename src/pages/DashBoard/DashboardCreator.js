import React from "react";
import { Card } from "react-bootstrap";
import ReportSelector from "../../components/ReportSelector";
import * as layouts from "../../components/ReportLayouts/index";

const DashboardCreator = ({
  reportData,
  initialEffectFunction,

  reportInfo,
}) => {
  const reportLayouts = reportInfo;
  React.useEffect(() => {
    initialEffectFunction();
  }, []);
  return (
    <div class="page-content-tab">
      {reportLayouts && (
        <div class="row">
          {reportLayouts.map((lay, index) => {
            const width = lay.width || 12;
            const Component = layouts[lay.type];
            return (
              <div class={`col-lg-${width}`}>
                {Component ? (
                  <Component
                    {...lay}
                    data={reportData[lay.dataVariable] || []}
                    headerVariable={reportData[lay.headerVariable]}
                  />
                ) : (
                  <div>not Layout Found</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardCreator;
