import React, { useState } from "react";
import { Input } from "../../../ui/Input";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useMutation } from "../../useAxios";
import { FormatDate } from "../../../../utils";
import { useAuthUser } from "react-auth-kit";

const AddHighlightsModal = ({ setShowModal }) => {
  const { executeMutation, loading, error } = useMutation();
  const [ValidationError, setValidationError] = useState();
  const userFn = useAuthUser();
  const user = userFn();

  const [formData, setFormData] = useState({
    video_id: 0,
    highlight_title: "",
    highlight_description: "",
    highlight_priority: 0,
  });

  const handleFormChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let {
      highlight_description,
      highlight_priority,
      highlight_title,
      video_id,
    } = formData;

    try {
      video_id = parseInt(video_id);
      highlight_priority = parseInt(highlight_priority);
    } catch (error) {
      return setValidationError("Something Went Wrong");
    }

    if (!user.id) {
      return;
    }

    const payload = {
      highlight_description,
      highlight_priority,
      highlight_title,
      video_id,
      uploded_user_id: user.id,
    };

    const data = await executeMutation(
      `${import.meta.env.VITE_BACKEND_URL}/api/video/video-highlights`,
      payload
    );
    setShowModal(false);
  };

  return (
    <div className=" text-white bg-background p-5 rounded-md border border-solid shadow border-gray-400 ">
      <h1 className=" text-xl font-bold mb-4">Add A Highlight </h1>
      <div>
        <form
          className=" flex flex-col gap-3 min-w-[300px] "
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            className={"bg-[#2e374a]"}
            placeholder="Enter Highlight title"
            label="Title"
            id={"highlight_title"}
            required={true}
            value={formData.highlight_title}
            onChange={handleFormChanges}
            //   subtitle={""}
          />

          <Input
            type="text"
            className={"bg-[#2e374a]"}
            placeholder="Enter Video Id"
            label="Video id"
            id={"video_id"}
            required={true}
            value={formData.video_id}
            onChange={handleFormChanges}
          />

          <Input
            type="text"
            className={"bg-[#2e374a]"}
            placeholder="Priority"
            label="Priority"
            required={true}
            id={"highlight_priority"}
            value={formData.highlight_priority}
            onChange={handleFormChanges}
          />

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium mb-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-start ">
              Description
            </p>
            <ReactTextareaAutosize
              required={true}
              value={formData.highlight_description}
              onChange={handleFormChanges}
              //   maxLength={225}
              maxRows={6}
              name="highlight_description"
              minRows={3}
              placeholder="Enter The Description"
              className="flex h-9 w-full rounded-md  bg-[#2e374a] px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            {error ? (
              <p className=" text-red-500">Something Went Wrong Try again</p>
            ) : (
              ""
            )}
            {ValidationError ? (
              <p className=" text-red-500">Something Went Wrong Try again</p>
            ) : (
              ""
            )}
          </div>

          <div className=" flex w-full justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className=" bg-gray-200 px-4 py-2 rounded-md shadow text-gray-500 font-semibold hover:bg-gray-300/90"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className=" bg-[#4f46e5] px-4 py-2 rounded-md shadow text-white font-semibold hover:bg-[#4f46e5]/90"
            >
              {loading ? "Generating..." : "Add Highlight"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHighlightsModal;
