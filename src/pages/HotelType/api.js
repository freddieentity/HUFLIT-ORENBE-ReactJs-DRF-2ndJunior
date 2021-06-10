import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_API;

export const getHotelTypes = async () => {
  return await axios.get(`${baseURL}/api/hotels/hoteltypes/`);
};

export const getHotelType = async (id) => {
  return await axios.get(`${baseURL}/api/hotels/hoteltypes/?id=${id}`);
};

export const postHotelType = async (data) => {
  console.log(data);
  return await axios.post(`${baseURL}/api/hotels/hoteltypes/`, data);
};

export const deleteHotelType = async (id) => {
  return await axios.delete(`${baseURL}/api/hotels/hoteltypes/?id=${id}`);
};

export const patchHotelType = async (id, data) => {
  return await axios.patch(`${baseURL}/api/hotels/hoteltypes/?id=${id}`, data);
};
