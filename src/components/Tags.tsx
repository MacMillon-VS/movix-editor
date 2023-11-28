"use client";
import { useEffect } from "react";

type props = {
  className: string;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  tags: any[];
  style?: React.CSSProperties;
  inputRef: React.Ref<HTMLInputElement>;
  setTags: React.Dispatch<React.SetStateAction<any[]>>;
};
export default function TagsInput({
  className,
  inputValue,
  setInputValue,
  setTags,
  inputRef,
  style,
  tags,
}: props) {
  //   const [tags, setTags] = useState([]);
  //   const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("tags", tags);
  }, [tags]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && inputValue.trim() !== "") {
      const newTag = inputValue;
      if (newTag.includes(":")) {
        // Split the text by the colon and take the second part.

        const allvalues = newTag.split(" ");
        const removedarray = allvalues.filter((item) => !item.includes(":"));
        const newtag = allvalues.find((item) => item.includes(":"));
        if (!newtag?.includes("tags")) {
          setInputValue(removedarray.join(" "));
          return;
        }

        if (newtag == ":") {
          setInputValue(removedarray.join(" "));
          return;
        }

        if (newtag && newtag.endsWith(":")) {
          setInputValue(removedarray.join(" "));
          alert("Invalid Value");
          return;
        }

        console.log(removedarray);

        setTags([...tags, newtag]);
        setInputValue(removedarray.join(" "));
      }
    }
    if (e.key === "Backspace" && inputValue.trim() == "") {
      const val = [...tags];
      val.pop();
      setTags(val);
    }
  };

  const removeTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  return (
    <div className="searchBar flex gap-1 cursor-pointer max-md:flex-col max-md:justify-center ">
      <div className=" flex gap-1 max-md:order-last ">
        {tags.map((tag, idx) => (
          <span key={idx} onClick={() => removeTag(tag)} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <input
        type="text"
        style={style}
        name="search"
        placeholder="Search Movies..."
        className={className}
        value={inputValue}
        onChange={handleInputChange}
        ref={inputRef}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
