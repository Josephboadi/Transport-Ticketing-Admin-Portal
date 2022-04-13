import React from "react";
import { Button } from "@material-ui/core";

export default function DropArea(props) {
  const { error = null, onChange, ...other } = props;

  return (
    <>
      <input
        // name={name}
        // files={files}
        // value={value}
        accept="image/*"
        style={{
          border: "1px solid gray",
          margin: "10px",
          padding: "10px",
          borderRadius: "4px",
          justifyContent: "center",
          paddingTop: "15px",
          height: "25px",
        }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={onChange}
        {...other}
        // {...(error && { error: true, helperText: error })}
      />
      <label htmlFor="raised-button-file">
        <Button variant="raised" component="span" style={{ display: "none" }}>
          Upload
        </Button>
      </label>
    </>
  );
}
