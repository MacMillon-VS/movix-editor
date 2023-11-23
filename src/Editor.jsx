import { useState, useEffect, useCallback, useMemo, useRef } from "react";

// import NotificationSystem from 'react-notification-system';
import DT from "duration-time-conversion"; // converting duration into time
import isEqual from "lodash/isEqual"; // Checking if Array, Objects are Equal

import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

// ---------- Components
import Tool from "./admin-components/Tool";
import Subtitles from "./admin-components/Subtitles";
import Player from "./admin-components/Player";
import Footer from "./admin-components/Footer";
import Loading from "./admin-components/Loading";
import ProgressBar from "./admin-components/ProgressBar";

// ------------- Local Utils
import { getKeyCode } from "./utils";
import Sub from "./libs/Sub";
import { HomeStyle } from "./styles/EditorStyles";
import { useAuthHeader, useSignIn, useSignOut } from "react-auth-kit";
import { GETSUBTITLE, GetMovie, UpdateSubtitle } from "./utils/Videos";
import { useDebounce } from "./hooks/useAdminDebounce";

// -------------- Styling

export default function Editor() {
  const subtitleHistory = useRef([]);
  // const notificationSystem = useRef(null);
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState("");
  const [processing, setProcessing] = useState(0);
  const [subtitle, setSubtitleOriginal] = useState([]);
  const [waveform, setWaveform] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isToolsDrawerOpen, setisToolsDrawerOpen] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [CurrentMovie, setCurrentMovie] = useState({});
  const debouncedsubtitle = useDebounce(subtitle, 2000);

  const token = useAuthHeader();
  const SignOut = useSignOut();

  const newSub = useCallback((item) => new Sub(item), []); // Function to create Instances of Sub
  const hasSub = useCallback((sub) => subtitle.indexOf(sub), [subtitle]);

  // Function to Create Instances for Sub Class Here if prop sub is an array it will loop to every item and create new instance
  const formatSub = useCallback(
    (sub) => {
      if (Array.isArray(sub)) {
        return sub.map((item) => newSub(item));
      }
      return newSub(sub);
    },
    [newSub]
  );

  // Using the above function and creating sub for every item in sub
  const copySubs = useCallback(
    () => formatSub(subtitle),
    [subtitle, formatSub]
  );

  useEffect(() => {}, [currentLanguage]);

  const setSubtitle = useCallback(
    (newSubtitle, saveToHistory = true) => {
      if (!isEqual(newSubtitle, subtitle)) {
        if (saveToHistory) {
          if (subtitleHistory.current.length >= 1000) {
            subtitleHistory.current.shift();
          }
          subtitleHistory.current.push(formatSub(subtitle));
        }

        setSubtitleOriginal(newSubtitle);
      }
    },
    [subtitle, setSubtitleOriginal, formatSub]
  );

  const undoSubs = useCallback(() => {
    const subs = subtitleHistory.current.pop();
    if (subs) {
      setSubtitle(subs, false);
    }
  }, [setSubtitle, subtitleHistory]);

  const clearSubs = useCallback(() => {
    setSubtitle([]);
    subtitleHistory.current.length = 0;
  }, [setSubtitle, subtitleHistory]);

  const checkSub = useCallback(
    (sub) => {
      const index = hasSub(sub);
      if (index < 0) return;
      const previous = subtitle[index - 1];
      return (
        (previous && sub.startTime < previous.endTime) ||
        !sub.check ||
        sub.duration < 0.2
      );
    },
    [subtitle, hasSub]
  );

  const notify = useCallback((obj) => {
    alert(obj.message);
  }, []);

  const removeSub = useCallback(
    (sub) => {
      const index = hasSub(sub);
      if (index < 0) return;
      const subs = copySubs();
      subs.splice(index, 1);
      setSubtitle(subs);
    },
    [hasSub, copySubs, setSubtitle]
  );

  const addSub = useCallback(
    (index, sub) => {
      const subs = copySubs();
      subs.splice(index, 0, formatSub(sub));
      setSubtitle(subs);
    },
    [copySubs, setSubtitle, formatSub]
  );

  const updateSub = useCallback(
    (sub, obj) => {
      const index = hasSub(sub);
      if (index < 0) return;
      const subs = copySubs();
      const subClone = formatSub(sub);
      Object.assign(subClone, obj);
      if (subClone.check) {
        subs[index] = subClone;
        setSubtitle(subs);
      }
    },
    [hasSub, copySubs, setSubtitle, formatSub]
  );

  const mergeSub = useCallback(
    (sub) => {
      const index = hasSub(sub);
      if (index < 0) return;
      const subs = copySubs();
      const next = subs[index + 1];
      if (!next) return;
      const merge = newSub({
        start: sub.start,
        end: next.end,
        text: sub.text.trim() + "\n" + next.text.trim(),
      });
      subs[index] = merge;
      subs.splice(index + 1, 1);
      setSubtitle(subs);
    },
    [hasSub, copySubs, setSubtitle, newSub]
  );

  const splitSub = useCallback(
    (sub, start) => {
      const index = hasSub(sub);
      if (index < 0 || !sub.text || !start) return;
      const subs = copySubs();
      const text1 = sub.text.slice(0, start).trim();
      const text2 = sub.text.slice(start).trim();
      if (!text1 || !text2) return;
      const splitDuration = (sub.duration * (start / sub.text.length)).toFixed(
        3
      );
      if (splitDuration < 0.2 || sub.duration - splitDuration < 0.2) return;
      subs.splice(index, 1);
      const middleTime = DT.d2t(sub.startTime + parseFloat(splitDuration));
      subs.splice(
        index,
        0,
        newSub({
          start: sub.start,
          end: middleTime,
          text: text1,
        })
      );
      subs.splice(
        index + 1,
        0,
        newSub({
          start: middleTime,
          end: sub.end,
          text: text2,
        })
      );
      setSubtitle(subs);
    },
    [hasSub, copySubs, setSubtitle, newSub]
  );

  const onKeyDown = useCallback(
    (event) => {
      const keyCode = getKeyCode(event);
      switch (keyCode) {
        case 32:
          event.preventDefault();
          if (player) {
            if (playing) {
              player.pause();
            } else {
              player.play();
            }
          }
          break;
        case 90:
          event.preventDefault();
          if (event.metaKey) {
            undoSubs();
          }
          break;
        default:
          break;
      }
    },
    [player, playing, undoSubs]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useMemo(() => {
    const currentIndex = subtitle.findIndex(
      (item) => item.startTime <= currentTime && item.endTime > currentTime
    );
    setCurrentIndex(currentIndex);
  }, [currentTime, subtitle]);

  useEffect(() => {
    const fetchSubtitle = () =>
      GETSUBTITLE(CurrentMovie?.video_number, token()).then((res) => {
        // setSubtitleOriginal(res.map((item) => new Sub(item)));
        if (res.results.length > 0) {
          console.log(res.results);
          setSubtitleOriginal(
            res.results.map((item) => {
              const formattedres = {
                start: item?.start_time,
                end: item?.end_time,
                text: item?.sub_title,
              };
              return newSub(formattedres);
            })
          );
        } else {
          setSubtitleOriginal([
            newSub({
              start: "00:00:00.721",
              end: "00:00:05.614",
              text: "Subtitles",
            }),
          ]);
        }
      });

    console.log(CurrentMovie, "Current");
    if (!!CurrentMovie?.video_number) {
      fetchSubtitle();
    }
  }, [setSubtitleOriginal, CurrentMovie]);

  useEffect(() => {
    // console.log(subtitle, "SUBTITLE");
    const formattedsubtitle = subtitle.map((item, index) => ({
      srt_sequence_number: index,
      start_time: item.start,
      end_time: item.end,
      sub_title: `${item.text} ${item.text2 ? `\n ${item.text2}` : ""}`,
    }));

    const payload = {
      video_id: CurrentMovie.video_number,
      language_code: "mal",
      srt_data: formattedsubtitle,
    };

    async function updateSubtitles() {
      const response = await UpdateSubtitle(payload, token());
      if (response.error) {
        alert("Subtitles are not updated");
      } else {
        console.log("Subtitles are updated");
      }
    }

    if (payload.video_id) {
      console.log(payload);
      updateSubtitles();
    }
  }, [debouncedsubtitle]);

  const GETMOVIE = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get("movieid");
    const { data: movie, error } = await GetMovie(movieId, token());
    if (error === "unauthorised") {
      SignOut();
    }
    if (error) {
      return (window.location.pathname = "/");
    }
    setCurrentMovie(movie);
  };
  useEffect(() => {
    GETMOVIE();
  }, []);

  useEffect(() => {
    function handleBeforeUnload(event) {
      event.preventDefault();

      return (event.returnValue = "");
    }
    window.addEventListener("beforeunload", handleBeforeUnload, {
      capture: "true",
    });

    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload, {
        capture: "true",
      });
  }, []);

  const props = {
    player,
    setPlayer,
    subtitle,
    setSubtitle,
    waveform,
    setWaveform,
    currentTime,
    setCurrentTime,
    currentIndex,
    setCurrentIndex,
    playing,
    setPlaying,
    loading,
    setLoading,
    setProcessing,
    subtitleHistory,
    CurrentMovie,
    setCurrentMovie,
    currentLanguage,
    setCurrentLanguage,

    notify,
    newSub,
    hasSub,
    checkSub,
    removeSub,
    addSub,
    undoSubs,
    clearSubs,
    updateSub,
    formatSub,
    mergeSub,
    splitSub,
  };

  return (
    <HomeStyle>
      <div className="main">
        <Player {...props} />
        <Subtitles {...props} />
        <div
          className=" tools_trigger"
          onClick={() => setisToolsDrawerOpen((prev) => !prev)}
        >
          {isToolsDrawerOpen ? <BiArrowFromLeft color="white"/> : <BiArrowFromRight color="white" />}
        </div>
        {isToolsDrawerOpen && <Tool {...props} />}
      </div>
      <Footer {...props} />
      {loading ? <Loading loading={loading} /> : null}
      {processing > 0 && processing < 100 ? (
        <ProgressBar processing={processing} />
      ) : null}
    </HomeStyle>
  );
}
