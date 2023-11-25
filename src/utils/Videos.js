import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;
export const GetMovie = async (id, authToken) => {
  try {
    const res = await axios.get(`${baseUrl}/api/video/video/${id}`, {
      headers: {
        Authorization: authToken,
      },
    });

    if (!res) return { data: undefined, error: "Something Went wrong" };
    return { data: res.data, error: undefined };
  } catch (error) {
    if (error.name === "AxiosError") {
      if (error.response.status === 401) {
        return { data: undefined, error: "unauthorised" };
      }
    }
  }
};

export async function GETSUBTITLE(id, authToken, lang = "en") {
  const res = await axios.get(
    `${baseUrl}/api/video/sub-titles?video_id=${id}&language_key=${lang}`,
    {
      headers: {
        Authorization: authToken,
      },
    }
  );

  if (!res) return undefined;
  return res.data;
}

export async function UpdateSubtitle(payload, authToken) {
  try {
    const res = await axios.post(`${baseUrl}/api/video/sub-titles`, payload, {
      headers: {
        Authorization: authToken,
      },
    });

    if (res.status === 401) {
      return { error: "unauthorised", status: res.status };
    }

    if (res.status !== 200) {
      return { error: "Something Went Wrong", status: res.status };
    } else {
      return res.data;
    }
  } catch (error) {
    return { error: "Something Went Wrong" };
  }
}
