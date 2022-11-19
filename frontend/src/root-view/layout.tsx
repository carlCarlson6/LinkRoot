import { ReactNode } from "react";
import { Center } from '@chakra-ui/react'

export default function Layout({children}: {children: ReactNode}) {
    return (
        <Center 
            aria-label="root-view-layout" 
            borderRadius="xl"
            border="1px"
            flex=""
            paddingTop="1rem"
            paddingBottom="1rem"
        >
            {children}
        </Center>
    );
}