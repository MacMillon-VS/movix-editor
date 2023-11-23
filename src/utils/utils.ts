type subtitle = {
  id: number;
  video_id: number;
  srt_sequence_number: number;
  start_time: string;
  end_time: string;
  sub_title: string;
  language: number;
  uploded_user_id: number;
  updated_at: string;
};

export function jsonToWebVTT(jsonData: subtitle[]) {
  let webVTTString = "WEBVTT\n\n";
  for (const caption of jsonData) {
    webVTTString += `${caption.start_time} --> ${caption.end_time}\n- ${caption.sub_title}\n\n`;
  }

  console.log(webVTTString);
  // Create a Blob from the WebVTT string
  const blob = new Blob([webVTTString], { type: "text/vtt" });

  // Create a Blob URL from the Blob
  const blobUrl = URL.createObjectURL(blob);
  return blobUrl;
}

export const downloadFile = (
  filePath?: string,
  fileName = "Example-PDF-file.mp4"
) => {
  fetch(filePath as string, {
    method: "GET",
    headers: {
      "Content-Type": "video/mp4",
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      link.click();
    });
};
