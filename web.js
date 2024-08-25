// const var
// for connection
const connectButton = document.getElementById("connectButton");
const disconnectButton = document.getElementById("disconnectButton");
const successToast = document.getElementById("successToast");
const failToast = document.getElementById("failToast");
// for account info
const accountInfoTitle = document.getElementById("accountInfoTitle");
const accountInfo = document.getElementById("accountInfo");
const balanceInfo = document.getElementById("balanceInfo");
const networkWarn = document.getElementById("networkWarn");
// for swap in card
const swapFromSelect = document.getElementById("swapFromSelect");
const swapFromInput = document.getElementById("swapFromInput");
const swapToSelect = document.getElementById("swapToSelect");
const swapButtom = document.getElementById("swapButtom");
// advanced options
const advancedOptionsButtomUp = document.getElementById(
  "advancedOptionsButtomUp"
);
const advancedOptionsButtomDown = document.getElementById(
  "advancedOptionsButtomDown"
);
const advancedOptionsButtomGroup = document.getElementById(
  "advancedOptionsButtomGroup"
);
const slippageButtom1 = document.getElementById("slippageButtom1");
const slippageButtom2 = document.getElementById("slippageButtom2");
const slippageButtom3 = document.getElementById("slippageButtom3");
// other buttoms in card
const connectButtonInCard = document.getElementById("connectButtonInCard");
const getQuotesButtonInCard = document.getElementById("getQuotesButtonInCard");

// enable tooltip
const tooltipTriggerList = document.querySelectorAll(
  '[data-coreui-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new coreui.Tooltip(tooltipTriggerEl)
);

//  check if metamask installed when page is loaded
window.addEventListener("load", async () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask extension found");
    window.web3 = new Web3(window.ethereum);
    checkConnection();
  } else {
    alert("Please install MetaMask");
  }
});

// show accout info module
function showAccountInfo(account, balance) {
  // account info title accountInfoTitle
  accountInfoTitle.style.display = "block";
  // address info
  var option = document.createElement("option");
  option.value = "1";
  option.text = account;
  accountInfo.add(option);
  accountInfo.style.display = "block";
  // balance info
  balanceInfo.innerText =
    "ETH balance: " + web3.utils.fromWei(balance, "ether");
  balanceInfo.style.display = "block";
}

function switchToConnectedLayout(account, balance) {
  showAccountInfo(account, balance);
  // navbar buttoms
  connectButton.style.display = "none";
  disconnectButton.style.display = "block";
  // card buttoms
  connectButtonInCard.style.display = "none";
  getQuotesButtonInCard.style.display = "block";
  // hide network warn
  networkWarn.style.display = "none";
}

function switchToDisonnectedLayout() {
  // navbar buttoms
  connectButton.style.display = "block";
  disconnectButton.style.display = "none";
  // card buttoms
  connectButtonInCard.style.display = "block";
  getQuotesButtonInCard.style.display = "none";
  // show network warn
  networkWarn.style.display = "block";
}

// check metamask connected or not
async function checkConnection() {
  web3 = window.web3;
  accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    // connected
    console.log("MetaMask is connected when load:", accounts[0]);
    // get info
    var balance = await web3.eth.getBalance(accounts[0]);
    console.log("ETH balance:", web3.utils.fromWei(balance, "ether"));
    // switch layout
    switchToConnectedLayout(accounts[0], balance);
  } else {
    // not connected
    console.log("MetaMask is not connected  when load");
    // switch layout
    switchToDisonnectedLayout();
  }
}

// connect buttoms
connectButton.addEventListener("click", () => {
  connectMetaMask();
});

connectButtonInCard.addEventListener("click", () => {
  connectMetaMask();
});

// connect metamask
async function connectMetaMask() {
  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    // success
    // show success toast
    const successToastCoreUI = coreui.Toast.getOrCreateInstance(successToast);
    successToastCoreUI.show();
    // get info
    web3 = window.web3;
    console.log("Connect account:", accounts[0]);
    var balance = await web3.eth.getBalance(accounts[0]);
    console.log("ETH balance:", web3.utils.fromWei(balance, "ether"));
    // switch layout
    switchToConnectedLayout(accounts[0], balance);
  } catch (error) {
    // fail
    // show fail toast
    const failToastCoreUI = coreui.Toast.getOrCreateInstance(failToast);
    failToastCoreUI.show();
    console.error("MetaMask connection rejected", error);
  }
}

// disconnect metamask
disconnectButton.addEventListener("click", () => {
  // delete all page storage to disconnect metamask
  localStorage.removeItem("walletAddress");
  sessionStorage.removeItem("walletAddress");
  deleteAllCookies();

  window.location.reload();

  switchToDisonnectedLayout();
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

// swap buttom logic
swapButtom.addEventListener("click", () => {
  const swapFromValue = swapFromSelect.value;
  const swapToValue = swapToSelect.value;

  tmp = swapFromValue;
  swapFromSelect.value = swapToValue;
  swapToSelect.value = tmp;
  swapFromInput.value = null;
});

// advanced options
advancedOptionsButtomUp.addEventListener("click", () => {
  advancedOptionsButtomDown.style.display = "block";
  advancedOptionsButtomUp.style.display = "none";
  advancedOptionsButtomGroup.style.display = "none";
});

advancedOptionsButtomDown.addEventListener("click", () => {
  advancedOptionsButtomDown.style.display = "none";
  advancedOptionsButtomUp.style.display = "block";
  advancedOptionsButtomGroup.style.display = "block";
});

slippageButtom1.addEventListener("click", () => {
  slippageButtom1.classList.add("active");
  slippageButtom2.classList.remove("active");
  slippageButtom3.classList.remove("active");
});

slippageButtom2.addEventListener("click", () => {
  slippageButtom1.classList.remove("active");
  slippageButtom2.classList.add("active");
  slippageButtom3.classList.remove("active");
});

slippageButtom3.addEventListener("click", () => {
  slippageButtom1.classList.remove("active");
  slippageButtom2.classList.remove("active");
  slippageButtom3.classList.add("active");
});
