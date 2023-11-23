import React, { useEffect, useRef, useState } from "react";
import { AiFillCode } from "react-icons/ai";
import { BiCommand } from "react-icons/bi";
import { Movies } from "./MoviesData";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AUTH_KEY } from "../../config";
import { VideoResponseType } from "../../types/videos";
import useDebounce from "../../hooks/useDebounce";
import useKeyboardShortcuts from "../../hooks/useShortcut";
import { useNavigate } from "react-router-dom";

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
    name: "tag:",
  },
  
];

const Input = () => {
  const [isopen, setOpen] = useState(false);
  const [value, setvalue] = useState("");
  const [debouncevalue, setdebouncevalue] = useDebounce(value, 200);
  const onFocus = () => setOpen(true);
  const onBlur = () => setOpen(false);
  const inputref = useRef<HTMLInputElement>(null);

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
      if(!debouncevalue) return;
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/video/video?search=${debouncevalue}`,
        {
          headers: {
            Authorization: AUTH_KEY,
          },
        }
      );

      return data as VideoResponseType;
    },
    onError: (err) => {
      // alert("Something Went Wrong");
      console.log(err);
    },
    enabled: false,
  });

  useEffect(() => {
    if (debouncevalue !== "") {
      refetch();
    }
  }, [debouncevalue]);

  const Data: TData[] = [
    {
      name: "Categories",
      function: "append",
      items: Categories,
    },
    {
      name: "Movies",
      function: "redirect",
      items: FilteredArray?.results.map((item) => {
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
      <input
        className={`outline-none bg-transparent transition-all w-[150px] md:w-[200px] duration-200  `}
        placeholder="Search Movies..."
        style={isopen ? { width: "350px" } : {}}
        value={value}
        onChange={(e) => setvalue(e.target.value as string)}
        ref={inputref}
      />
      <Kbd />
      <SuggestionBox
        isopen={isopen}
        value={value}
        setvalue={setvalue}
        inputref={inputref}
        Data={Data}
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
};

const SuggestionBox = ({
  isopen,
  setvalue,
  setopen,
  inputref,
  Data,
}: SuggetionProps) => {
  const navigate= useNavigate();
  const handleclick = (name: TItem, item: TData) => {
    if (item.function === "append") {
      setvalue((prev) => `${prev} ${name.name}`);
      setTimeout(() => {
        inputref.current?.focus();
      }, 0);
    } else if (item.function === "redirect") {
      // redirect('/watch/1312')
      navigate(`/watch/${name.id}`)
      // window.location.href = `http://localhost:5173/watch/${name.id}`;
      setopen(false);
    }
  };

  return (
    <>
      {isopen && (
        <div className="absolute bg-black shadow-2xl shadow-slate-800 max-h-[400px] overflow-y-scroll  bottom-0 translate-y-[101%] transition-all w-full  rounded-lg mt-2 p-2">
          {Data.map((item) => (
            <div className=" my-2">
              <p className=" text-gray-400 mb-1">{item.name}</p>
              {item.items?.length! <= 0 ? (
                <p className=" text-center">No Movies Found...</p>
              ) : (
                ""
              )}

              {item?.items?.map((data) => (
                <div
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
