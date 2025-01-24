"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
// import { system } from "./theme"

export default function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem} >
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
