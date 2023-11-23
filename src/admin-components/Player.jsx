import React, {
  useState,
  useEffect,
  createRef,
  useCallback,
  useMemo,
  memo,
  useRef,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Translate } from "react-i18nify";
import styled from "styled-components";
import backlight from "../libs/backlight";
import { isPlaying } from "../utils";
import { useParams } from "react-router-dom";
import { PlayerStyle } from "../styles/PlayerStyles";

const VideoWrap = memo(
  ({ setPlayer, setCurrentTime, setPlaying, setLoading, src, $video }) => {
    useEffect(() => {
      setPlayer($video.current);
      (function loop() {
        window.requestAnimationFrame(() => {
          if ($video.current) {
            setPlaying(isPlaying($video.current));
            setCurrentTime($video.current.currentTime || 0);
          }
          loop();
        });
      })();
    }, [setPlayer, setCurrentTime, setPlaying, $video]);

    // const onClick = useCallback(() => {
    //   if ($video.current) {
    //     if (isPlaying($video.current)) {
    //       $video.current.pause();
    //     } else {
    //       $video.current.play();
    //     }
    //   }
    // }, [$video]);

    return <video controls src={src} ref={$video} />;
  },
  () => true
);

VideoWrap.displayName = "VideoWrap";

export default function Player(props) {
  const [currentSub, setCurrentSub] = useState(null);
  const [key, setKey] = useState(1);
  const [focusing, setFocusing] = useState(false);
  const [inputItemCursor, setInputItemCursor] = useState(0);
  const $player = createRef();
  const $video = useRef();

  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const movieId = urlParams.get("movieid");

  const movie = props.CurrentMovie;
  useEffect(() => {
    $video.current.src = movie.video_url;
  }, [movie]);

  const { setLoading } = props;
  useEffect(() => {
    if ($player.current && props.player && !backlight.state) {
      backlight.state = true;
      backlight($player.current, props.player);
    }
  }, [$player, props.player]);

  useMemo(() => {
    setCurrentSub(props.subtitle[props.currentIndex]);
  }, [props.subtitle, props.currentIndex]);

  const onChange = useCallback(
    (event) => {
      props.player.pause();
      props.updateSub(currentSub, { text: event.target.value });
      if (event.target.selectionStart) {
        setInputItemCursor(event.target.selectionStart);
      }
    },
    [props, currentSub]
  );

  const onClick = useCallback(
    (event) => {
      props.player.pause();
      if (event.target.selectionStart) {
        setInputItemCursor(event.target.selectionStart);
      }
    },
    [props]
  );

  const onFocus = useCallback((event) => {
    setFocusing(true);
    if (event.target.selectionStart) {
      setInputItemCursor(event.target.selectionStart);
    }
  }, []);

  const onBlur = useCallback(() => {
    setTimeout(() => setFocusing(false), 500);
  }, []);

  const onSplit = useCallback(() => {
    props.splitSub(currentSub, inputItemCursor);
  }, [props, currentSub, inputItemCursor]);

  return (
    <PlayerStyle className="player">
      <div className="video" ref={$player}>
        <VideoWrap
          {...props}
          setLoading={setLoading}
          key={"rerender"}
          src={movie?.video_url}
          $video={$video}
        />
        {props.player && currentSub ? (
          <div className="subtitle">
            {focusing ? (
              <div className="operate" onClick={onSplit}>
                <Translate value="SPLIT" />
              </div>
            ) : null}
            <TextareaAutosize
              className={`textarea ${!props.playing ? "pause" : ""}`}
              value={currentSub.text}
              onChange={onChange}
              onClick={onClick}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onFocus}
              spellCheck={false}
            />
          </div>
        ) : null}
      </div>
    </PlayerStyle>
  );
}
