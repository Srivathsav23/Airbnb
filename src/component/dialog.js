import React from 'react';
import { Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';


const QuestionDialog = ({ title, content }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Click for help" arrow> 
                <HelpOutline className='ml-20' fontSize="small" onMouseOver={handleOpen} />
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{content}</DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default QuestionDialog;
