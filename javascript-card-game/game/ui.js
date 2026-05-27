export function log(msg) {
  const logEl = document.getElementById("log");
  logEl.innerHTML += "<br>" + msg;
}
