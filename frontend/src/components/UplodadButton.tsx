import { Button, Text } from "@chakra-ui/react"
import {
    FileUploadList,
    FileUploadRoot,
    FileUploadTrigger,
} from "@/components/ui/file-upload"
import { LuUpload } from "react-icons/lu";
import { FieldProps } from "formik";
import { ChangeEvent, useEffect, useRef } from "react";

interface UploadButtonProps extends FieldProps {
    isEdit?:  boolean;
}

const UploadButton: React.FC<UploadButtonProps> = ({ field, form, isEdit }) => {
        //console.log('Form touched:', form.touched);
        const mimeType = ["image/png", "image/jpeg", "image/jpg"]
        const fileInpRef = useRef(null)

        useEffect(()=>{                                                                   // Inject file into my input
            if(isEdit && fileInpRef.current && field.value instanceof File){
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(field.value);
                (fileInpRef.current as HTMLInputElement).files = dataTransfer.files;
            }
        }, [field.value])
    return (
        <>
            <FileUploadRoot 
                accept={mimeType} 
                ref={fileInpRef}
                onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                    form.setFieldValue(field.name, e.target.files ? e.target.files[0] : null) 
                }} 
                onBlur={() => form.setFieldTouched(field.name, true)}
            >
                <FileUploadTrigger asChild>
                    <Button variant="solid" size="sm">
                        <LuUpload /> Uploader une photo
                    </Button>    
                </FileUploadTrigger>
                
                {!form.errors.media && field.value && <FileUploadList clearable showSize files={[field.value]} onClick={()=>{
                    form.setFieldValue(field.name, "")
                }}  />}
                
                
            </FileUploadRoot>
            {form.errors.media && form.touched.media && <Text color={'#FF0000'} fontSize={'12px'}>{ typeof form.errors.media === "string" ? form.errors.media : "Requis." }</Text>}
        </>
        
    )
}
export default UploadButton;