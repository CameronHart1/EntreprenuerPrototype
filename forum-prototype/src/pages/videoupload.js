import { useState, useContext, useEffect, useRef } from "react";
import "../CSS/p_upload_video.css";
import "../CSS/CommonElements.css";

const UploadVideoPage = () => {
  const [content, setContent] = useState({
    title: "",
    description: "",
    video: {},
  });

  // Changing Content data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  return (
    <div id="VideoUploadWrapper">
      <div id="VideoUploadMain">
        <h1 id="VideoUploadTitle">Upload videos</h1>

        {/* Video */}
        <VideoComp handleVideoChange={handleChange} default={content.image} />

        {/* Title */}
        <ThinInputComp
          name="title"
          label="Title"
          handleTextChange={handleChange}
        />

        {/* Description */}
        <ThinInputComp
          name="description"
          label="Description"
          handleTextChange={handleChange}
        />
        {/* ------------------------------
       Submit Button*/}
        <UploadButton
          active={
            content.title != "" &&
            content.description != "" &&
            content.video != {}
          }
        />
      </div>
      <div id="VideoUploadRight"></div>
    </div>
  );
};

// Components
const ThinInputComp = (props) => {
  return (
    <div className="IdDiv">
      <h1 className="EntryTitle">{props.label}</h1>
      <input
        type="text"
        name={props.name}
        className="RoundedDiv ThinBox"
        placeholder=""
        onChange={props.handleTextChange}
      />
    </div>
  );
};
// -----------------------------------------------------------------------------------
const VideoComp = (props) => {
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const uploadFile = (e) => {
    const { value } = e.target;
    setFileName(value);
    props.handleVideoChange(e);
  };

  // thanks https://www.codemzy.com/blog/react-drag-drop-file-upload
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        uploadFile(e)
        setDragActive(false);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input
        ref={inputRef}
        type="file"
        id="VideoInput"
        name="video"
        defaultValue={props.default}
        className="inputfile"
        accept="video/*"
        onChange={uploadFile}
      />
      <label
        htmlFor="VideoInput"
        id="VideoUploadArea"
      >
        <div className="inputfile-box RoundedDiv ThinBox">
          {fileName!=""&&<video id="VideoPreview" src={fileName} />}
          <h1 id="UploadTitle">{dragActive?"Upload Files":"Drag and drop video files"}</h1>
          <p id="UploadText">{dragActive?"":"Setup a stream to start a new live video now"}</p>
          <button className="file-button" onClick={onButtonClick}>
            <i aria-hidden="true"></i>
            <img src={`${process.env.PUBLIC_URL}\\icons\\upload.svg`} />
            Or choose file
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};
// ---------------

// -------------------------------------------------------------------------------------
const UploadButton = (props) => {
  return (
    <div>
      <button
        id="PostButton"
        className="BlueButton Shadow"
        disabled={!props.active}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadVideoPage;
