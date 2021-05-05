import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { DATEFORMAT } from "../../contants";
import { getAllBranches } from "../../redux/action/branchActions";
import * as Inputs from "../common/Inputs";
import moment from "moment";
import { useParams } from "react-router";
const ReportSelector = ({
  title,
  initialEffectFunction,
  getReportData,
  formData,
  optionData,
  dataType,
  noPadding,
}) => {
  const { reportType } = useParams();
  const defaultValues = {
    date: {
      start: new Date(),
      end: new Date(),
    },
  };
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    formState,
    reset,
    getValues,
    setValue,
  } = useForm({
    defaultValues,
    branchId: "All",
    shouldUnregister: false,
  });
  const [formErrors, setFormErrors] = React.useState({});

  const [state, setState] = React.useState({
    date: { start: moment(), end: moment() },
  });

  React.useEffect(() => {
    setFormErrors(formState.errors);
  }, [formState]);

  const { role, restaurantId, branchId } = useSelector((state) => state.user);
  const branches = useSelector((state) => state.branch.allBranches);
  const isRestaurantAdmin = ["restaurantadmin"].includes(role);
  const isBranchAdmin = ["branchadmin"].includes(role);

  const isSuperAdmin = ["superadmin"].includes(role);

  const handleChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      setValue(name, value);
      getData({
        ...getValues(),
        [name]: value,
      });
    } else {
      getData({
        ...getValues(),
        ...event,
      });
      setValue("date", event.date);
      setState({
        ...state,
        ...event,
      });
    }
  };

  const getData = (body) => {
    getReportData({
      ...body,
      role,
      restaurantId: restaurantId,
      reportType,
      dataType: dataType,
    });
  };
  const onSubmit = (data) => {
    console.log(
      "form submit",
      moment(data.date.start).format(DATEFORMAT),
      moment(data.date.end).format(DATEFORMAT)
    );
  };

  React.useEffect(() => {
    initialEffectFunction();
    getData(getValues());
  }, [reportType]);

  const FormSelector = () => {
    return (
      <form class="form-parsley" onSubmit={handleSubmit(onSubmit)}>
        <div class="row">
          {formData.map((item, index) => {
            const MyInput = Inputs[item.type];

            return (
              role !== item?.hideAt && (
                <MyInput
                  value={state[item.name]}
                  {...item}
                  onChange={(e) => handleChange(e)}
                  key={index}
                  noPadding
                  name={item.name}
                  label={item.label}
                  placeholder={item.placeholder}
                  defaultValue={defaultValues ? defaultValues[item.name] : ""}
                  ref={register(item.rules)}
                  error={formErrors[item.name]?.message}
                  {...(item?.hasOptions && { options: optionData[item.name] })}
                />
              )
            );
          })}
        </div>
        {/* <div class="form-group mb-0">
          <button
            type="submit"
            class="btn btn-gradient-primary waves-effect waves-light"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setValue("lio", "lodu")}
            class="btn btn-gradient-danger waves-effect ml-3"
          >
            Cancel
          </button>
        </div> */}
      </form>
    );
  };

  return (
    <div class="card">
      <div class="card-body">
        <FormSelector />
      </div>
    </div>
  );
};

export default ReportSelector;
