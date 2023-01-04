import { createContext, useState } from "react";

export const DataContext = createContext(null);

//we make cotextAPI(it is method of react) file because we want to save our login user personal info in such a file globally where
// we can access this user anywhere in the website (whole project) like we show the name of user in blog creation and comment
//that's why we store the information of our user in separate file and its value we access in different components

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({ firstName: "", lastName: "" });
  return (
    //we pass those values in the value field which we want to export them
    <DataContext.Provider
      value={{
        //jin component me humae in ki values ko use krna hua hum us ko dataProvider me wrapp kr dy gy
        account,
        setAccount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
