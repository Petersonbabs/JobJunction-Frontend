import { createTheme } from "@mui/material";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 992,
            lg: 1200,
            xl: 1536,
        }
    }
})

export default theme