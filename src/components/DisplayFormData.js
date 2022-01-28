import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useDeleteFormData, useFetchFromData } from "./useFetchFormData";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useRef } from "react";
import { SearchAutoComplete } from "./SearchAutoComplete";
import BasicTextFields from "./BasicTextFields";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link,useNavigate } from "react-router-dom";

export default function DisplayFormData() {
  const { data } = useFetchFromData();
  const checkedRef = useRef([]);
  const [disable, setDisable] = useState(true);
  const [deletable, setDeletable] = useState(true);
  const [changeSearch, setChangeSearch] = useState({ id: null, value: null });
  const [editable, setEditable] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  let found = " ";
  const { mutate } = useDeleteFormData();
  let navigate = useNavigate();

  const handleAutoChange = (e, value) => {
    if (value) {
      found = data?.data.find(
        (element) => element.firstName === value.split(" ")[0]
      );
      setChangeSearch({ ...changeSearch, id: found.id, value: value });
    }
    // found = data?.data.find(
    //   (element) => element.firstName === value.split(" ")[0]
    // );
    // setChangeSearch({ ...changeSearch, id: found.id, value: value });
  };

  const handleCleanUp = (id) => {
    checkedRef.current = [];
    setDeletable(checkedRef.current.length === 0);
    setDisable(checkedRef.current.length !== 1);
    setChangeSearch({ ...changeSearch, id: null, value: null });
    if (id) {
      const x = document.getElementById(id);
      x.checked = false;
    }
    setIsOpen(true);
  };

  const handleDelete = () => {
    for (let element of checkedRef.current) {
      mutate(element);
    }
    handleCleanUp();
  };
  const handleChange = (idx) => {
    let find = checkedRef.current.findIndex((item) => item === idx);
    if (find > -1) {
      checkedRef.current.splice(find, 1);
    } else {
      checkedRef.current.push(idx);
    }
    setDisable(checkedRef.current.length !== 1);
    setDeletable(checkedRef.current.length === 0);
    if (checkedRef.current.length === 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleEdit = () => {
    setDeletable(true);
    setEditable(true);
  };

  return (
    <>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 2,
          width: 640,
          height: 512,
          backgroundColor: "#EEEEEE",
        },
        justifyContent: 'center',
        alignItems:'center',
      }}
    >
      <Paper elevation={3} style={{ position: "relative" }}>
        <Typography
          align="center"
          variant="h4"
          style={{ marginTop: "20px" }}
          gutterBottom
          component="div"
        >
          Form Data
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <SearchAutoComplete
            handleAutoChange={handleAutoChange}
            changeSearch={changeSearch}
            isOpen={isOpen}
            editable={editable}
          />
        </Box>

        {changeSearch.id ? (
          <div key={data.id}>
            <Box style={{ marginLeft: "25px" }}>
              <input
                type="checkbox"
                id={changeSearch.id}
                onChange={() => handleChange(changeSearch.id)}
                className="checkboxes"
              />
              {editable && checkedRef.current.includes(changeSearch.id) ? (
                <BasicTextFields
                  id={changeSearch.id}
                  // firstName={changeSearch.value.split(" ")[0]}
                  // lastName = {changeSearch.value.split(" ")[1]}
                  setEditable={setEditable}
                  setChangeSearch={setChangeSearch}
                  changeSearch={changeSearch}
                  setDisable={setDisable}
                  handleCleanUp={handleCleanUp}
                />
              ) : (
                changeSearch.value
              )}
            </Box>

            <Divider style={{ margin: "15px 0" }} />
          </div>
        ) : (
          data?.data.map((data) => {
            return (
              <div key={data.id}>
                <Box style={{ marginLeft: "25px" }}>
                  <input
                    type="checkbox"
                    id={data.id}
                    onChange={() => handleChange(data.id)}
                  />

                  {editable && checkedRef.current.includes(data.id) ? (
                    <BasicTextFields
                      id={data.id}
                      firstName={data.firstName}
                      lastName={data.lastName}
                      setEditable={setEditable}
                      setDisable={setDisable}
                      handleCleanUp={handleCleanUp}
                    />
                  ) : (
                    data.firstName + " " + data.lastName
                  )}
                </Box>

                <Divider style={{ margin: "15px 0" }} />
              </div>
            );
          })
        )}
        <Box
          textAlign="center"
          style={{ position: "absolute", bottom: "20px", width: "100%" }}
        >
          <Button
            variant="contained"
            style={{ margin: "10px", width: "110px" }}
            startIcon={<EditIcon />}
            disabled={disable || editable}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            style={{ margin: "10px" }}
            startIcon={<DeleteIcon />}
            disabled={deletable}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Paper>
      </Box>
      <div style={{ display: "flex", justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => {navigate("/")}}> <ArrowBackIcon /><Typography variant="h6">Go Back</Typography></Button>
      </div>
    </>
  );
}
