import { IconButton, Stack, Typography } from "@mui/material"

export const StyledButton = ({ icon, clickfunction = function () { }, label, iconStyle, typoBoxStyle, typoStyle }) => {
    return (
        <IconButton onClick={clickfunction}>
            <Stack direction="row" spacing={0}>
                <Box sx={iconStyle}>
                    {icon}
                </Box>
                <Box sx={typoBoxStyle}>
                    <Typography sx={typoStyle}>{label}</Typography>
                </Box>
            </Stack>
        </IconButton>
    )
}