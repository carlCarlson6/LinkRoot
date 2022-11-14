import { ReactNode } from "react";
import { Container } from '@chakra-ui/react'

export default function Layout({children}: {children: ReactNode}) {
    return (
        <>
        <Container bg='#dee1e3'>
            {children}
        </Container>
        </>
    );
}