import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../../redux/action/restaurantActions";
import { getAllBranches } from "../../../redux/action/branchActions";
import { createUser } from "../../../redux/action/userActions";
import { showSnackBar } from "../../../redux/action/snackActions";
import { mobileRegex, emailRegex } from "../../../helpers/regex";
import getErrorMessage from "../../../helpers/getErrorMessage";

const AddModal = ({ open, onClose, title }) => {
  const { register, watch, errors, handleSubmit, setValue, reset } = useForm();
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurant.allRestaurants);

  const { role, restaurantId, branchId } = useSelector((state) => state.user);

  const branches = useSelector((state) => state.branch.allBranches);
  const [currRoles, setCurrRoles] = React.useState("branchadmin");
  const [currRes, setCurrRes] = React.useState();
  const [currBranch, setCurBranch] = React.useState(branchId || "all");
  const currRestaurandId = restaurantId !== "all" ? restaurantId : currRes;

  const ResAdminOption = () => (
    <div class="form-group col-md-6">
      <label>Restaurant</label>
      <select
        name="restaurantId"
        class="form-control"
        onChange={(e) => {
          setCurrRes(e.target.value);
          setValue("restaurantId", e.target.value);
        }}
        required
        value={currRes}
        ref={register}
      >
        <option value="" disabled selected>
          Choose Restaurant
        </option>
        {restaurants.map((res, resindex) => {
          return (
            <option key={resindex} value={res._id}>
              {res.name}
            </option>
          );
        })}
      </select>
    </div>
  );

  const BranchAdminOption = () => (
    <div class="form-group col-md-6">
      <label>Branches</label>
      <select
        name="branchId"
        class="form-control"
        onChange={(e) => {
          setCurBranch(e.target.value);
          setValue("branchId", e.target.value);
        }}
        value={currBranch}
        required
        ref={register}
      >
        {branches.length === 0 ? (
          <option value="" disabled selected>
            No Branches
          </option>
        ) : (
          <option value="" disabled selected>
            Choose branch
          </option>
        )}

        {branches.map((res, resindex) => {
          return (
            <option key={resindex} value={res._id}>
              {res.branchName}
            </option>
          );
        })}
      </select>
    </div>
  );

  const RoleOption = () => (
    <div class="form-group col-md-6">
      <label>Role</label>
      <select
        name="role"
        class="form-control"
        onChange={(e) => {
          setCurrRoles(e.target.value);
          setValue("role", e.target.value);
        }}
        required
        value={currRoles}
        ref={register}
      >
        {/* {role == "superadmin " && ( */}
        {role === "superadmin" && (
          <option value="restaurantadmin">Restaurant Admin</option>
        )}
        {/* )} */}
        <option value="branchadmin">Branch Admin</option>
        <option value="branchuser">Branch User</option>
        <option value="kitchenuser">Kitchen User</option>
      </select>
    </div>
  );

  const onSubmit = (data) => {
    if (data.password !== data.repassword) {
      return dispatch(showSnackBar("Passwords do not match", "error"));
    }
    dispatch(
      createUser(
        {
          ...data,
          ...(restaurantId !== "all" &&
            restaurantId && { restaurantId: restaurantId }),
        },
        () => reset(),
        () => {}
      )
    );
  };
  React.useEffect(() => {
    role === "superadmin" && dispatch(getAllRestaurants("all"));
  }, [role]);

  React.useEffect(() => {
    dispatch(getAllBranches(currRestaurandId, "true"));
  }, [currRestaurandId]);

  console.log("err", errors);
  return (
    <div class="page-content-tab">
      <div class="container-fluid">
        <div class="row mt-4">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <form class="form-parsley" onSubmit={handleSubmit(onSubmit)}>
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label>User Name</label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        name="userName"
                        placeholder="Type a name"
                        ref={register}
                      />
                    </div>

                    <div class="form-group col-md-6">
                      <label>User Mobile Number</label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        name="userMobile"
                        placeholder="Mobile Number"
                        ref={register({
                          pattern: {
                            value: mobileRegex,
                            message: "Invalid mobile number",
                          },
                        })}
                      />
                      {errors.userMobile && (
                        <div class="form-text-error">
                          {errors.userMobile.message || "Invalid mobile number"}
                        </div>
                      )}
                    </div>
                    <div class="form-group col-md-6">
                      <label>Password</label>
                      <div class="row">
                        <div class="col-md-6">
                          <input
                            type="password"
                            name="password"
                            id="pass2"
                            class="form-control"
                            required
                            placeholder="Password"
                            ref={register}
                          />
                        </div>
                        <div class="col-md-6">
                          <input
                            type="password"
                            class="form-control"
                            name="repassword"
                            required
                            data-parsley-equalto="#pass2"
                            placeholder="Re-Type Password"
                            ref={register}
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-md-6">
                      <label>Status</label>
                      <select
                        name="status"
                        ref={register}
                        class="form-control"
                        required
                      >
                        <option value={true}>Active</option>
                        <option value={true}>Inactive</option>
                      </select>
                    </div>
                    <RoleOption />

                    {restaurantId === "all" && <ResAdminOption />}
                    {!["restaurantadmin"].includes(currRoles) && (
                      <>
                        <BranchAdminOption />
                      </>
                    )}
                    {/* {["branchadmin", "branchuser"].includes(watchRole) &&
                      watchRestaurant && (
                        <>
                          <ResAdminOption />
                          {watchRestaurant && <BranchAdminOption />}
                        </>
                      )} */}
                  </div>
                  <div class="form-group mb-0">
                    <button
                      type="submit"
                      class="btn btn-gradient-primary waves-effect waves-light"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
