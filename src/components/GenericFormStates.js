import React from "react";
import { GenericForm } from "./GenericForm";
import { useState } from "react";
import DisplayFormData from "./DisplayFormData";
import { usePostFormData } from "./useFetchFormData";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export const GenericFormStates = () => {
  const { mutate } = usePostFormData();
  let navigate = useNavigate();
  const [errors, setErrors] = useState({
    firstName: {
      errors: "",
    },
    lastName: {
      errors: "",
    },
  });

  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }
  const [fields, setFields] = useState({ firstName: "", lastName: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      errors.firstName.errors === "" &&
      errors.lastName.errors === "" &&
      fields.firstName !== "" &&
      fields.lastName !== ""
    ) {
      mutate({ id: guidGenerator(), ...fields });
      setFields({ ...fields, firstName: "", lastName: "" });
      navigate("/formdata");
    } else {
      alert("Rectify the errors first");
      setFields({ ...fields, firstName: "", lastName: "" });
    }
  };
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value.trim() });
  };
  const handleBlur = (e) => {
    if (fields[e.target.name] === "") {
      setErrors({
        ...errors,
        [e.target.name]: {
          errors: "Required",
        },
      });
    } else if (fields[e.target.name].length > 15) {
      setErrors({
        ...errors,
        [e.target.name]: {
          errors: "Input Exceeds maximum length of 15",
        },
      });
    } else {
      setErrors({
        ...errors,
        [e.target.name]: {
          errors: "",
        },
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <GenericForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleBlur={handleBlur}
          fields={fields}
          errors={errors}
        />
      </Box>

      {/* <DisplayFormData /> */}
    </div>
  );
};
