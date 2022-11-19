import { Box, BoxProps, Container } from '@chakra-ui/react'

export const Placeholder = (props: BoxProps) =>
    <Box 
        role="presentation" 
        py="3" 
        px="4" 
        color="on-accent" 
        {...props} 
    />