import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { SCOPES } from "../../contants";
import { SMALLLOGO } from "../../redux/types";
import PermissionGate from "../PermissionGate";

function LeftSidebar({ sidebarData }) {
  const [active, setActive] = React.useState(0);
  const { pathname } = useLocation();
  const history = useHistory();
  const activeValue = sidebarData[active];

  const handleNavigate = (link) => history.push(link);

  const handleIconClickNavigate = (data, index) => {
    setActive(index);
    if (data?.link) {
      return history.push(data?.link);
    }
    data?.children && history.push(data.children[0].link);
  };

  const isMobile = window.innerWidth < 700;
  return (
    <>
      <div class="leftbar-tab-menu">
        <div class="main-icon-menu">
          <a
            onClick={() => {
              handleNavigate("/");
            }}
            class="logo logo-metrica d-block text-center"
            style={{
              cursor: "pointer",
            }}
          >
            <span>
              <img
                src={SMALLLOGO}
                style={{ borderRadius: "100%" }}
                alt="logo-small"
                class="logo-sm"
              />
            </span>
          </a>
          <nav class="nav">
            {sidebarData?.map((data, index) => {
              return (
                <OverlayTrigger
                  key={index}
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-disabled">{data.title}</Tooltip>
                  }
                >
                  <button
                    // href={`${data.title + index}`}
                    class={`nav-link ${active === index ? "active" : ""}`}
                    // data-toggle="tooltip-custom"
                    // data-placement="right"
                    // data-trigger="hover"
                    // title={data.title}
                    // data-original-title={data.title}
                    onClick={() => {
                      handleIconClickNavigate(data, index);
                    }}
                  >
                    <i
                      // data-feather={data.icon}
                      class={`align-self-center menu-icon icon-dual ${data.icon}`}
                    ></i>
                  </button>
                </OverlayTrigger>
              );
            })}
          </nav>
          {/* 
          <div class="pro-metrica-end">
            <a
             href="javascript:void(0);"
              class="help"
              data-toggle="tooltip-custom"
              data-placement="right"
              data-trigger="hover"
              title=""
              data-original-title="Chat"
            >
              <i
                data-feather="message-circle"
                class="align-self-center menu-icon icon-md icon-dual mb-4"
              ></i>
            </a>
            <ahref="javascript:void(0);" class="profile">
              <img
                src="assets/images/users/user-4.jpg"
                alt="profile-user"
                class="rounded-circle thumb-sm"
              />
            </a>
          </div> */}
        </div>

        {activeValue?.children && (
          <div class="main-menu-inner">
            <div class="menu-body slimscroll">
              <div
                id={`${activeValue.title}`}
                class={`main-icon-menu-pane mm-active active`}
              >
                <div class="title-box">
                  <h6 class="menu-title">{activeValue.title}</h6>
                </div>
                {activeValue.children.map((child, childindex) => {
                  if (child.permission) {
                    return (
                      <PermissionGate scopes={[SCOPES.BOOKING_SYSTEM]}>
                        <ul class="nav" key={childindex}>
                          <li class="nav-item">
                            <a
                              class={`nav-link ${
                                child?.link === pathname ? "active" : ""
                              }`}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleNavigate(child.link)}
                              // href={child.link}
                            >
                              <span class="w-100 "> {child.title} </span>
                              {child.children && (
                                <span class="menu-arrow">
                                  <i class="mdi mdi-chevron-right"></i>
                                </span>
                              )}
                            </a>
                            {child?.children && (
                              <ul
                                class="nav-second-level"
                                aria-expanded="false"
                              >
                                {child?.children?.map((subchild, subindex) => {
                                  return (
                                    <li>
                                      <a
                                        href={subchild.link}
                                        key={subindex}
                                        onClick={() =>
                                          handleNavigate(subchild.link)
                                        }
                                      >
                                        {subchild.title}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </li>
                        </ul>
                      </PermissionGate>
                    );
                  } else {
                    return (
                      <ul class="nav" key={childindex}>
                        <li class="nav-item">
                          <a
                            class={`nav-link ${
                              child?.link === pathname ? "active" : ""
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleNavigate(child.link)}
                            // href={child.link}
                          >
                            <span class="w-100 "> {child.title} </span>
                            {child.children && (
                              <span class="menu-arrow">
                                <i class="mdi mdi-chevron-right"></i>
                              </span>
                            )}
                          </a>
                          {child?.children && (
                            <ul class="nav-second-level" aria-expanded="false">
                              {child?.children?.map((subchild, subindex) => {
                                return (
                                  <li>
                                    <a
                                      href={subchild.link}
                                      key={subindex}
                                      onClick={() =>
                                        handleNavigate(subchild.link)
                                      }
                                    >
                                      {subchild.title}
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      </ul>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default LeftSidebar;
