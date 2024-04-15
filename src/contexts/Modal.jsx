import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createContext, useContext, useState } from 'react';
import { UseAuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90vw",
  maxWidth: "600px",
  bgcolor: 'background.paper',
  border: "none",
  borderRadius: "5px",
  boxShadow: 40,
  open: false,
  p: 4,

  "input": {
    display: "block",
    width: "100%",
    background: "var(--light-blue)",
    p: "5px"
  }
};

const modalContext = createContext()

export const UseModalContext = () => {
  return useContext(modalContext)
}

const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("content")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()
 
  const value = {
    handleOpen,
    handleClose,
    setContent
  }

  return (


    <div>
      <modalContext.Provider value={value}>{children}</modalContext.Provider>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={(e) => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}

        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content}
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ModalProvider