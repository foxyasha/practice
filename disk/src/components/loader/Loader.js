import CircularProgress from '@mui/material/CircularProgress';
import {Box} from "@mui/material";

const Loader = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
    );
}

export {Loader}