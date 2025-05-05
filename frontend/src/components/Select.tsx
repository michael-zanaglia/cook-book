import { SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText } from "@/components/ui/select";
import { Badge, createListCollection, Stack, Text } from "@chakra-ui/react";
import { tags } from "@/utils/tags/tag";
import { FieldProps } from "formik";
import { Tags } from "@/utils/types/types";
import { tagMapping } from "@/utils/tags/tagMapping";

interface SelectProps extends FieldProps {
    tagsBDD: Tags[];
}

const Select: React.FC<SelectProps> = ({field, form, tagsBDD}) => {
    //console.log('Form touched:', form.touched);
    const genericTags = createListCollection({
        items: tagsBDD
    })
    /// Je transforme ma liste d'objet en un seul objet avec plusieurs clé|val [k, v]
    const tagsMap = Object.fromEntries(tagsBDD.map((item: Tags)=>[item.value,item.label]))
    
    const getLabelByValue = (value: string) => {
        return tagsMap[value] || ""
    };
    return (
        <>
            <SelectRoot 
                multiple 
                collection={genericTags} 
                value={field.value}
                width={"320px"} 
                border={'1px solid #d5d5d5'}
                borderRadius={'3px'}
                onValueChange={(tags)=>{
                    form.setFieldValue(field.name, tags.value)
                }}
                onBlur={() => form.setFieldTouched(field.name, true)}
                
            >
                <SelectTrigger className="tags">
                    <SelectValueText placeholder="Tag(s)" />
                </SelectTrigger>
                <SelectContent>
                    { genericTags.items.map((tag)=>(
                        <SelectItem item={tag} key={tag.value}>
                            {tagMapping(tag.label)}
                        </SelectItem>    
                    ))}
                </SelectContent>
            </SelectRoot>
            
            <Stack direction={'row'}>
                { form.errors.tags && form.touched.tags && <Text color={'#FF0000'} fontSize={'12px'}>{typeof form.errors.tags === "string" ? form.errors.tags : "Requis."}</Text> }
                {
                    field.value && field.value.length > 0 && tagsBDD &&
                    field.value.map((select: any, index: number) => {
                        const label = getLabelByValue(select)
                        if(label) return <Badge key={`${index}-badge`} color={'#292929'} bg={'orange'}>{tags(label)}{tagMapping(label)}</Badge>
                    })   
                }
            </Stack>
        </>
        
    )
}

export default Select;