import React from "react";
import {
    Box,
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import moment from "moment";

const ViewOrderDialog = ({openOrderDialog, handleOrderDialogClose, order}) => {

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
        <Dialog open={openOrderDialog} onClose={handleOrderDialogClose}>
            <DialogContent>
                <Typography className={classes.title} gutterBottom={true} variant="h6" align="center">Order Detail</Typography>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">User</Typography>
                <Typography className={classes.value} variant="body2">{order.user.name}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Price</Typography>
                <Typography className={classes.value} variant="body2">${parseFloat(order.price).toFixed(2)}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Status</Typography>
                <Typography className={classes.value} variant="body2">{order.status}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Date Created</Typography>
                <Typography className={classes.value} variant="body2">{moment(order.createdAt).fromNow()}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>


                <Typography gutterBottom={true} className={classes.caption} variant="caption">Date Updated</Typography>
                <Typography className={classes.value} variant="body2">{moment(order.updatedAt).fromNow()}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography className={classes.title} gutterBottom={true} variant="body1" align="center">Order Item</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                {order.type === 'Dump'? (
                    <Box>
                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Service</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.ccDumps.service}</Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Bin</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.ccDumps.bin}</Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Country Mark</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.ccDumps.countryMark}</Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Type</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.ccDumps.type}</Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Dumped In</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.ccDumps.dumpedIn}</Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Bank Base</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.ccDumps.bankBase}</Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Quantity</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.ccDumps.quantity}</Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Price</Typography>
                        <Typography
                            className={classes.value}
                            variant="body2">
                            ${parseFloat(order.item.ccDumps.price).toFixed(2)}
                        </Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Status</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.ccDumps.status}</Typography>
                    </Box>
                ): (order.type === 'Login') ? (
                    <Box>
                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Status</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.login.status}</Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Country</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.login.bank.country}</Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Type</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.login.type}</Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Bank</Typography>
                        <Typography className={classes.value} variant="body2">{order.item.login.bank.name}</Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Balance</Typography>
                        <Typography
                            className={classes.value}
                            variant="body2">
                            ${parseFloat(order.item.login.balance).toFixed(2)}
                        </Typography>
                        <Divider variant="fullWidth" className={classes.divider}/>

                        <Typography gutterBottom={true} className={classes.caption} variant="caption">Includes</Typography>
                        {order.item.login.includes.length === 0 ? (
                            <Box>
                                <Typography className={classes.value} variant="body2">Nothing included</Typography>
                            </Box>
                        ) : (
                            <Grid container={true} spacing={2}>
                                {order.item.login.includes.map(include => {
                                    return (
                                        <Grid item={true} key={include}>
                                            <Chip label={include} title={include} size="medium" variant="outlined"/>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )}

                    </Box>
                ): (
                    <Box>

                    </Box>
                )}
            </DialogContent>

            <Divider variant="fullWidth" className={classes.divider}/>
            <DialogActions>
                <Button onClick={handleOrderDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewOrderDialog;
