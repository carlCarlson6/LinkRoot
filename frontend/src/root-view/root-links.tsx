import { LinkModel } from "./root";
import { Spinner, Stack, Button, Link, Center } from '@chakra-ui/react'

export default function RootLinks({links}: {links: LinkModel[]}) {
    return (<>{links.map(link => (
        <Link 
            href={link.url} 
            isExternal 
            border="1px" 
            borderRadius="3xl"
            key={link.text}
        >
            <Button variant="#7f8b93" color="#606e79">
                    {link.text}
            </Button>
        </Link>
    ))}</>);
}