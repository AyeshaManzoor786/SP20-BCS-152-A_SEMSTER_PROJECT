//we use axios to make different APIs...we make it through axios.interceptor
// we call different APIs through it
// interceptor helps us in making the common api
import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URL } from "../constant/config";
import { getAccessToken } from "../utils/common-utils";
const API_URL = "http://localhost:8000";
const axiosInstance = axios.create({
  //it take some argument -baseURL is the url of the backend SERVER
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json, form-data",
    "Content-Type": "application/json",
  },
});
//we make 2 intercept ----1. for request.use(it take 2 callback function ---1.for success 2.for rejection) 2.for response
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  function (res) {
    //stop loader global here-in case you show loader
    return processResponse(res);
  },
  function (err) {
    //stop loader global here
    return Promise.reject(processError(err));
  }
);

// if success->return {isSuccess:true, data:object}---->common response--all apis have same response
// if fail->return {isFailure:true, status:string, msg: string, code:int}

const processResponse = (res) => {
  if (res?.status === 200) {
    return {
      isSuccess: true,
      data: res.data, //data comes in response.data->in api response is an object and data is the field in the response
    };
  } else {
    return {
      isFailure: true,
      status: res?.status,
      msg: res?.msg,
      code: res.code,
    };
  }
};

// if success->return {isSuccess:true, data:object}---->common response--all apis have same response
// if fail->return {isFailure:true, status:string, msg: string, code:int}

const processError = (err) => {
  // give 3 different types of the error
  if (err.res) {
    //request made but server response different status code
    //that falls out of range 2.x.x
    // request go to the server but due to some issue server give different status code
    console.log("Error in response", err.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: err.res.status,
    };
  } else if (err.req) {
    //request made but no response was recieved
    //request go but no response because no frontend and backend is connected that's why server does not give any response
    // connecting issue and networking issue
    console.log("Error in request", err.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "", //as request goes not on the server
    };
  } else {
    //fronted mistake--something happened in setting up request that triggers an error
    console.log("Error in network", err.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "", //as request goes not on the server
    };
  }
};
//we create an actual Api and we call this through this object
const API = {};

//we use "for of" loop -> we use it mostly for object ->it pick one by one object in form of key value pair
for (const [key, value] of Object.entries(SERVICE_URL)) {
  API[key] = (body) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
    });
}

export { API };
