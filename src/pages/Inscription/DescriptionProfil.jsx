import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useState } from "react";

export default function DescriptionProfil({ nom, description, gammeEtudiant, setProfileStudent }) {
   const [open, setOpen] = useState(false);
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };
   return (
      <>
         <Button variant="contained" color="error" onClick={handleClickOpen} size="small">
            Description
         </Button>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">{"Profil : " + nom}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  <span>{description}</span>
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={(e) => {
                     setProfileStudent(gammeEtudiant);
                  }}
                  variant="outlined"
                  //color="warning"
               >
                  S’inscrire avec ce profil
               </Button>
               <Button onClick={handleClose} variant="outlined" color="error" autoFocus>
                  Fermer
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
}
