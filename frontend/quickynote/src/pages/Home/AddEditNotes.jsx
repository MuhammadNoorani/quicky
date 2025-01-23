import { analyzePriority } from '../../utils/sentimentAnalyzer';
import PriorityIndicator from '../../components/PriorityIndicator/PriorityIndicator';

import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

// Add Ons
import FocusMode from '../../components/FocusMode/FocusMode';

const AddEditNotes = ({
  noteData,
  type,
  onClose,
  showToastMessage,
  getAllNotes,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  // Temporarily comment out the platform and related states
  // const [platform, setPlatform] = useState(noteData?.platform || "Platform1");
  const [isPublished, setIsPublished] = useState(noteData?.isPublished || false);
  const [twitterDetails, setTwitterDetails] = useState({
    apiKey: noteData?.twitterDetails?.apiKey || "",
    oauthToken: noteData?.twitterDetails?.oauthToken || "",
  });
  const [error, setError] = useState(null);

  // Add On
  const [priority, setPriority] = useState(null);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setPriority(analyzePriority(newContent, tags)); // Pass tags for analysis
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
    setPriority(analyzePriority(content, newTags)); // Recalculate priority with updated tags
  };

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
        // platform,  // Temporarily comment out platform when adding a note
        isPublished,
        twitterDetails,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      handleRequestError(error);
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
        // platform,  // Temporarily comment out platform when editing a note
        isPublished,
        twitterDetails,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully", "update");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      handleRequestError(error);
    }
  };

  const handlePublish = async () => {
    if (twitterDetails.apiKey && twitterDetails.oauthToken) {
      setIsPublished(true);
      if (type === "edit") {
        editNote();
      } else {
        addNewNote();
      }
    } else {
      setError("Please enter Twitter API key and OAuth token.");
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  const handleTwitterDetailsChange = (event) => {
    const { name, value } = event.target;
    setTwitterDetails({
      ...twitterDetails,
      [name]: value,
    });
  };

  const handleRequestError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="relative black rounded p-4">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-gray-700"
        onClick={onClose}
        aria-label="Close modal"
      >
        <MdClose className="text-xl text-white" />
      </button>

      <div className="flex flex-col gap-2 text-white">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-white outline-none bg-black p-2 rounded"
          placeholder="Add your title here"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <FocusMode>
        <div className="flex flex-col gap-2 mt-4 text-white">
          <div className="flex justify-between items-center">
            <label className="input-label">CONTENT</label>
            {priority && <PriorityIndicator priority={priority} />}
          </div>
          <textarea
            type="text"
            className="text-sm text-white outline-none bg-gray-700 p-2 rounded"
            placeholder="Content"
            rows={10}
            value={content}
            onChange={handleContentChange}
          />
        </div>
      </FocusMode>

      {/* Temporarily comment out the Platform section */}
      {/* 
      <div className="flex flex-col gap-2 mt-4 text-white">
        <label className="input-label">PLATFORM</label>
        <select
          className="text-sm text-white outline-none bg-gray-700 p-2 rounded"
          value={platform}
          onChange={({ target }) => setPlatform(target.value)}
        >
          <option value="Platform1">Platform1</option>
          <option value="Platform2">Platform2</option>
          <option value="Twitter">Twitter</option>
        </select>
      </div>

      {platform === "Twitter" && (
        <div className="flex flex-col gap-2 mt-4 text-white">
          <label className="input-label">Twitter API Key</label>
          <input
            type="text"
            className="text-sm text-white outline-none bg-gray-700 p-2 rounded"
            placeholder="Enter Twitter API Key"
            name="apiKey"
            value={twitterDetails.apiKey}
            onChange={handleTwitterDetailsChange}
          />
          <label className="input-label">Twitter OAuth Token</label>
          <input
            type="text"
            className="text-sm text-white outline-none bg-gray-700 p-2 rounded"
            placeholder="Enter Twitter OAuth Token"
            name="oauthToken"
            value={twitterDetails.oauthToken}
            onChange={handleTwitterDetailsChange}
          />
        </div>
      )}
      */}

      <div className="mt-3 text-white">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={handleTagsChange} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <div className="flex gap-2">
        <button
          className="btn-primary font-medium mt-5 p-3 bg-purple-600 hover:bg-purple-800 text-white round"
          onClick={handleAddNote}
        >
          {type === "add" ? "ADD" : "Update"}
        </button>
        <button
          className="btn-primary font-medium mt-5 p-3 bg-blue-600 hover:bg-blue-800 text-white round"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default AddEditNotes;
