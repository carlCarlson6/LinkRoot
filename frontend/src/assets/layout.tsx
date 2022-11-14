import { ReactNode } from "react";
import { Container } from '@chakra-ui/react'

export default function Layout({children}: {children: ReactNode}) {
    return (
        <Container bg='#cfd3d7' maxW='full' minH="full">
            {children}
        </Container>
    );
}