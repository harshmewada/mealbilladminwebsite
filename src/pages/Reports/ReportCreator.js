import React from "react";
import { Card } from "react-bootstrap";
import ReportSelector from "../../components/ReportSelector";
import * as layouts from "../../components/ReportLayouts/index";

const ReportCreator = ({
  role,
  reportData,
  initialEffectFunction,
  getData,
  reportInfo,
  optionData,
}) => {
  const title = reportInfo?.title;
  const selectorData = reportInfo?.selectorFormData;
  const noPadding = reportInfo?.noPadding;

  const reportLayouts = reportInfo?.layouts;

  return (
    <div class="page-content-tab">
      {title && (
        <div class="card ">
          <div class="card-header bg-primary">
            <h4 class="text-white">{title}</h4>
          </div>
        </div>
      )}
      {selectorData && (
        <ReportSelector
          getReportData={(data) => {
            getData(data);
          }}
          formData={selectorData}
          initialEffectFunction={initialEffectFunction}
          optionData={optionData}
          noPadding={noPadding}
        />
      )}
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

export default ReportCreator;
