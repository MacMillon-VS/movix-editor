import axios, { AxiosError } from "axios";
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

    if (!res.data) {
      return { error: "Something Went Wrong" };
    }
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      if (error.response.status === 403) {
        return { error: "unauthorised", status: error.response.status };
      }

      if (error.response.status !== 200) {
        return { error: "Something Went Wrong", status: error.response.status };
      } else {
        return { error: "Something Went Wrong" };
      }
    } else {
      return { error: "Something Went Wrong" };
    }
  }
}
