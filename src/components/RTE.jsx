import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { TINYMCE_KEY } from '../envConf/conf'
import { Controller } from 'react-hook-form'

function RTE({prevData, control,name}) {

    //RTE means RICH TEXT EDITOR
  return (
    <Controller
    name={name}
    control={control}
    render={({ field: { onChange } })=>(
        <Editor
        apiKey={TINYMCE_KEY}
        initialValue= {prevData || ''}
        init={{
            plugins: 'tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss textcolor insertdatetime  visualblocks fullscreen',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor| link  table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            }}
            onEditorChange={onChange}
        />
    )}
    />
  )
}

export default RTE