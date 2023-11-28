import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiFillCode } from "react-icons/ai";
import { BiCommand } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AUTH_KEY } from "../../config";
import { VideoResponseType } from "../../types/videos";

import useKeyboardShortcuts from "../../hooks/useShortcut";
import { useNavigate } from "react-router-dom";
import TagsInput from "../Tags";
import { useDebounce } from "react-use";

type TData = {
  name: string;
  items: TItem[] | undefined;
  function: string;
};

type TItem = {
  id: number;
  link?: string;
  name: string;
};

const Categories = [
  {
    id: 0,
    name: "tags:",
  },
];

const Input = ({
  isopen,
  setOpen,
}: {
  isopen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [value, setvalue] = useState("");
  // const [debouncevalue] = useDebounce(value, 200);
  const onFocus = () => setOpen(true);
  const onBlur = () => setOpen(false);
  const inputref = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useState<any[]>([]);

  useKeyboardShortcuts({
    Search: {
      key: "k",
      ctrlKey: true,
      action: () => inputref.current?.focus(),
    },
    unfocus: {
      key: "Escape",
      action: () => setOpen(false),
    },
  });
  const {
    data: FilteredArray,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["search_movies"],
    queryFn: async () => {
      if (!value) return;
      const filteredValues = tags.filter((value) => value.includes("tags:"));
      const tagValues = filteredValues.map((value) => value.split(":")[1]);
      const tag = tagValues.join(",") || " ";
      console.log(tag);

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/video/video?search=${
          value || " "
        }&tag=${tag || ""}`,
        {
          headers: {
            Authorization: AUTH_KEY,
          },
        }
      );

      return data as VideoResponseType;
    },
    onError: (err: unknown) => {
      // alert("Something Went Wrong");
      console.log(err);
    },
    enabled: false,
  });

  useDebounce(
    () => {
      if (value !== "") {
        refetch();
      }
    },
    400,
    [value]
  );

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const Data: TData[] = [
    {
      name: "Categories",
      function: "append",
      items: Categories,
    },
    {
      name: "Movies",
      function: "redirect",
      items: FilteredArray?.results.map((item: any) => {
        return {
          id: item.video_number,
          name: item.video_name,
          link: "/movie/id",
        };
      }),
    },
  ];

  return (
    <div
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={1}
      className={`border-[1px] relative rounded-lg flex border-gray-500  py-2 px-3 justify-center items-center ${
        isopen ? "border-b-0 rounded-b-none" : ""
      }`}
    >
      {/* <input
        className={`outline-none bg-transparent transition-all w-[150px] md:w-[200px] duration-200  `}
        placeholder="Search Movies..."
        value={value}
        onChange={(e) => setvalue(e.target.value as string)}
        // style={isopen ? { width: "350px" } : {}}
      /> */}

      <TagsInput
        className={`outline-none bg-transparent transition-all max-w-full   duration-200 ${
          isopen
            ? "max-md:w-[250px] w-[300px] max-w-full transition-all "
            : "w-[150px] md:w-[200px]"
        }`}
        // style={isopen ? { width: "350px" } : {}}
        inputRef={inputref}
        inputValue={value}
        setInputValue={setvalue}
        setTags={setTags}
        tags={tags}
      />

      <Kbd />
      <SuggestionBox
        isopen={isopen}
        value={value}
        setvalue={setvalue}
        inputref={inputref}
        Data={Data}
        loading={isLoading}
        setopen={setOpen}
      />
    </div>
  );
};

const Kbd = () => {
  return (
    <div className="flex justify-center items-center">
      <BiCommand />K
    </div>
  );
};

type SuggetionProps = {
  isopen: boolean;
  focusedIndex?: number;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setvalue: React.Dispatch<React.SetStateAction<string>>;
  inputref: React.RefObject<HTMLInputElement>;
  Data: TData[];
  loading: boolean;
};

const SuggestionBox = ({
  isopen,
  loading,
  setvalue,
  setopen,
  inputref,
  Data,
}: SuggetionProps) => {
  const navigate = useNavigate();
  const handleclick = (name: TItem, item: TData) => {
    if (item.function === "append") {
      setvalue((prev) => `${prev} ${name.name}`);
      setTimeout(() => {
        inputref.current?.focus();
      }, 0);
    } else if (item.function === "redirect") {
      navigate(`/watch/${name.id}`);
      setvalue("");

      setopen(false);
    }
  };

  return (
    <>
      {isopen && (
        <div className="absolute bg-black hide-scrollbar shadow-2xl shadow-slate-800 max-h-[400px] overflow-y-scroll  bottom-0 translate-y-[101%] transition-all w-full  rounded-lg mt-2 p-2">
          {Data.map((item, index) => (
            <div key={index} className=" my-2">
              <p className=" text-gray-400 mb-1">{item.name}</p>
              {item.items?.length! <= 0 ? (
                <p className=" text-center">No Movies Found...</p>
              ) : null}

              {item.name === "Movies" && loading ? (
                <p className=" text-center">Loading....</p>
              ) : (
                ""
              )}
              {item?.items?.map((data, index) => (
                <div
                  key={index}
                  onMouseDown={() => handleclick(data, item)}
                  className=" flex items-center w-full gap-2 py-3 px-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                >
                  <AiFillCode size={20} /> {data.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Input;
