export type VideosType = {
  video_number: number;
  video_url: string;
  video_name: string;
  video_year: number;
  video_session: number;
  video_date: number;
  video_event: string;
  video_description: string;
  video_members: string;
  video_minister: string;
  thumbnail: string;
  video_sequence_number: number;
  video_tags: string[];
  video_uploaded_user_id: string | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

export type VideoResponseType = {
  count: number;
  next: null | number;
  previous: null | number;
  results: VideosType[];
};
export type HighLightsResponseType = {
  code: number;
  message: string;
  data: HighlightsType[];
};

export type HighlightsType = {
  id: number;
  video_id: number;
  video_data: {
    video_number: number;
    video_url: string | null;
    video_name: string | null;
    video_year: number | null;
    video_session: string | null;
    video_date: string | null;
    video_event: string | null;
    video_description: string | null;
    video_members: string | null;
    video_minister: string | null;
    video_sequence_number: string | null;
    video_tags: string[] | null;
    thumbnail: string | null;
  };
  highlight_title: string;
  highlight_description: string;
  highlight_priority: number;
  uploded_user_id: number;
  updatedat: string;
};

export type SubtitleSearchResponseType = {
  count: number;
  next: null | number;
  previous: null | number;
  results: {
    id: number;
    video_id: number;
    srt_sequence_number: number;
    start_time: string;
    end_time: string;
    sub_title: string;
    language: number;
    uploded_user_id: number;
    updated_at: string;
  }[];
};
