import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import DatePicker from "react-date-picker";

export default function DatePicker(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  //   console.log(value);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        // disablePast={true}
        minDate={new Date()}
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="MMM/dd/yyyy"
        name={name}
        autoOk={true}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
