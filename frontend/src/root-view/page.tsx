import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import { feathRoot } from './fetch-root';
import { Spinner, Stack, Center } from '@chakra-ui/react'
import { RootModel } from './root';
import {Helmet} from "react-helmet";
import RootLinks from './root-links';

export default function RootViewPage() {
    const { slug } = useParams();
    const { isLoading, error, data } = useQuery<RootModel, Error>({
        queryKey: ['fetchRoot', slug],
        queryFn: () => feathRoot(slug!)
    });
    
    if (isLoading) return (<Spinner size='xl' />);
    if (error) return (<h1>An error has occurred {error.message}</h1>); // TODO - create proper view
    if (!data) return (<h1>data not found</h1>); // TODO - create proper view

    return (<>
        <Helmet>
            <title>Link Tree - @{slug}</title>
        </Helmet>
        <div
            aria-label='view-content'
        >
            <Center
                marginBottom="1rem"
            >
                <h1>@{data.slug}</h1>    
            </Center>
            <Stack direction="column">
                <RootLinks links={data.links} />
            </Stack>
        </div>
    </>);
}

