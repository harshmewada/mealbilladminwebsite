import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootUrl } from "../../redux/types";

const View = ({ handleLogout }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const superadmin = "superadmin";
  const restaurantadmin = "restaurantadmin";
  const branchadmin = "branchadmin";
  const branchuser = "branchuser";
  const [open, setOpen] = React.useState(false);
  const roles = [superadmin, restaurantadmin, branchadmin, branchuser];
  const { role, name, restaurantLogo, restaurantName, branchName } =
    useSelector((state) => state.user);
  const setRole = (role) => {
    dispatch({
      type: "SET_ROLE",
      payload: role,
    });
  };
  const handleNavigate = (link) => history.push(link);

  const logoPath = RootUrl + "/" + restaurantLogo;

  // React.useEffect(() => {
  //   if (window?.api.isElectron) {
  //     // window.api.saveLogo(logoPath);

  //   }
  // }, [restaurantLogo]);
  return (
    <div class="topbar">
      <nav class="navbar-custom">
        <ul class="list-unstyled topbar-nav float-right mb-0">
          <li class="dropdown">
            <a
              class="nav-link dropdown-toggle waves-effect waves-light nav-user"
              href="javascript:void(0);"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
              onClick={() => setOpen(!open)}
            >
              {/* <img
                src="assets/images/users/user-4.jpg"
                alt="profile-user"
                class="rounded-circle"
              /> */}
              <span class="ml-1 nav-user-name hidden-sm">
                {name} ({role}) <i class="mdi mdi-chevron-down"></i>{" "}
              </span>
            </a>
            {open && (
              <div class="card">
                <div class="dropdown-item" onClick={() => handleLogout()}>
                  <i class="dripicons-exit text-muted mr-2"></i>
                  Logout
                </div>
              </div>
            )}

            <div class="dropdown-menu dropdown-menu-right">
              <div class="dropdown-item" onClick={() => handleLogout()}>
                <i class="dripicons-exit text-muted mr-2"></i>
                Logout
              </div>
            </div>
          </li>
          <li class="mr-2">
            <a
              href="javascript:void(0);"
              class="nav-link"
              data-toggle="modal"
              data-animation="fade"
              data-target=".modal-rightbar"
            >
              <i data-feather="align-right" class="align-self-center"></i>
            </a>
          </li>
        </ul>

        <ul class="list-unstyled topbar-nav mb-0">
          {role !== "superadmin" ? (
            <li
              style={{ padding: "10px", cursor: "pointer" }}
              onClick={() => handleNavigate("/")}
            >
              <img src={logoPath} style={{ height: "50px", width: "auto" }} />
            </li>
          ) : (
            <li
              style={{ padding: "10px", cursor: "pointer" }}
              onClick={() => handleNavigate("/")}
            >
              <img
                src={"./images/logo.png"}
                style={{ height: "50px", width: "auto" }}
              />
            </li>
          )}
          <li class="hide-phone ">
            <div class="nav-link dropdown-toggle waves-effect waves-light nav-user">
              {/* <img
                src="assets/images/users/user-4.jpg"
                alt="profile-user"
                class="rounded-circle"
              /> */}
              <span class="ml-1 font-weight-bold nav-user-name hidden-sm">
                {restaurantName} {branchName && branchName}
              </span>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default View;
