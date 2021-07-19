import React from "react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";

const ViewBankLoginDialog = ({openBankLoginDialog, handleBankLoginDialogClose, bankLogin}) => {

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
        <Dialog open={openBankLoginDialog} onClose={handleBankLoginDialogClose}>
            <DialogContent>
                <Typography className={classes.title} gutterBottom={true} variant="h6" align="center">Bank Login Detail</Typography>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Status</Typography>
                <Typography className={classes.value} variant="body2">{bankLogin.status}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Country</Typography>
                <Typography className={classes.value} variant="body2">{bankLogin.bank.country}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Type</Typography>
                <Typography className={classes.value} variant="body2">{bankLogin.type}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Bank</Typography>
                <Typography className={classes.value} variant="body2">{bankLogin.bank.name}</Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Balance</Typography>
                <Typography
                    className={classes.value}
                    variant="body2">
                    ${parseFloat(bankLogin.balance).toFixed(2)}
                </Typography>
                <Divider variant="fullWidth" className={classes.divider}/>

                <Typography gutterBottom={true} className={classes.caption} variant="caption">Includes</Typography>
                {bankLogin.includes.length === 0 ? (
                    <Box>
                        <Typography className={classes.value} variant="body2">Nothing included</Typography>
                    </Box>
                ) : (
                    <Grid container={true} spacing={2}>
                        {bankLogin.includes.map(include => {
                            return (
                                <Grid item={true} key={include}>
                                    <Chip label={include} title={include} size="medium" variant="outlined"/>
                                </Grid>
                            )
                        })}
                    </Grid>
                )}

            </DialogContent>

            <Divider variant="fullWidth" className={classes.divider}/>

            <DialogActions>
                <Button onClick={handleBankLoginDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewBankLoginDialog;
