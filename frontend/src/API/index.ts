import axios from "axios";

interface ApiTypes {
  method: "GET" | "POST" | "PUT" | "DELETE";
  route: string;
  payload?: any;
  token?: any;
  params?: any;
}
interface WeatherApiTypes {
  lat: number;
  long: number;
}
axios.defaults.baseURL = `${
  process.env.REACT_APP_BASE_URL || window.location.origin
}/api/`;

function API({ method, route, payload, params, token }: ApiTypes): any {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: route,
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params,
      timeout: 17000,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        if (error?.response?.status === 500) {
          console.log(error?.response?.data?.message || "Something went wrong");
        } else {
          reject(error?.response?.data?.message || "Something went wrong");
        }
      });
  });
}

export default API;
