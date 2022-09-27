import { useState, useContext } from "react";
import "../CSS/p_post.css";
import "../CSS/CommonElements.css";

const PostPage = () => {
  const [content, setContent] = useState({
    title: "",
    content: "",
    img: {},
    tags: [],
  });


  // Changing Content data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((preValue) => {
      if (name == "tags")
        return {
          ...preValue,
          [name]: value.split(/(?:,| |#)+/).filter((s) => s),
        };
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  return (
    <div id="PostWrapper">
      <h1 id="PostTitle">Post</h1>
      {/* Title */}
      <TitleComp handleTextChange={handleChange} />

      {/* Tags */}
      <TagComp handleTextChange={handleChange} />

      {/* Content box */}
      <LargeTextBox
        handleTextChange={handleChange}
        title="Content"
        placeHolder=""
        wordLimit="700"
        Rows="40"
        name="content"
        Columns="18"
      />

      {/* IMG */}
      <ImageComp handleImageChange={handleChange} default={content.image} />
      {/* ------------------------------
       Submit Button*/}
      <PostButton active={(content.title != "" && content.content != "" && content.tags.length > 0)}/>
    </div>
  );
};

// Components
const TitleComp = (props) => {
  return (
    <div className="IdDiv">
      <h1 className="EntryTitle">Title</h1>
      <input
        type="text"
        name="title"
        className="RoundedDiv ThinBox"
        placeholder=""
        onChange={props.handleTextChange}
      />
    </div>
  );
};
// -----------------------------------------------------------------------------------
const ImageComp = (props) => {
  const [fileName, setFileName] = useState("");

  const uploadFile = (e) => {
    props.handleImageChange(e);
    setFileName(e.target.files[0].name);
  };

  return (
    <div>
      <h1 className="EntryTitle">Insert images</h1>
      <div className="inputfile-box-post RoundedDiv ThinBox">
        <input
          type="file"
          id="ImageInput-post"
          name="img"
          defaultValue={props.default}
          className="inputfile"
          accept="image/*"
          onChange={uploadFile}
        />
        <label htmlFor="ImageInput-post">
          <span id="file-name-post" className="file-box-post">
            {fileName}
          </span>
          <span className="file-button-post">
            <i aria-hidden="true"></i>
            Open browser
          </span>
        </label>
      </div>
    </div>
  );
};
// -----------------------------------------------------------------------------------
const LargeTextBox = (props) => {
  const { WordLimit, Rows, Col, title, name, placeHolder } = props;
  const startText = props.text ? props.text : "";
  return (
    <div>
      <h1 className="EntryTitle">{title}</h1>
      <textarea
        type="text"
        id="TextInput"
        className="RoundedDiv"
        name={name}
        maxLength={WordLimit}
        rows={Rows}
        cols={Col}
        placeholder={placeHolder}
        onChange={props.handleTextChange}
        defaultValue={startText}
      />
    </div>
  );
};
// -----------------------------------------------------------------------------------
const TagComp = (props) => {
  return (
    <div className="IdDiv">
      <h1 className="EntryTitle">Tags</h1>
      <input
        type="text"
        name="tags"
        className="RoundedDiv ThinBox"
        placeholder='Seperate Tags with:" ",#'
        // using regex to split hashtags and filtertring out any empty values
        onChange={props.handleTextChange}
      />
    </div>
  );
};

// -------------------------------------------------------------------------------------
const PostButton = (props) => {
  return (
    <div>
      <button id="PostButton" className="BlueButton Shadow" disabled={!props.active}>Post</button>
    </div>
  );
};

export default PostPage;
