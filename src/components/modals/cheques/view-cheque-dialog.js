import React from "react";
import {Button, Dialog, DialogActions, DialogContent, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import moment from "moment";

const ViewChequeDialog = ({openViewChequeDialog, handleViewChequeDialogClose, cheque}) => {

    const useStyles = makeStyles(theme => {
        return {
            caption: {
                fontWeight: 'bold',
                textTransform: 'uppercase'
            },
            value: {},
            divider: {
                marginTop: 8,
                marginBottom: 8
            },
            closeButton: {
                paddingTop: 8,
                paddingBottom: 8
            },
            title: {
                textTransform: 'uppercase'
            }
        }
    });

    const classes = useStyles();

    return (
        <Dialog open={openViewChequeDialog} onClose={handleViewChequeDialogClose}>
            <DialogContent>
                <Typography className={classes.title} gutterBottom={true} variant="h6" align="center">
                    Cheque Detail
                </Typography>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">User</Typography>
                <Typography className={classes.value} variant="body2">{cheque.user.name}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Email</Typography>
                <Typography className={classes.value} variant="body2">{cheque.user.email}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Balance</Typography>
                <Typography className={classes.value} variant="body2">{cheque.balance}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Client
                    Address</Typography>
                <Typography className={classes.value} variant="body2">{cheque.address}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Status</Typography>
                <Typography className={classes.value} variant="body2">{cheque.status}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Balance</Typography>
                <Typography className={classes.value} variant="body2">{cheque.balance}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Date
                    Requested</Typography>
                <Typography className={classes.value} variant="body2">{moment(cheque.createdAt).fromNow()}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Date Updated</Typography>
                <Typography className={classes.value} variant="body2">{moment(cheque.updatedAt).fromNow()}</Typography>

            </DialogContent>

            <Divider variant="fullWidth" className={classes.divider}/>

            <DialogActions>
                <Button
                    className={classes.closeButton}
                    onClick={handleViewChequeDialogClose}
                    variant="outlined"
                    size="small">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}


export default ViewChequeDialog;
