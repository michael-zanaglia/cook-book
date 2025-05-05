import { Box, Text } from "@chakra-ui/react";
import { FieldProps, getIn } from "formik";

import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import QuillResizeImage from 'quill-resize-image';


interface TextEditorProps extends FieldProps {};
Quill.register("modules/resize", QuillResizeImage);
const TextEditor: React.FC<TextEditorProps> = ({field, form}) => {
  
    const modules = {
        toolbar: {
          container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ align: [] }],
                ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                [{ color: [] }, { background: [] }, {font: ['poppins']}], // dropdown with defaults from theme
                ['blockquote', 'code-block'],
                ['link','image', 'video', /*'formula'*/],
                [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                ['clean'], // remove formatting button
            ]   
        },
        resize : {
            locale: {},
        }}
    const error = getIn(form.errors, 'article')
    const touched = getIn(form.touched, 'article')

    return (
        <Box  onBlur={() => form.setFieldTouched(field.name, true)} style={{
                width:"100%",
                maxWidth: '62vw',
                minHeight: '100px',
                overflowY: 'scroll',
            }}
        >
            <ReactQuill 
                theme="snow" 
                value={field.value}
                onChange={(content)=>form.setFieldValue(field.name, content)}
                modules={modules} 
                style={{
                backgroundColor: '#f7f7f7',
                color: '#292929',
                minHeight: "100%",
                border: error && touched && '3px solid red',
                // maxHeight: "100%"
            }} /> 
            {error && touched && <Text color={'#FF0000'} fontSize={'12px'}>{error}</Text>}
        </Box>
    
    );
       
}

export default TextEditor;