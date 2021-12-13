import { useWatch } from "react-hook-form";

const useFormWatch = ({ control, fieldName }) => {
  const watch = useWatch({
    control: control || null,
    name: fieldName && fieldName.key,
  });

  if (fieldName) {
    return fieldName?.expectedValue(watch);
  }

  return null;
};

export default useFormWatch;
