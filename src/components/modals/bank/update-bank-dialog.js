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
import {updateBank} from "../../../redux/banks/banks-action-creators";
import {useSnackbar} from "notistack";

const UpdateBankDialog = ({openUpdateBankDialog, handleUpdateDialogClose, originalBank}) => {

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
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const [bank, setBank] = useState({...originalBank});
    const [error, setError] = useState({});

    const {enqueueSnackbar} = useSnackbar();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleChange = event => {
        setBank({...bank, [event.target.name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        const updatedBank = {}
        if (bank.name !== originalBank.name && !bank.name) {
            setError({...error, 'name': 'Field required'});
            return;
        } else {
            updatedBank['name'] = bank.name;
            setError({...error, 'name': null});
        }

        if (bank.country !== originalBank.country && !bank.country) {
            setError({...error, 'country': 'Field required'});
            return;
        } else {
            updatedBank['country'] = bank.country;
            setError({...error, 'country': null});
        }
        dispatch(updateBank(originalBank._id, updatedBank, token, showNotification));
        handleUpdateDialogClose();
    }

    return (
        <Dialog open={openUpdateBankDialog} onClose={handleUpdateDialogClose}>
            <DialogContent>
                <Typography variant="h5" align="center" className={classes.title}>
                    Update Bank
                </Typography>

                <form onSubmit={handleSubmit}>

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
                        error={Boolean(error.country)}
                        helperText={error.country}
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
                        error={Boolean(error.country)}
                        helperText={error.country}
                    />

                    <Button type="submit" onClick={handleSubmit} variant="outlined" fullWidth={true}
                            className={classes.submitButton}>
                        Update Bank
                    </Button>

                </form>
            </DialogContent>
            <Divider className={classes.divider} variant="fullWidth"/>
            <DialogActions>
                <Button onClick={handleUpdateDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateBankDialog;
