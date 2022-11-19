import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const dark = "#232323";
const light = "#ffffff";

const theme = extendTheme({
    styles: {
        global: (props: Record<string, any>) => ({
            body: {
                bg: mode(light, dark)(props),
            }
        })
    },
});

export default theme;