import { Editor } from '@tinymce/tinymce-react'
import React from 'react'

function CreatePost() {
  return (
    <Editor 
    apiKey='1gdo58mk58l1i4xnevgrq7n97kn9wkhpkpddy7dzguzoas8s'
    init={{
      height: 500,
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}/>
  )
}

export default CreatePost