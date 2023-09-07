import { aryIanaTimeZones } from "./modules/timezoneList.js";

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

const infoCard = document.querySelector(".info");
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let displayTimeZone = userTimeZone;

const updateDisplay = () => {
  const currentTime = dayjs().tz(displayTimeZone).format("HH:mm:ss");
  const currentDate = dayjs().tz(displayTimeZone).format("dddd D MMMM YYYY");

  const displayHTML = `
  <div class="tz-modal-btn">Current Timezone:</div>
<div class="timezone">${displayTimeZone}</div>
<div class="time">${currentTime}</div>
<div class="date">${currentDate}</div>`;

  infoCard.innerHTML = displayHTML;

  const tzSelectorButton = document.querySelector(".tz-modal-btn");

  tzSelectorButton.addEventListener("click", () => {
    showModal();
  });
};

// *** MODAL WORK GOES HERE ***

const showModal = () => {
  // Show the Modal
  const overlay = document.querySelector("#overlay");
  overlay.classList.remove("hidden");

  // Activate the dropdown
  tzSelector();

  // Activate click away
  overlay.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      hideModal();
    }
  });
};

const hideModal = () => {
  overlay.classList.add("hidden");
};

// This function displays all the timezones in the selector
const tzSelector = () => {
  // Display the html

  const dropDownDiv = document.querySelector(".dropdown-content");

  const tzDropDownHTML = aryIanaTimeZones.map(
    (zone) => `<p id="${zone}" class="tz-option">${zone}</p>`
  );

  dropDownDiv.innerHTML = tzDropDownHTML.join("");

  // Add the eventListeners

  const options = document.querySelectorAll(".tz-option");
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      displayTimeZone = e.target.id;
    });
  });
};

// *** APP RUNNING FUNCTIONS ***

updateDisplay();

setInterval(updateDisplay, 1000);
