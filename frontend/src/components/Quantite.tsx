import { Button, HStack, VStack, Input, NativeSelectField, NativeSelectRoot} from "@chakra-ui/react"
import { InputGroup } from "./ui/input-group"
import { FaScaleUnbalancedFlip } from "react-icons/fa6"
import { Field, FieldProps, getIn} from "formik"

interface QuantiteProps {
    index: number;
    remove: (index: number) => void;
}

const Quantite: React.FC<QuantiteProps> = ({ index, remove }) => {

    // Un composant unique compose de deux champs enfants qui seront représenter dans la BDD {quantite: X, ingredient: Y}
    // Les props field permettent de placer les methodes de formik directement ex : handleChange etc...
    return (
        <HStack w={'100%'}  alignItems={"center"}>
            <Field name={`ingredients.${index}.quantite`} >
                {({ field, form }: FieldProps<any>) => {
                    const error = getIn(form.errors, `ingredients.${index}.quantite`);
                    const touched = getIn(form.touched, `ingredients.${index}.quantite`);
                return (
                    <VStack w={'20%'}>
                        <InputGroup
                            
                            startElement={<FaScaleUnbalancedFlip />}
                            endElement={<UnitSelect index={index}/>}
                        >
                            <Input 
                                type="number"
                                border={error && touched ?'1px solid red':'1px solid #d5d5d5'} 
                                {...field}
                            />
                        </InputGroup>
                        {/* {error && touched && <Text color={'#FF0000'} fontSize={'12px'} alignSelf={'start'}>{error}</Text>} */}
                    </VStack>
                    
                )}}
            </Field>
         
      
            
            
            
            <Field name={`ingredients.${index}.ingredient`}>
                {({ field, form }: FieldProps<any>) => {
                    const error = getIn(form.errors, `ingredients.${index}.ingredient`);
                    const touched = getIn(form.touched, `ingredients.${index}.ingredient`);
                   return (
                    <VStack w={'60%'}>
                        <Input 
                            {...field}
                            type="text"  
                            border={error && touched ?'1px solid red':'1px solid #d5d5d5'} 
                            
                        />
                        {/* {error && touched && <Text color={'#FF0000'} fontSize={'12px'} alignSelf={'start'}>{error}</Text>} */}
                    </VStack>
                   ) 
                }
                    
                }
            </Field>
            <Button 
                onClick={() => remove(index)} 
                
            >
                Supprimer
            </Button>
        </HStack>
    )
}

export default Quantite;

const UnitSelect = ({ index }: { index: number }) => (
    <Field name={`ingredients.${index}.unit`}>
        {({ field }: FieldProps<any>) => (
            <NativeSelectRoot size={'xs'} variant="subtle" width="auto" left={2}>
                <NativeSelectField fontSize="sx" {...field} >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="L">L</option>
                    <option value="cL">cL</option>
                    <option value="pièce(s)">{`pièce(s)`}</option>
                </NativeSelectField>
            </NativeSelectRoot> 
        )}
    </Field>
    
)