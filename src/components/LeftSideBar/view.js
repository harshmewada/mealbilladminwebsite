import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { SMALLLOGO } from "../../redux/types";

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
  return (
    <>
      <div class="leftbar-tab-menu">
        <div class="main-icon-menu">
          <a
            href="/crm/crm-index"
            class="logo logo-metrica d-block text-center"
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
              );
            })}
          </nav>
          {/* 
          <div class="pro-metrica-end">
            <a
              href=""
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
            <a href="" class="profile">
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
            {/* <div class="topbar-left">
            <a href="crm/crm-index" class="logo">
              <span>
                <img
                  src="assets/images/logo-dark.png"
                  alt="logo-large"
                  class="logo-lg logo-dark"
                />
                <img
                  src="assets/images/logo.png"
                  alt="logo-large"
                  class="logo-lg logo-light"
                />
              </span>
            </a>
          </div> */}

            <div class="menu-body slimscroll">
              <div
                id={`${activeValue.title}`}
                class={`main-icon-menu-pane mm-active active`}
              >
                <div class="title-box">
                  <h6 class="menu-title">{activeValue.title}</h6>
                </div>
                {activeValue.children.map((child, childindex) => {
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
                          <span class="w-100 "> {child.title}</span>
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
                })}
              </div>
              {/* {sidebarData?.map((data, index) => {
              return (
                <div
                  id={`${data.title + index}`}
                  class={`main-icon-menu-pane ${
                    active === index ? "mm-active active" : undefined
                  }`}
                >
                  <div class="title-box">
                    <h6 class="menu-title">{data.title}</h6>
                  </div>
                  {data.children.map((child, childindex) => {
                    return (
                      <ul class="nav" key={childindex}>
                        <li class="nav-item">
                          <a class="nav-link" href={child.link}>
                            <span class="w-100"> {child.title}</span>
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
                                    <a href={subchild.link} key={subindex}>
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
                  })}
                </div>
              );
            })} */}
            </div>
          </div>
        )}
      </div>

      <script src="assets/js/feather.min.js"></script>
    </>
  );
}

export default LeftSidebar;
