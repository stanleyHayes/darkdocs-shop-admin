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
import {useSnackbar} from "notistack";
import {useDispatch, useSelector} from "react-redux";
import {createDump} from "../../../redux/dumps/dumps-action-creators";

const AddCCDumpsDialog = ({openCCDumpsDialog, handleCCDumpsDialogClose}) => {

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
    const {enqueueSnackbar} = useSnackbar();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }
    const {token} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const [dumps, setDumps] = useState({});
    const [error, setError] = useState({});

    const handleSubmit = event => {
        event.preventDefault();

        if(!dumps.service){
            setError({...error, service: 'Service field required'});
            return;
        }else {
            setError({...error, service: null});
        }

        if(!dumps.bin){
            setError({...error, bin: 'Bin field required'});
            return;
        }else {
            setError({...error, bin: ''});
        }

        if(!dumps.type){
            setError({...error, type: 'Type field required'});
            return;
        }else {
            setError({...error, type: ''});
        }

        if(!dumps.countryMark){
            setError({...error, countryMark: 'Country Mark field required'});
            return;
        }else {
            setError({...error, countryMark: ''});
        }

        if(!dumps.dumpedIn){
            setError({...error, dumpedIn: 'Dumped In field required'});
            return;
        }else {
            setError({...error, dumpedIn: ''});
        }

        if(!dumps.bankBase){
            setError({...error, bankBase: 'Bank base field required'});
            return;
        }else {
            setError({...error, bankBase: ''});
        }

        if(!dumps.service){
            setError({...error, quantity: 'Quantity field required'});
            return;
        }else {
            setError({...error, quantity: ''});
        }

        if(!dumps.price){
            setError({...error, price: 'Price field required'});
            return;
        }else {
            setError({...error, price: ''});
        }

        dispatch(createDump(dumps, token, showNotification));
        handleCCDumpsDialogClose();
    }

    const handleChange = event => {
        setDumps({...dumps, [event.target.name]: event.target.value});
    }

    return (
        <Dialog open={openCCDumpsDialog} onClose={handleCCDumpsDialogClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Typography gutterBottom={true} variant="h5" className={classes.title} align="center">
                        Create CC Dumps + Pins
                    </Typography>
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
                    <Button
                        onClick={handleSubmit}
                        variant="outlined"
                        fullWidth={true}
                        className={classes.submitButton}>
                        Add CC Dumps
                    </Button>
                </form>
            </DialogContent>
            <Divider variant="fullWidth" className={classes.divider} />
            <DialogActions>
                <Button onClick={handleCCDumpsDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddCCDumpsDialog;
