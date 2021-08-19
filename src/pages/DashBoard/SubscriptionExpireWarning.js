import React from "react";

const SubscriptionExpireWarning = ({ remainingDays }) => {
  return (
    <div class="page-content-tab  mb-0 pb-4">
      <div class=" alert alert-danger alert-danger-shadow mb-0 fade show">
        <strong>Your subscription is about to expire.</strong> You have{" "}
        <strong className="h4 text-white">{remainingDays}</strong> days
        remaining. Please contact mealbill to purchase a new subsription.
      </div>
    </div>
  );
};

export default SubscriptionExpireWarning;
