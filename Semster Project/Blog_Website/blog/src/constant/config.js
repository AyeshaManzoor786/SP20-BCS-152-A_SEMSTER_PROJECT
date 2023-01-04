// API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded.Please wait",
  },
  requestFailure: {
    title: "Error",
    message: "An error occurred while parsing request data",
  },
  responseFailure: {
    title: "Error",
    message:
      "An error occurred while fetching response from the server.Please try again",
  },
  networkError: {
    title: "Error",
    message:
      "Unable to connect the server.Please check internet connectivity and try again",
  },
};

//API SERVICE CALL--it is standard method to make any type of API
// sample request
// need Service Call:{url:'',method:'POST/GET/PUT/DELETE' ,params: 'true/false',query:'true/false'}
export const SERVICE_URL = {
  //we just add the object for making an API
  userSignup: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },
  uploadFile: { url: "/file/upload", method: "POST" },
  createPost: { url: "/create", method: "POST" },
};
