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
import {createBank} from "../../../redux/banks/banks-action-creators";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";

const AddBankDialog = ({openBankDialog, handleBankDialogClose}) => {

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
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const {enqueueSnackbar} = useSnackbar();

    const [error, setError] = useState({});

    const [bank, setBank] = useState({});

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleSubmit = event => {
        event.preventDefault();

        if(!bank.name){
            setError({...error, name: 'Field required'});
            return;
        }else {
            setError({...error, name: null});
        }

        if(!bank.country){
            setError({...error, country: 'Field required'});
            return;
        }else {
            setError({...error, country: null});
        }

        dispatch(createBank(bank, token, showNotification));
        handleBankDialogClose();
    }

    const handleChange = event => {
        setBank({...bank, [event.target.name]: event.target.value});
    }

    return (
        <Dialog open={openBankDialog} onClose={handleBankDialogClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Typography gutterBottom={true} variant="h5" className={classes.title} align="center">
                        Create Bank
                    </Typography>
                    <TextField
                        variant="outlined"
                        label="Bank Name"
                        placeholder="Enter bank name"
                        margin="normal"
                        className={classes.textField}
                        value={bank.name}
                        type="text"
                        onChange={handleChange}
                        name="name"
                        fullWidth={true}
                        error={Boolean(error.bank)}
                        helperText={error.bank}
                    />

                    <TextField
                        variant="outlined"
                        label="Bank Country"
                        placeholder="Enter bank country"
                        margin="normal"
                        className={classes.textField}
                        value={bank.country}
                        type="text"
                        onChange={handleChange}
                        name="country"
                        fullWidth={true}
                    />
                    <Button onClick={handleSubmit} variant="outlined" fullWidth={true} className={classes.submitButton}>
                        Add Bank
                    </Button>
                </form>
            </DialogContent>
            <Divider variant="fullWidth" className={classes.divider} />
            <DialogActions>
                <Button
                    onClick={handleBankDialogClose}
                    variant="outlined"
                    className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddBankDialog;
