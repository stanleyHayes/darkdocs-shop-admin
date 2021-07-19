import React from "react";
import {Button, Dialog, DialogActions, DialogContent, Divider, makeStyles, Typography} from "@material-ui/core";

const ViewUserDialog = ({openUserDialog, handleUserDialogClose, user}) => {

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
        <Dialog open={openUserDialog} onClose={handleUserDialogClose}>
            <DialogContent>
                <Typography className={classes.title} gutterBottom={true} variant="h6" align="center">User Detail</Typography>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Name</Typography>
                <Typography className={classes.value} variant="body2">{user.name}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Email</Typography>
                <Typography className={classes.value} variant="body2">{user.email}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Username</Typography>
                <Typography className={classes.value} variant="body2">{user.username}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Verified
                    Account</Typography>
                <Typography className={classes.value}
                            variant="body2">{user.hasVerifiedEmail ? 'Yes' : 'No'}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Balance</Typography>
                <Typography
                    className={classes.value}
                    variant="body2">
                    ${parseFloat(user.balance).toFixed(2)}
                </Typography>

                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Role</Typography>
                <Typography className={classes.value} variant="body2">{user.role}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Status</Typography>
                <Typography className={classes.value} variant="body2">{user.status}</Typography>
            </DialogContent>

            <Divider variant="fullWidth" className={classes.divider}/>

            <DialogActions>
                <Button onClick={handleUserDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewUserDialog;
