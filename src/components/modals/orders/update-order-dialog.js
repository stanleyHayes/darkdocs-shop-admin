import React from "react";
import {Button, Dialog, DialogActions, DialogContent, Divider, makeStyles, Typography} from "@material-ui/core";

const UpdateBankDialog = ({openUpdateBankDialog, handleUpdateDialogClose, bank}) => {

    const useStyles = makeStyles(theme => {
        return {
            closeButton: {
            },
            divider: {
                marginTop: 8,
                marginBottom: 8
            },
            submitButton: {
                marginTop: 16,
                paddingTop: 16,
                paddingBottom: 16,
                backgroundColor: theme.palette.primary.dark
            },
            textField: {
                marginBottom: 8
            },
            title: {
                textTransform: 'uppercase'
            }
        }
    });

    const classes = useStyles();

    return (
        <Dialog open={openUpdateBankDialog} onClose={handleUpdateDialogClose}>
            <DialogContent>
                <Typography variant="h5" align="center" className={classes.title}>
                    Update Bank
                </Typography>
            </DialogContent>
            <Divider className={classes.divider} variant="fullWidth" />
            <DialogActions>
                <Button onClick={handleUpdateDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateBankDialog;
