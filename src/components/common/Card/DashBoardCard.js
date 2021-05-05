import React from "react";

function DashBoardCard({ data }) {
  const { title, value, icon, color } = data;

  function adjust(color, amount) {
    return (
      color &&
      "#" +
        color
          .replace(/^#/, "")
          .replace(/../g, (color) =>
            (
              "0" +
              Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(
                16
              )
            ).substr(-2)
          )
    );
  }
  return (
    <div class="col-md-6 col-lg-3">
      <div class="card report-card">
        <div class="card-body">
          <div class="row d-flex justify-content-center">
            <div class="col-8">
              <p class="text-dark font-weight-semibold font-14">Sessions</p>
              <h3 class="my-3">24k</h3>
              {/* <p class="mb-0 text-truncate">
                <span class="text-success">
                  <i class="mdi mdi-trending-up"></i>8.5%
                </span>{" "}
                New Sessions Today
              </p> */}
            </div>
            <div class="col-4 align-self-center">
              <div class="report-main-icon bg-light-alt">
                <i
                  class={`feather ${icon} align-self-center`}
                  style={{
                    color: color,
                    fill: adjust(color, 20),
                    fontSize: 50,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardCard;
