dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

const infoCard = document.querySelector(".info");
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const updateDisplay = () => {
  const currentTime = dayjs().tz(userTimeZone).format("HH:mm:ss");
  const currentDate = dayjs().tz(userTimeZone).format("dddd D MMMM YYYY");

  const displayHTML = `
<div class="timezone">${userTimeZone}</div>
<div class="time">${currentTime}</div>
<div class="date">${currentDate}</div>`;

  infoCard.innerHTML = displayHTML;
};

updateDisplay();

setInterval(updateDisplay, 1000);
