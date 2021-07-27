import React from "react";
import { Modal, Menu } from "semantic-ui-react";
import { truncateAddress } from "../utils";
import { AccountContext } from "../context/AccountContext";
import { ModalContext } from "../context/ModalContext";

export default function ConnectWallet() {
  const [loading, setLoading] = React.useState(false);
  const popup = React.useContext(ModalContext);
  const [account, setAccount] = React.useContext(AccountContext);

  // on page load, setup account listener
  React.useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      ethereum.on("accountsChanged", (accounts) => setAccount(accounts[0]));
    }
  }, []);

  const handleConnect = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      //check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        throw Error("Please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);

      // check chainID
      const chainId = await ethereum.request({ method: "eth_chainId" });
      if (
        chainId !== (process.env.NODE_ENV !== "development" ? "0x4" : "0x539")
      ) {
        throw Error(
          "You are connected to the wrong Ethereum Network! Please select Rinkeby"
        );
      }
    } catch (err) {
      if (err.code === 4001) {
        popup("You have rejected the connection request");
      } else {
        popup(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Menu.Item
        onClick={!!account ? () => {} : handleConnect}
        href={!!account ? "/profile" : ""}
        disabled={loading}
      >
        <b style={{ color: "blue" }}>
          {!account ? "CONNECT WALLET" : truncateAddress(account)}
        </b>
      </Menu.Item>
    </>
  );
}
