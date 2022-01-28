import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { QueryClient } from "react-query";

const addFormData = (formDetails) => {
  return axios.post("http://localhost:4000/formdetails", formDetails);
};

const fetchFormData = () => {
  return axios.get("http://localhost:4000/formdetails");
};

export const useFetchFromData = () => {
  return useQuery("form-details", fetchFormData, {
    refetchInterval: 3000,
  });
};

export const usePostFormData = () => {
  const queryClient = new QueryClient();
  return useMutation(addFormData, {
    onSuccess: () => {
      queryClient.invalidateQueries("form-details");
    },
  });
};

const deleteFormData = async (id) =>{
 await axios.delete(`http://localhost:4000/formdetails/${id}`);
};
export const useDeleteFormData = () => {
  const queryClient = new QueryClient();
  return useMutation((id) => deleteFormData(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("form-details");
    },
  });
};

const editFormData = ({ id, firstName, lastName }) => {
  return axios.put(`http://localhost:4000/formdetails/${id}`, {
    firstName,
    lastName,
  });
};

export const useEditFormData = () => {
  const queryClient = new QueryClient();
  return useMutation(editFormData, {
    onSuccess: () => {
      queryClient.invalidateQueries("form-details");
    },
  });
};
