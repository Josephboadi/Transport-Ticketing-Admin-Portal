import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TimePicker from "react-time-picker";

import { TextField } from "@material-ui/core";
import moment from "moment";

export default function TimePicker1(props) {
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  // const { name, label, value, error = null, onChange, ...other } = props;

  // console.log(moment(value).format("hh:mm A"));
  // console.log(name);
  return (
    // <TextField
    //   variant="outlined"
    //   id="time"
    //   type="time"
    //   label={label}
    //   name={name}
    //   autoOk={true}
    //   value={value}
    //   onChange={onChange}
    //   InputLabelProps={{
    //     shrink: true,
    //   }}
    //   {...other}
    //   {...(error && { error: true, helperText: error })}
    // />

    // <TimePicker
    //   variant="outlined"
    //   id="time"
    //   type="time"
    //   label={label}
    //   name={name}
    //   // autoOk={true}
    //   value={value}
    //   onChange={onChange}
    //   // InputLabelProps={{
    //   //   shrink: true,
    //   // }}
    //   {...other}
    //   {...(error && { error: true, helperText: error })}
    // />

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        id="time"
        label={label}
        name={name}
        autoOk={true}
        value={moment(value).toISOString()}
        onChange={(time) => onChange(convertToDefEventPara(name, time))}
      />
    </MuiPickersUtilsProvider>
  );
}
