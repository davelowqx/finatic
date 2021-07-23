import React from "react";

const AccountContext = React.createContext();

function AccountContextProvider({ children }) {
  const [account, setAccount] = React.useState("");
  const setAndLogAccount = (acc) => {
    console.log(acc);
    setAccount(acc);
  };

  React.useEffect(() => {
    const acc = sessionStorage.getItem("account");
    setAccount(acc === "null" ? "" : acc);
  }, []);

  React.useEffect(() => {
    sessionStorage.setItem("account", account);
    console.log("account:", account);
  }, [account]);

  return (
    <AccountContext.Provider value={[account, setAndLogAccount]}>
      {children}
    </AccountContext.Provider>
  );
}

export { AccountContextProvider, AccountContext };
