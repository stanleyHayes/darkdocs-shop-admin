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

    const [bank, setBank] = useState({});

    const handleSubmit = event => {
        event.preventDefault();

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
                    <Button variant="outlined" fullWidth={true} className={classes.submitButton}>
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
