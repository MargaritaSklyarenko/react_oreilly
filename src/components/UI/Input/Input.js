import React from "react";
import PropTypes from 'prop-types';
import classes from "./Input.module.css";

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
      />
      /* Can't use this:
        onBlur={props.changed}
        Have warning
        You provided a `value` prop to a form field without an `onChange` handler.
        This will render a read-only field. If the field should be mutable use `defaultValue`.
        Otherwise, set either `onChange` or `readOnly`

        And it just doesn't work
      */
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  elementConfig: PropTypes.object,
  invalid: PropTypes.bool,
  shouldValidate: PropTypes.object,
  touched: PropTypes.bool,
  elementType: PropTypes.string
};

export default Input;
