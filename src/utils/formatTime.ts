import { DateTime } from "luxon";

export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours > 0 ? `${hours}:` : "";
  const formattedMinutes = `${minutes < 10 ? "0" : ""}${minutes}:`;
  const formattedSeconds = `${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;

  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
};

export function formatTimeDifference(inputTimeString: string) {
  console.log(inputTimeString);
  const inputDateTime = DateTime.fromISO(inputTimeString).toObject();
  console.log(inputDateTime);
  const formattedTime = DateTime.now().minus(inputDateTime).toRelative();

  return formattedTime;
}

export function convertToSeconds(formattedTime: string) {
  const [hours, minutes, secondsWithMilliseconds] = formattedTime.split(":");
  const [seconds, milliseconds] = secondsWithMilliseconds.split(".");

  const totalSeconds =
    parseInt(hours, 10) * 3600 +
    parseInt(minutes, 10) * 60 +
    parseInt(seconds, 10) +
    parseFloat(`0.${milliseconds || 0}`);

  return totalSeconds.toString();
}
