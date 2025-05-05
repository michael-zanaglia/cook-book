import { Code, Slider, Stack, useSlider } from "@chakra-ui/react";
import { FieldProps } from "formik";
import { ChangeEvent } from "react";

interface SliderMinFormikProps extends FieldProps {}

export const SliderMinFormik: React.FC<SliderMinFormikProps> = ({field, form}) => {
    const slider = useSlider({
            defaultValue: [field.value],
            step: 5 ,
            min: 5,
            max: 120,
            thumbAlignment: "center",
    })
    return (
        <Stack>
            <Code maxW={'75px'}>± {field.value} min</Code>
            <Slider.RootProvider value={slider} w={'100vw'} maxW="400px" onChange={(val: ChangeEvent<HTMLInputElement>)=>{form.setFieldValue(field.name, val.target.defaultValue)}} onBlur={field.onBlur}>
                <Slider.Control>
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0}>
                    <Slider.HiddenInput />
                </Slider.Thumb>
                </Slider.Control>
            </Slider.RootProvider>
        </Stack>
    )
}


interface SliderMinProps {
    setTime : Function;
    setPage : Function;
    setCurrentPage : Function;
}

const SliderMin: React.FC<SliderMinProps> = ({setTime, setPage, setCurrentPage}) => {
    const slider = useSlider({
            defaultValue: [20],
            step: 5,
            min: 5,
            max: 120,
            thumbAlignment: "center",
    })
    return (
        <Stack>
            <Code maxW={'75px'}>± {slider.value} min</Code>
            <Slider.RootProvider value={slider} w={'95%'} maxW="400px" colorPalette="orange" onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setTime(e.target.value)
                setPage(1)
                setCurrentPage(0)
            }}>
                <Slider.Label>Temps de préparation</Slider.Label>
                <Slider.Control>
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0}>
                    <Slider.HiddenInput />
                </Slider.Thumb>
                </Slider.Control>
            </Slider.RootProvider>
        </Stack>
    )
}

export default SliderMin;