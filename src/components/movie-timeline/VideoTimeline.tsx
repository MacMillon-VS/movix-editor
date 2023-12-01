import { Chrono } from "react-chrono";
import { TimelineType } from "../../types/videos";
import { useMemo, useState } from "react";
import { thumbnail } from "../../constants/Informations";

const VideoTimeline = ({ VTimeline }: { VTimeline: TimelineType['data'] | undefined }) => {
  const memoItems = useMemo(() => {
    return (
      VTimeline?.map((time) => ({
        title: time.video_name,
        cardTitle: time.video_event,
        url: `/watch/${time?.video_number}`,
        cardSubtitle: time.video_minister,
        cardDetailedText: time.video_description,
        media: {
          type: "IMAGE",
          source: {
            url: `${import.meta.env.VITE_BACKEND_URL}${time.thumbnail}` ?? thumbnail,
          },
        },
      })) || []
    );
  }, [VTimeline]);

  return (
    <div className="w-[80%] max-h-full mt-20">
      <Chrono  slideShow
  slideItemDuration={3000}
  slideShowType="reveal" 
  theme={{ 
    primary:"#64a451",
    secondary: '#64a451',
    titleColorActive: '#fff',
  }}
  // hideControls
  cardWidth={400}
  allowDynamicUpdate={true} mode="HORIZONTAL" items={memoItems} />
    </div>
  );
};

export default VideoTimeline;