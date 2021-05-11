import React from "react";
import { Curreny } from "../../redux/types";

const IconsGrid = ({ headers, data, headerVariable, isCurrency }) => {
  console.log("iconsgrid ", data);
  return (
    <div class="row">
      {data ? (
        <>
          {headerVariable ? (
            headerVariable.map((head, index) => {
              return (
                <div class="col-md-6 col-lg-3">
                  <div class="card shadow-none border report-card">
                    <div class="card-body">
                      <div class="row d-flex justify-content-center">
                        <div class="col-9">
                          <p
                            class=" mb-1 font-weight-semibold font-13 "
                            style={{ color: "#f0583c" }}
                          >
                            {head}
                          </p>
                          <h3 class="my-2">
                            {isCurrency ? Curreny : ""}
                            {head.isCurrency && Curreny}
                            {data[head] || 0}
                          </h3>
                        </div>

                        <div class="col-3 align-self-center">
                          <div class=" bg-light-alt">
                            <i
                              class={`${head.icon} `}
                              style={{ color: "#f0583c", fontSize: 30 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : headers ? (
            headers.map((head, index) => {
              return (
                <div class="col-md-6 col-lg-3">
                  <div class="card shadow-none border report-card">
                    <div class="card-body">
                      <div class="row d-flex justify-content-center">
                        <div class="col-9">
                          <p
                            class=" mb-1 font-weight-semibold font-13 "
                            style={{ color: "#2e3846" }}
                          >
                            {head.title}
                          </p>
                          <h3 class="my-2">
                            {!head.hideCurrency
                              ? isCurrency
                                ? Curreny
                                : ""
                              : ""}

                            {data[head.key] || 0}
                          </h3>
                          {/* <p class="mb-0 text-truncate">
                        <span class="text-success">
                          <i class="mdi mdi-trending-up"></i>10.5%
                        </span>{" "}
                        Completions Weekly
                      </p> */}
                        </div>
                        <div class="col-3 align-self-center">
                          <div>
                            <i
                              class={`${head.icon} `}
                              style={{ color: "#f0583c", fontSize: 30 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div class="col-lg-12">
              <p class="text-center">No Data available</p>
            </div>
          )}
        </>
      ) : (
        <div class="col-lg-12">
          <p class="text-center">No Data available</p>
        </div>
      )}
    </div>
  );
};

export default IconsGrid;
