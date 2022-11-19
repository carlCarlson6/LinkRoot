import { ReactNode } from "react";
import { Container, Box, Flex } from '@chakra-ui/react'
import { Footer } from "./footer";
import { Placeholder } from "./placeholder";

export default function Layout({children}: {children: ReactNode}) {
    return (<>
        <Flex 
            direction="column" 
            flex="1"
            aria-label="base-layout" 
        >
            <Flex 
                as="main" 
                role="main" 
                direction="column" 
                flex="1" 
                py="16"
            >
                <Container flex="1">
                    <Placeholder minH="lg" bg="bg-accent">
                        {children}
                    </Placeholder>
                </Container>
            </Flex>
            <Footer />
        </Flex>
    </>);
}