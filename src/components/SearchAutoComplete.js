import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useFetchFromData } from "./useFetchFormData";

export function SearchAutoComplete({
  handleAutoChange,
  changeSearch,
  isOpen,
}) {
  const { data } = useFetchFromData();

  let options = [];
  data?.data.map((data) => options.push(data.firstName + " " + data.lastName));

  return (
    <label>
      Search:{" "}
      <Autocomplete
        sx={{
          display: "inline-block",
          "& input": {
            width: 170,
            height: 30,
            bgcolor: "background.paper",
            color: (theme) =>
              theme.palette.getContrastText(theme.palette.background.paper),
          },
        }}
        id="custom-input-demo"
        options={options}
        onChange={(e, value) => handleAutoChange(e, value)}
        clearOnBlur={true}
        isOptionEqualToValue={(option, value) => option.code !== value}
        disabled={!isOpen}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input type="text" {...params.inputProps} />
          </div>
        )}
      />
    </label>
  );
}
