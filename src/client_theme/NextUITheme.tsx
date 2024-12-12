"use client"
import { NextUIProvider } from "@nextui-org/system";


export default function NextUITheme({ children } : any) {
    return (
        <NextUIProvider>
           {children}
        </NextUIProvider>
    )
}