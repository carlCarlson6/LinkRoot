import { Box, BoxProps, Container, Divider, Flex, Link } from '@chakra-ui/react'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { Placeholder } from './placeholder'

export const Footer = (props: BoxProps) => {
    return (
        <Box 
            as="footer" 
            role="contentinfo" 
            bg="bg-accent" 
            {...props}
        >
            <Divider />
            <Container>
                <Flex>
                    <Placeholder 
                        minH="20"
                        flex={1}
                    >
                        develop by Carlos Acitores Deval
                    </Placeholder>
                    <Placeholder minH="20">
                        <Link
                            href='https://www.linkedin.com/in/carlos-acitores-deval-a3914a1b/'
                            isExternal 
                        >
                            <FaLinkedinIn />
                        </Link>
                    </Placeholder>
                    <Placeholder minH="20">
                        <Link
                            href='https://github.com/carlCarlson6'
                            isExternal
                        >
                            <FaGithub />
                        </Link>
                    </Placeholder>
                </Flex>
            </Container>
        </Box>
    );
}

