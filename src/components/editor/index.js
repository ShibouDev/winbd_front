import { Box, Button, TextField } from "@mui/material";
import { EditorState, convertToRaw } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import draftToHtml from "draftjs-to-html";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import { addNews, editNews, uploadFile } from "../../actions/newsActions";
import { apiConfig } from "../../config/api";
import { validNews } from "../../utils/news/validator";
import styles from "./styles.module.css";

export const EditorWrapper = ({ preview, content, children, edit }) => {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(
    !preview && !content
      ? EditorState.createEmpty()
      : edit
      ? EditorState.createWithContent(stateFromHTML(content.rawText))
      : EditorState.createWithContent(stateFromHTML(content))
  );
  const onChange = (newState) => {
    setEditorState(newState);
  };
  const uploadCallback = (file, callback) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await uploadFile(formData);
        resolve({
          data: { link: `${apiConfig.staticURL}/${res.uploadedFile}` },
        });
      };
      reader.readAsDataURL(file);
    });
  };
  const publish = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const userId = localStorage.getItem("userId");
    const date = formData.get("datetime-local");
    if (validNews(body)) {
      let postData;
      if (date.length) {
        const dateToNewDate = new Date(date);
        postData = {
          user: userId,
          rawText: body,
          publicTime: dateToNewDate,
          publish: false,
        };
      } else {
        postData = {
          user: userId,
          rawText: body,
          publish: true,
        };
      }
      addNews("news/create", postData, navigate);
    } else {
      console.log("Posts need to include a title and a body");
    }
  };

  const editNew = () => {
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const userId = localStorage.getItem("userId");
    const _id = content._id;
    if (validNews(body)) {
      const postData = { user: userId, rawText: body, _id };
      editNews("news/edit", postData, navigate);
    } else {
      console.log("Posts need to include a title and a body");
    }
  };

  return (
    <>
      <Editor
        toolbar={{
          image: { uploadCallback: uploadCallback },
        }}
        toolbarClassName={
          !preview ? styles.toolbarClassName : styles.toolbarHidden
        }
        wrapperClassName={
          !preview
            ? styles.editorWrapper
            : `${styles.editorWrapper} ${styles.editorPreview}`
        }
        editorClassName={styles.editor}
        editorState={editorState}
        onEditorStateChange={!preview && onChange}
      />
      {preview && children}
      {!preview && !edit && (
        <Box
          component="form"
          noValidate
          onSubmit={publish}
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Button type="submit" sx={{ mb: 2 }}>
            Publish
          </Button>
          <TextField
            id="datetimeLocal"
            label="Next appointment"
            type="datetime-local"
            name="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      )}
      {edit && (
        <>
          <Button onClick={editNew}>Edit</Button>
          <Button onClick={() => navigate("/my-news")}>Back</Button>
        </>
      )}
    </>
  );
};
