import { createSystem, defaultConfig, defineConfig, mergeConfigs, SystemConfig, ThemingConfig } from "@chakra-ui/react";

const breakpoints: ThemingConfig = {
    breakpoints:{
        xlg: '1280px',
        sxxl: '1536px',
        xxl: '1550px',
    }
}

const customConfig: SystemConfig = defineConfig({
    globalCss: {
        html:  {
            bg: 'white',
            color: 'white',
            fontFamily: `'Poppins', serif`, 
        },
        '*': {
            padding: "0",
            margin: "0"
        }
    }, 
    theme: breakpoints,
    
})

const config = mergeConfigs(defaultConfig, customConfig)
export const system = createSystem(config)