import React from "react";
import InputContainer from "./InputContainer";
import { Rating as ReactRating, RatingView } from "react-simple-star-rating";
const Rating = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    placeholder,
    multiline,
    rows,
    error,
    size,
    onChange,
    value,
    defaultValue,
    onCustomChange,
    disabled,
    // setValue,
  } = props;
  const [rating, setRating] = React.useState(defaultValue || 0);
  return (
    <InputContainer {...props} label={label} error={error} size={size}>
      <div className="form-control">
        <ReactRating
          ratingValue={rating}
          readonly={disabled}
          onClick={(rate) => {
            setRating(rate);
            onCustomChange({ name, value: rate });
          }}
        />
      </div>

      {/* <Button
        onClick={() => {
          onCustomChange({ name, value: 5 });
        }}
      >
        hehe
      </Button> */}
      {/* <div class="br-wrapper br-theme-fontawesome-stars">
        <select id="example-fontawesome">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div class="br-widget">
          <a
            href="#"
            data-rating-value="1"
            data-rating-text="1"
            class="br-selected"
          ></a>
          <a
            href="#"
            data-rating-value="2"
            data-rating-text="2"
            class="br-selected"
          ></a>
          <a
            href="#"
            data-rating-value="3"
            data-rating-text="3"
            class="br-selected"
          ></a>
          <a
            href="#"
            data-rating-value="4"
            data-rating-text="4"
            class="br-selected"
          ></a>
          <a
            href="#"
            data-rating-value="5"
            data-rating-text="5"
            class="br-selected br-current"
          ></a>
        </div>
      </div> */}
      {/* <div class="custom-control custom-switch switch-primary">
        <input
          class="custom-control-input form-control"
          id="customSwitchPrimary"
          ref={ref}
          // {...props}
          name={name}
          type="checkbox"
          checked={value}
          defaultChecked={defaultValue}
        />
        <label class="custom-control-label" for="customSwitchPrimary">
          {label}
        </label>
      </div> */}
      {/*
      <input
        ref={ref}
        type="text"
        class="form-control"
        name={name}
        placeholder={placeholder}
        {...props}
      /> */}
    </InputContainer>
  );
});
export default Rating;
