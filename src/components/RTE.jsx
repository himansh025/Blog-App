import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { tinyMCEAPI } from "../conf/conf.js";
import { Controller } from "react-hook-form";

function RTE({ initialValue, control, name, label }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <div>
          {label && <label>{label}</label>}
          <Editor
            apiKey={tinyMCEAPI}
            initialValue={initialValue || ""}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        </div>
      )}
    />
  );
}

export default RTE;
