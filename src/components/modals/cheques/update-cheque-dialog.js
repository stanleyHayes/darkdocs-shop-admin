import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    makeStyles,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {updateCheque} from "../../../redux/cheques/cheques-action-creators";

const UpdateChequeDialog = ({openUpdateChequeDialog, handleUpdateChequeDialogClose, originalCheque}) => {

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
            },
            caption: {
                fontWeight: 'bold',
                textTransform: 'uppercase'
            },
        }
    });

    const classes = useStyles();

    const [cheque, setCheque] = useState({...originalCheque});
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const [error, setError] = useState({});

    const handleChange = event => {
        setCheque({...cheque, [event.target.name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        const updatedCheque = {}
        if (cheque.status !== originalCheque.status && !originalCheque.status) {
            setError({...error, 'status': 'Field required'});
            return;
        } else {
            updatedCheque['status'] = cheque.status;
            setError({...error, 'status': null});
        }

        dispatch(updateCheque(originalCheque._id, updatedCheque, token));
        handleUpdateChequeDialogClose();
    }

    return (
        <Dialog open={openUpdateChequeDialog} onClose={handleUpdateChequeDialogClose}>
            <DialogContent>
                <Typography variant="h5" align="center" className={classes.title}>
                    Update Cheque
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Typography
                        gutterBottom={true}
                        variant="caption"
                        className={classes.caption}
                        display="block">
                        Status
                    </Typography>
                    <Select
                        variant="outlined"
                        margin="none"
                        value={cheque.status}
                        name="status"
                        label="status"
                        fullWidth={true}
                        defaultValue={cheque.status}
                        className={classes.textField}
                        onChange={handleChange}>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>

                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        variant="outlined"
                        fullWidth={true}
                        className={classes.submitButton}>
                        Update Cheque
                    </Button>
                </form>
            </DialogContent>
            <Divider className={classes.divider} variant="fullWidth"/>
            <DialogActions>
                <Button onClick={handleUpdateChequeDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateChequeDialog;
