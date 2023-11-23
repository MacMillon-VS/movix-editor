import styled from "styled-components";
import languages from "../libs/languages";
import { t, Translate } from "react-i18nify";
import React, { useState, useCallback, useRef } from "react";
import { getExt, download } from "../utils";
import { file2sub, sub2vtt, sub2srt, sub2txt } from "../libs/readSub";
import sub2ass from "../libs/readSub/sub2ass";
import googleTranslate from "../libs/googleTranslate";
import { FFmpeg } from "@ffmpeg/ffmpeg";
// import { toBlobURL, fetchFile } from '@ffmpeg/util'
// import SimpleFS from '@forlagshuset/simple-fs';

// Icons
import { FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";

import { ToolsStyle } from "../styles/ToolsStyles";
// const fs = new SimpleFS.FileSystem();

export default function Header({
  player,
  waveform,
  newSub,
  undoSubs,
  clearSubs,
  language,
  subtitle,
  setLoading,
  formatSub,
  setSubtitle,
  setProcessing,
  notify,
}) {
  const [translate, setTranslate] = useState("en");
  const [videoFile, setVideoFile] = useState(null);
  const ffmpegRef = useRef(new FFmpeg());

  // const decodeAudioData = useCallback(
  //     async (file) => {
  //         try {
  //             // const ffmpeg = ffmpegRef.current
  //             // const baseURL = "http://localhost:5174";
  //             // ffmpeg.load({
  //             //     coreURL: `${baseURL}/ffmpeg-core.js`,
  //             //     wasmURL:
  //             //         `${baseURL}/ffmpeg-core.wasm`,

  //             //     workerURL: `${baseURL}/worker.js`,
  //             // }).then(async () => {
  //             // const { createFFmpeg, fetchFile } = FFmpeg;
  //             // ffmpeg.on('progress', ({ ratio }) => setProcessing(ratio * 100));
  //             // setLoading(t('Loading FFMPEG'));
  //             // console.log('Started Loading FFMpeg')
  //             // console.log(await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"))

  //             // console.log('-----------------------------------------FFmpeg Loaded--------------------------------------------------------------')

  //             // await ffmpeg.writeFile(file.name, await fetchFile(file));

  //             // console.log('Written in the file')
  //             // setLoading('');
  //             // notify({
  //             //     message: t('DECODE_START'),
  //             //     level: 'info',
  //             // });
  //             // const output = `${Date.now()}.mp3`;
  //             // await ffmpeg.exec(['-i', file.name, '-ac', '1', '-ar', '8000', output]);
  //             // const uint8 = await ffmpeg.readFile(output);

  //             // // download(URL.createObjectURL(new Blob([uint8])), `${output}`);
  //             // await waveform.decoder.decodeAudioData(uint8);
  //             // waveform.drawer.update();
  //             fetch('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3')
  //                 .then((res) => res.arrayBuffer())
  //                 .then((arrayBuffer) => {
  //                     const uint8 = new Uint8Array(arrayBuffer);
  //                     waveform.load(uint8);
  //                 });
  //             setProcessing(0);
  //             // ffmpeg.setProgress(() => null);
  //             notify({
  //                 message: t('DECODE_SUCCESS'),
  //                 level: 'success',
  //             });

  //         } catch (error) {
  //             setLoading('');
  //             console.log(error)
  //             setProcessing(0);
  //             notify({
  //                 message: t('DECODE_ERROR'),
  //                 level: 'error',
  //             });
  //         }
  //     },
  //     [waveform, notify, setProcessing, setLoading],
  // );

  // const burnSubtitles = useCallback(async () => {
  //     try {
  //         const { createFFmpeg, fetchFile } = FFmpeg;
  //         const ffmpeg = createFFmpeg({ log: true });
  //         ffmpeg.setProgress(({ ratio }) => setProcessing(ratio * 100));
  //         setLoading(t('LOADING_FFMPEG'));
  //         await ffmpeg.load();
  //         setLoading(t('LOADING_FONT'));

  //         await fs.mkdir('/fonts');
  //         const fontExist = await fs.exists('/fonts/Microsoft-YaHei.ttf');
  //         if (fontExist) {
  //             const fontBlob = await fs.readFile('/fonts/Microsoft-YaHei.ttf');
  //             ffmpeg.FS('writeFile', `tmp/Microsoft-YaHei.ttf`, await fetchFile(fontBlob));
  //         } else {
  //             const fontUrl = 'https://cdn.jsdelivr.net/gh/zhw2590582/SubPlayer/docs/Microsoft-YaHei.ttf';
  //             const fontBlob = await fetch(fontUrl).then((res) => res.blob());
  //             await fs.writeFile('/fonts/Microsoft-YaHei.ttf', fontBlob);
  //             ffmpeg.FS('writeFile', `tmp/Microsoft-YaHei.ttf`, await fetchFile(fontBlob));
  //         }
  //         setLoading(t('LOADING_VIDEO'));
  //         ffmpeg.FS(
  //             'writeFile',
  //             videoFile ? videoFile.name : 'sample.mp4',
  //             await fetchFile(videoFile || 'sample.mp4'),
  //         );
  //         setLoading(t('LOADING_SUB'));
  //         const subtitleFile = new File([new Blob([sub2ass(subtitle)])], 'subtitle.ass');
  //         ffmpeg.FS('writeFile', subtitleFile.name, await fetchFile(subtitleFile));
  //         setLoading('');
  //         notify({
  //             message: t('BURN_START'),
  //             level: 'info',
  //         });
  //         const output = `${Date.now()}.mp4`;
  //         await ffmpeg.run(
  //             '-i',
  //             videoFile ? videoFile.name : 'sample.mp4',
  //             '-vf',
  //             `ass=${subtitleFile.name}:fontsdir=/tmp`,
  //             '-preset',
  //             videoFile ? 'fast' : 'ultrafast',
  //             output,
  //         );
  //         const uint8 = ffmpeg.FS('readFile', output);
  //         download(URL.createObjectURL(new Blob([uint8])), `${output}`);
  //         setProcessing(0);
  //         ffmpeg.setProgress(() => null);
  //         notify({
  //             message: t('BURN_SUCCESS'),
  //             level: 'success',
  //         });
  //     } catch (error) {
  //         setLoading('');
  //         setProcessing(0);
  //         notify({
  //             message: t('BURN_ERROR'),
  //             level: 'error',
  //         });
  //     }
  // }, [notify, setProcessing, setLoading, videoFile, subtitle]);

  // const onVideoChange = useCallback(
  //     (event) => {
  //         const file = event.target.files[0];
  //         if (file) {
  //             const ext = getExt(file.name);
  //             const canPlayType = player.canPlayType(file.type);
  //             if (canPlayType === 'maybe' || canPlayType === 'probably') {
  //                 setVideoFile(file);
  //                 console.log('Before Decode');
  //                 decodeAudioData(file)
  //                 const url = URL.createObjectURL(new Blob([file]));
  //                 waveform.decoder.destroy();
  //                 waveform.drawer.update();
  //                 waveform.seek(0);
  //                 player.currentTime = 0;
  //                 clearSubs();
  //                 setSubtitle([
  //                     newSub({
  //                         start: '00:00:00.000',
  //                         end: '00:00:01.000',
  //                         text: t('SUB_TEXT'),
  //                     }),
  //                 ]);
  //                 player.src = url;

  //             } else {
  //                 notify({
  //                     message: `${t('VIDEO_EXT_ERR')}: ${file.type || ext}`,
  //                     level: 'error',
  //                 });
  //             }
  //         }
  //     },
  //     [newSub, notify, player, setSubtitle, waveform, clearSubs, decodeAudioData],
  // );

  const onSubtitleChange = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        const ext = getExt(file.name);
        if (["ass", "vtt", "srt", "json"].includes(ext)) {
          file2sub(file)
            .then((res) => {
              clearSubs();
              setSubtitle(res);
            })
            .catch((err) => {
              notify({
                message: err.message,
                level: "error",
              });
            });
        } else {
          notify({
            message: `${t("SUB_EXT_ERR")}: ${ext}`,
            level: "error",
          });
        }
      }
    },
    [notify, setSubtitle, clearSubs]
  );

  const onInputClick = useCallback((event) => {
    event.target.value = "";
  }, []);

  const downloadSub = useCallback(
    (type) => {
      let text = "";
      const name = `${Date.now()}.${type}`;
      switch (type) {
        case "vtt":
          text = sub2vtt(subtitle);
          break;
        case "srt":
          text = sub2srt(subtitle);
          break;
        case "ass":
          text = sub2ass(subtitle);
          break;
        case "txt":
          text = sub2txt(subtitle);
          break;
        case "json":
          text = JSON.stringify(subtitle);
          break;
        default:
          break;
      }
      const url = URL.createObjectURL(new Blob([text]));
      download(url, name);
    },
    [subtitle]
  );

  const onTranslate = useCallback(() => {
    setLoading(t("TRANSLATING"));
    googleTranslate(formatSub(subtitle), translate)
      .then((res) => {
        setLoading("");
        console.log(res);
        setSubtitle(formatSub(res));
        notify({
          message: t("TRANSLATE_SUCCESS"),
          level: "success",
        });
      })
      .catch((err) => {
        setLoading("");
        notify({
          message: err.message,
          level: "error",
        });
      });
  }, [subtitle, setLoading, formatSub, setSubtitle, translate, notify]);

  return (
    <ToolsStyle className="tool">
      <div className="top">
        <div className="import">
          {/* <div className="btn">
                        <Translate value="OPEN_VIDEO" />
                        <input className="file" type="file" onChange={onVideoChange} onClick={onInputClick} />
                    </div> */}
          <div className="btn">
            <FiUpload className=" hover:text-black" size={20} />
            <Translate value="OPEN SUBTITLE" />
            <input
              className="file"
              type="file"
              onChange={onSubtitleChange}
              onClick={onInputClick}
            />
          </div>
        </div>
        <div className="translate text-black">
          <select
            value={translate}
            onChange={(event) => setTranslate(event.target.value)}
          >
            {(languages[language] || languages.en).map((item) => (
              <option key={item.key} value={item.key}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="btn" onClick={onTranslate}>
            <Translate value="TRANSLATE" />
          </div>
        </div>
        <div className="export">
          <div className="btn" onClick={() => downloadSub("ass")}>
            <Translate value="EXPORT_ASS" />
          </div>
          <div className="btn" onClick={() => downloadSub("srt")}>
            <Translate value="EXPORT_SRT" />
          </div>
          <div className="btn" onClick={() => downloadSub("vtt")}>
            <Translate value="EXPORT_VTT" />
          </div>
        </div>

        <div className="operate">
          <div
            className="btn"
            onClick={() => {
              if (window.confirm(t("CLEAR Subtitles")) === true) {
                clearSubs();
              }
            }}
          >
            <Translate value="CLEAR" />
          </div>
          <div className="btn" onClick={undoSubs}>
            <Translate value="UNDO" />
          </div>
        </div>
      </div>
      <div className="bottom">
        {/* <select className=" h-[40px] px-2 text-black rounded-sm">
          <option value="English  ">English</option>
          <option value="Hindi  ">Hindi</option>
          <option value="Mallyalam ">Malyalam</option>
        </select> */}
        <Link to={"/"} className="btn">
          <Translate value="Go Back" />
        </Link>
        <div className="btn">
          <Translate value="Submit" />
        </div>
      </div>
    </ToolsStyle>
  );
}
