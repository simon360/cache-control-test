function paddedNumber(num) {
  return String(num).padStart(2, "0");
}

function getTime(date) {
  const hours = paddedNumber(date.getHours());
  const minutes = paddedNumber(date.getMinutes());
  const seconds = paddedNumber(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
}

class CurrentTime extends HTMLElement {
  constructor() {
    super();

    this.render();
    setInterval(this.render.bind(this), 1);
  }

  render() {
    const dateObj = new Date();

    const date = dateObj.toDateString();
    const time = getTime(dateObj);

    this.innerHTML = `It's currently ${date} at ${time}`;
  }
}

customElements.define("current-time", CurrentTime);
