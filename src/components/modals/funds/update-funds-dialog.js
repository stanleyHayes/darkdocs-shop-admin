import React from "react";
import {Button, Dialog, DialogActions, DialogContent, Divider, makeStyles, Typography} from "@material-ui/core";

const UpdateFundDialog = ({openUpdateFundsDialog, handleUpdateFundDialogClose, originalFund}) => {

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
        <Dialog open={openUpdateFundsDialog} onClose={handleUpdateFundDialogClose}>
            <DialogContent>
                <Typography variant="h5" align="center" className={classes.title}>
                    Update Funds
                </Typography>
            </DialogContent>
            <Divider className={classes.divider} variant="fullWidth" />
            <DialogActions>
                <Button onClick={handleUpdateFundDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateFundDialog;
