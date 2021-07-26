import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {updateDump} from "../../../redux/dumps/dumps-action-creators";
import {useSnackbar} from "notistack";

const UpdateDumpsDialog = ({openUpdateDumpsDialog, handleUpdateDumpsDialogClose, originalDumps}) => {

    const useStyles = makeStyles(theme => {
        return {
            closeButton: {},
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


    const [dumps, setDumps] = useState({...originalDumps});
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const [error, setError] = useState({});

    const {enqueueSnackbar} = useSnackbar();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const updatedCCDump = {}
        if (dumps.service !== originalDumps.service && !originalDumps.service) {
            setError({...error, 'service': 'Field required'});
            return;
        } else {
            updatedCCDump['service'] = dumps.service;
            setError({...error, 'service': null});
        }

        if (dumps.bin !== originalDumps.bin && !originalDumps.bin) {
            setError({...error, 'bin': 'Field required'});
            return;
        } else {
            updatedCCDump['bin'] = dumps.bin;
            setError({...error, 'bin': null});
        }

        if (dumps.countryMark !== originalDumps.countryMark && !originalDumps.countryMark) {
            setError({...error, 'countryMark': 'Field required'});
            return;
        } else {
            updatedCCDump['countryMark'] = dumps.countryMark;
            setError({...error, 'countryMark': null});
        }

        if (dumps.dumpedIn !== originalDumps.dumpedIn && !originalDumps.dumpedIn) {
            setError({...error, 'dumpedIn': 'Field required'});
            return;
        } else {
            updatedCCDump['dumpedIn'] = dumps.dumpedIn;
            setError({...error, 'dumpedIn': null});
        }

        if (dumps.bankBase !== originalDumps.bankBase && !originalDumps.bankBase) {
            setError({...error, 'bankBase': 'Field required'});
            return;
        } else {
            updatedCCDump['bankBase'] = dumps.bankBase;
            setError({...error, 'bankBase': null});
        }

        if (dumps.quantity !== originalDumps.quantity && !originalDumps.quantity) {
            setError({...error, 'quantity': 'Field required'});
            return;
        } else {
            updatedCCDump['quantity'] = dumps.quantity;
            setError({...error, 'quantity': null});
        }

        if (dumps.price !== originalDumps.price && !originalDumps.price) {
            setError({...error, 'price': 'Field required'});
            return;
        } else {
            updatedCCDump['price'] = dumps.price;
            setError({...error, 'price': null});
        }

        dispatch(updateDump(originalDumps._id, updatedCCDump, token, showNotification));

        handleUpdateDumpsDialogClose();
    }

    const handleChange = event => {
        setDumps({...dumps, [event.target.name]: event.target.value});
    }


    return (
        <Dialog open={openUpdateDumpsDialog} onClose={handleUpdateDumpsDialogClose}>
            <DialogContent>
                <Typography variant="h5" align="center" className={classes.title}>
                    Update CC Dumps + Pin
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        label="Service"
                        placeholder="Enter service"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.service}
                        type="text"
                        onChange={handleChange}
                        name="service"
                        fullWidth={true}
                        required={true}
                        error={Boolean(error.service)}
                        helperText={error.service}
                    />

                    <TextField
                        variant="outlined"
                        label="Bin"
                        placeholder="Enter bin"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.bin}
                        type="number"
                        onChange={handleChange}
                        name="bin"
                        fullWidth={true}
                        required={true}
                        error={Boolean(error.bin)}
                        helperText={error.bin}
                    />

                    <TextField
                        variant="outlined"
                        label="Type"
                        placeholder="Enter type"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.type}
                        type="text"
                        onChange={handleChange}
                        name="type"
                        fullWidth={true}
                        required={true}
                        error={Boolean(error.type)}
                        helperText={error.type}
                    />

                    <TextField
                        variant="outlined"
                        label="Country Mark"
                        placeholder="Enter country mark"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.countryMark}
                        type="text"
                        onChange={handleChange}
                        name="countryMark"
                        fullWidth={true}
                        required={true}
                        error={Boolean(error.countryMark)}
                        helperText={error.countryMark}
                    />


                    <TextField
                        variant="outlined"
                        label="Dumped In"
                        placeholder="Enter dumped in"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.dumpedIn}
                        type="text"
                        onChange={handleChange}
                        name="dumpedIn"
                        fullWidth={true}
                        required={true}
                        error={Boolean(error.dumpedIn)}
                        helperText={error.dumpedIn}
                    />

                    <TextField
                        variant="outlined"
                        label="Bank Base"
                        placeholder="Enter bank base"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.bankBase}
                        type="text"
                        onChange={handleChange}
                        name="bankBase"
                        fullWidth={true}
                        required={true}
                        error={Boolean(error.bankBase)}
                        helperText={error.bankBase}
                    />

                    <TextField
                        variant="outlined"
                        label="Quantity"
                        placeholder="Enter quantity"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.quantity}
                        type="number"
                        onChange={handleChange}
                        name="quantity"
                        fullWidth={true}
                        required={true}
                        error={Boolean(error.quantity)}
                        helperText={error.quantity}
                    />

                    <TextField
                        variant="outlined"
                        label="Price"
                        placeholder="Enter price"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.price}
                        type="number"
                        onChange={handleChange}
                        name="price"
                        fullWidth={true}
                        required={true}
                        error={Boolean(error.price)}
                        helperText={error.price}
                    />
                    <Button onClick={handleSubmit} variant="outlined" fullWidth={true} className={classes.submitButton}>
                        Update CC Dumps
                    </Button>
                </form>
            </DialogContent>
            <Divider className={classes.divider} variant="fullWidth"/>
            <DialogActions>
                <Button onClick={handleUpdateDumpsDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateDumpsDialog;
