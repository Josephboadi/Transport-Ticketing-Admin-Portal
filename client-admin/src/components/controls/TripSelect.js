import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import RoomIcon from "@material-ui/icons/Room";
import ScheduleIcon from "@material-ui/icons/Schedule";
import MoneyIcon from "@material-ui/icons/Money";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import moment from "moment";

export default function TripSelect(props) {
  const { name, label, value, error = null, onChange, options } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options?.map((item) => (
          <MenuItem
            style={{ fontSize: "20px", fontWeight: "bold" }}
            key={item._id}
            value={item._id}>
            <RoomIcon fontSize={"large"} color={"primary"} />
            {` `}
            {` ${item.from.name} - ${item.to.name} ${`  ______  `} `}
            {"  "}
            <DateRangeIcon fontSize={"large"} color={"primary"} />
            {` `}
            {` ${moment(item.date.substring(0, 10)).format(
              "DD MMM, YYYY"
            )} ${`  ______  `} `}
            {"  "}
            {/* <ScheduleIcon />
            {` `}
            {` ${item.time} ${`  ______  `} `} */}
            {"  "} <MoneyIcon fontSize={"large"} color={"primary"} />
            {` `} {`Ghc${item.fare}.00`}
            {/* {`${item.from.name} - ${item.to.name} ${`  _______  `}  ${moment(
              item.date.substring(0, 10)
            ).format("DD MMM, YYYY")} ${`  _______  `} ${
              item.time
            } ${`  _______  `}    Ghc${item.fare}.00`} */}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
