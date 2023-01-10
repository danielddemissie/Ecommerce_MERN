import Axios from "axios";

interface IaxiosOptions {
  url: string;
  method?: string;
  data?: any;
}

export const AxiosAPI = async (axiosInput: IaxiosOptions) => {
  return await Axios({
    url: axiosInput.url,
    method: axiosInput.method,
    data: axiosInput.data,
  });
};
