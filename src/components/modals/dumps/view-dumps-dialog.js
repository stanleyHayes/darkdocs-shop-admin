import React from "react";
import {Button, Dialog, DialogActions, DialogContent, Divider, makeStyles, Typography} from "@material-ui/core";
import moment from "moment";

const ViewDumpsDialog = ({openViewCCDumpsDialog, handleCCDumpsDialogClose, ccDump}) => {

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
        <Dialog open={openViewCCDumpsDialog} onClose={handleCCDumpsDialogClose}>
            <DialogContent>
                <Typography className={classes.title} gutterBottom={true} variant="h6" align="center">CC Dumps Detail</Typography>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Service</Typography>
                <Typography className={classes.value} variant="body2">{ccDump.service}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Bin</Typography>
                <Typography className={classes.value} variant="body2">{ccDump.bin}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Country Mark</Typography>
                <Typography className={classes.value} variant="body2">{ccDump.countryMark}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Type</Typography>
                <Typography className={classes.value} variant="body2">{ccDump.type}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Dumped In</Typography>
                <Typography className={classes.value} variant="body2">{ccDump.dumpedIn}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Bank Base</Typography>
                <Typography className={classes.value} variant="body2">{ccDump.bankBase}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Quantity</Typography>
                <Typography className={classes.value} variant="body2">{ccDump.quantity}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Price</Typography>
                <Typography
                    className={classes.value}
                    variant="body2">
                    ${parseFloat(ccDump.price).toFixed(2)}
                </Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Status</Typography>
                <Typography className={classes.value} variant="body2">{ccDump.status}</Typography>

                <Divider variant="fullWidth" className={classes.divider}/>
                <Typography gutterBottom={true} className={classes.caption} variant="caption">Date Created</Typography>
                <Typography className={classes.value} variant="body2">{moment(ccDump.createdAt).fromNow()}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Date Updated</Typography>
                <Typography className={classes.value} variant="body2">{moment(ccDump.updatedAt).fromNow()}</Typography>

            </DialogContent>

            <Divider variant="fullWidth" className={classes.divider}/>

            <DialogActions>
                <Button onClick={handleCCDumpsDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewDumpsDialog;
