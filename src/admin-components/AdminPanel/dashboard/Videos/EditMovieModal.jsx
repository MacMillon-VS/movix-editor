import React, { useState } from "react";
import { Input } from "../../../ui/Input";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useMutation } from "../../useAxios";
import { FormatDate } from "../../../../utils";

const EditMovieModal = ({ setShowModal, Movie }) => {
  const { updateMutation, loading, error } = useMutation();
  const [tags, setTags] = useState(Movie?.video_tags || []);
  const [ValidationError, setValidationError] = useState();

  const [formData, setFormData] = useState({
    title: Movie?.video_name,
    minister: Movie?.video_members,
    video_link: Movie?.video_url,
    event: Movie?.video_event,
    description: Movie.video_description,
    image: Movie.thumbnail,
  });
  // TODO: Add Images

  const handleChange = (tags) => {
    setValidationError("");
    setTags(tags);
  };
  const handleFormChanges = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { video_link, description, event, minister, title } = formData;
    if (tags.length < 1) {
      return setValidationError("Tags are Required");
    }
    const payload = {
      video_url: video_link,
      video_description: description,
      video_event: event,
      video_minister: minister,
      video_name: title,
      video_tags: tags,
    };

    if (!Movie.video_number) {
      return;
    }
    const data = await updateMutation(
      `${import.meta.env.VITE_BACKEND_URL}/api/video/video/${
        Movie.video_number
      }`,
      payload
    );

    window.location.reload();
    setShowModal(false);
  };

  return (
    <div className=" text-white bg-background p-5 rounded-md border border-solid shadow border-gray-400 ">
      <h1 className=" text-xl font-bold mb-4">Edit Movie</h1>
      <div>
        <form className=" flex flex-col gap-3 " onSubmit={handleSubmit}>
          <div className=" flex gap-2">
            <Input
              type="text"
              className={"bg-[#2e374a]"}
              placeholder="Enter movie title"
              label="Title"
              id={"title"}
              required={true}
              value={formData.title}
              onChange={handleFormChanges}
              //   subtitle={""}
            />

            <Input
              type="text"
              required={true}
              className={"bg-[#2e374a]"}
              placeholder="Enter movie Minister"
              label="Minister"
              id={"minister"}
              value={formData.minister}
              onChange={handleFormChanges}
            />
          </div>
          <Input
            type="text"
            required={true}
            className={"bg-[#2e374a]"}
            placeholder="Enter Video Link"
            label="Video Link"
            id={"video_link"}
            value={formData.video_link}
            onChange={handleFormChanges}
          />
          <Input
            type="text"
            className={"bg-[#2e374a]"}
            placeholder="Enter Event"
            label="Event"
            required={true}
            id={"event"}
            value={formData.event}
            onChange={handleFormChanges}
          />
          <div className="flex flex-col gap-1 text-white">
            <p className="text-sm font-medium mb-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-start ">
              Tags:
            </p>

            <TagsInput
              onlyUnique={true}
              maxTags={10}
              className="bg-[#2e374a] !text-white"
              addOnBlur={true}
              validate={(tag) => {
                if (tag.length <= 1) {
                  return false;
                }
                return true;
              }}
              value={tags}
              onChange={handleChange}
              addKeys={[32]}
            />
            <p className=" text-red-500">{ValidationError}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium mb-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-start ">
              Description
            </p>
            <ReactTextareaAutosize
              value={formData.description}
              onChange={handleFormChanges}
              //   maxLength={225}
              required={true}
              maxRows={6}
              name="description"
              minRows={3}
              placeholder="Enter The Description"
              className="flex h-9 w-full rounded-md  bg-[#2e374a] px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />

            {error ? (
              <p className=" text-red-400">
                Something Went Wrong Please Try Again
              </p>
            ) : null}
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
              {loading ? "Updating..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovieModal;
