import * as React from "react";
import { useState } from "react";
import { useEditFormData } from "./useFetchFormData";

export default function BasicTextFields({
  id,
  setEditable,
  handleCleanUp,
}) {
  const { mutate } = useEditFormData();
  const [newValue, setNewValue] = useState({
    id: null,
    firstName: null,
    lastName: null,
  });

  const handleChange = (e, id) => {
    setNewValue({
      ...newValue,
      id: id,
      [e.target.name.split(" ")[0]]: e.target.value.split(" ")[0],
      [e.target.name.split(" ")[1]]: e.target.value.split(" ")[1],
    });
  };

  const handleBlur = (id) => {
    if (newValue.id && newValue.firstName && newValue.lastName) {
      mutate(newValue);
      setEditable(false);
      handleCleanUp(newValue.id);
    } else {
      setEditable(false);
      handleCleanUp(id);
    }
  };
  return (
    <input
      type="text"
      id="to_be"
      autoFocus
      name="firstName lastName"
      style={{
        width: "45%",
        padding: "12px 6px",
        margin: "8px 10px",
        boxSizing: "border-box",
        border: "none",
        borderBottom: "2px solid black",
        borderRadius: "0px",
      }}
      onChange={(e) => handleChange(e, id)}
      onBlur={() => handleBlur(id)}
    />
  );
}
