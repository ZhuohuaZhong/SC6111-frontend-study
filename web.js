// const var
const connectButton = document.getElementById("connectButton");
const disconnectButton = document.getElementById("disconnectButton");
const accountDisplay = document.getElementById("account");

// enable CoreUI popover
const popoverTriggerList = document.querySelectorAll(
  '[data-coreui-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new coreui.Popover(popoverTriggerEl)
);

//  check if metamask installed when page is loaded
window.addEventListener("load", async () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask extension found");
    const web3 = new Web3(window.ethereum);
    checkConnection(web3);
  } else {
    alert("Please install MetaMask");
  }
});

// check metamask connected or not
function checkConnection(web3) {
  web3.eth.getAccounts().then((accounts) => {
    if (accounts.length > 0) {
      // connected
      console.log("MetaMask is connected when load:", accounts[0]);
      connectButton.style.display = "none";
      disconnectButton.style.display = "block";
    } else {
      // not connected
      console.log("MetaMask is not connected  when load");
      connectButton.style.display = "block";
      disconnectButton.style.display = "none";
    }
  });
}

// connect metamask
connectButton.addEventListener("click", async () => {
  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    // success
    // change button
    connectButton.style.display = "none";
    disconnectButton.style.display = "block";
  } catch (error) {
    // fail
    console.error("User denied account access", error);
  }
});

// delete cookeies to disconnect metamask
function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  }
}

// disconnect metamask
disconnectButton.addEventListener("click", () => {
  // delete all page storage to disconnect metamask
  localStorage.removeItem("walletAddress");
  sessionStorage.removeItem("walletAddress");
  deleteAllCookies();

  window.location.reload();

  // change button
  disconnectButton.style.display = "none";
  connectButton.style.display = "block";
});
