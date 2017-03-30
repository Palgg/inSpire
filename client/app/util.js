/**
 * @params time must be castable to Date object
 * toLocaleTimeString does basic filtering of extraneous
 * information such as timezone and date
 * substring truncates the information past the minutes
 * replace removes leading 0s just in case
 **/
export function hhMMToString(time) {
  if (typeof time !== "Date") {
    time = new Date(time).toLocaleTimeString();
  } else {
    time = time.toLocaleTimeString();
  }
  return time.substring(0, time.indexOf(":") + 3).replace(/^0+/, '');
}

export function meridiemToString(time) { 
  if (typeof time !== "Date") {
    time = new Date(time).toLocaleTimeString();
  } else {
    time = time.toLocaleTimeString();
  }
  return time.substring(0, time.indexOf(":") + 3) + ' ' + time.substring(time.indexOf(":") + 7);
}

export function hideElement(shouldHide) {
  if (shouldHide) {
    return 'hidden';
  } else {
    return '';
  }
}
