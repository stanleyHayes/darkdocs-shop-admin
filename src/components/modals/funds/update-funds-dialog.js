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
    TextField,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {updateFund} from "../../../redux/funds/funds-action-creators";

const UpdateFundDialog = ({openUpdateFundsDialog, handleUpdateFundDialogClose, originalFund}) => {

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

    const [fund, setFund] = useState({...originalFund});
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const [error, setError] = useState({});

    const handleChange = event => {
        setFund({...fund, [event.target.name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        const updatedFund = {}
        if (fund.amount !== originalFund.text && !originalFund.text) {
            setError({...error, 'amount': 'Field required'});
            return;
        } else {
            updatedFund['amount'] = fund.amount;
            setError({...error, 'amount': null});
        }

        if (fund.status !== originalFund.status && !originalFund.status) {
            setError({...error, 'status': 'Field required'});
            return;
        } else {
            updatedFund['status'] = fund.status;
            setError({...error, 'status': null});
        }

        dispatch(updateFund(originalFund._id, updatedFund, token));
        handleUpdateFundDialogClose();
    }

    return (
        <Dialog open={openUpdateFundsDialog} onClose={handleUpdateFundDialogClose}>
            <DialogContent>
                <Typography variant="h5" align="center" className={classes.title}>
                    Update Funds
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        label="Amount"
                        placeholder="Enter amount"
                        margin="normal"
                        className={classes.textField}
                        value={fund.amount}
                        type="number"
                        onChange={handleChange}
                        name="amount"
                        fullWidth={true}
                        error={Boolean(error.amount)}
                        helperText={error.amount}
                    />

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
                        value={fund.status}
                        name="fund"
                        label="Status"
                        fullWidth={true}
                        defaultValue={fund.status}
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
                        Update Fund
                    </Button>
                </form>
            </DialogContent>
            <Divider className={classes.divider} variant="fullWidth"/>
            <DialogActions>
                <Button onClick={handleUpdateFundDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateFundDialog;
