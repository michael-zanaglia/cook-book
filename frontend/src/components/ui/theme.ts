import { createSystem, defaultBaseConfig, defineConfig } from "@chakra-ui/react";


const customConfig = defineConfig({
    globalCss: {
        html:  {
            bg: 'white',
            color: 'black',
            fontFamily: `'Poppins', serif`, 
        },
        '*': {
            padding: "0",
            margin: "0"
        }
    }
})

export const system = createSystem(defaultBaseConfig, customConfig)