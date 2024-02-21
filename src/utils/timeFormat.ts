function timeFormat(seconds: number): string {
  // let seconds = parseInt(time);
  // let minutes = parseInt((seconds / 60).toFixed(0));
  // const hours = parseInt((minutes / 60).toFixed(0));
  // minutes = minutes % 60;
  // seconds = seconds % 60;
  // if (!hours) return `${minutes}:${seconds}`;
  // if (!minutes) return `${seconds}`;
  // return `${hours}:${minutes}:${seconds}`;
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(11, 19);
}

export default timeFormat;
