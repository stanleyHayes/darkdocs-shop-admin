import React, {useEffect, useState} from "react";
import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {DeleteForever} from "@material-ui/icons";
import {red} from "@material-ui/core/colors";
import {useSnackbar} from "notistack";
import {createLogin} from "../../../redux/logins/logins-action-creators";
import {useDispatch, useSelector} from "react-redux";
import {getBanks} from "../../../redux/banks/banks-action-creators";

const AddBankLoginDialog = ({openBankLoginDialog, handleBankLoginDialogClose}) => {

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
            addButton: {
                paddingTop: 16,
                paddingBottom: 16,
            },
            includesGrid: {},
            deleteIcon: {
                color: red['600']
            }
        }
    });

    const classes = useStyles();

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const {banks, loading} = useSelector(state => state.banks);

    const [login, setLogin] = useState({type: 'None', status: 'None', bank: 'None'});
    const [include, setInclude] = useState("");
    const [includes, setIncludes] = useState([]);
    const [error, setError] = useState({});

    const {enqueueSnackbar} = useSnackbar();
    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleIncludeChange = event => {
        setInclude(event.target.value);
    }

    useEffect(() => {
        dispatch(getBanks(token));
    }, [dispatch, token]);

    const handleSubmit = event => {
        event.preventDefault();
        if (login.status === 'None') {
            setError({...error, status: 'Select Bank login availability'});
            showNotification('Select Bank Login availability', {variant: 'error'});
            return;
        } else {
            setError({...error, status: null});
        }

        if (login.type === 'None') {
            setError({...error, type: 'Select Bank login type'});
            showNotification('Select Bank Login type', {variant: 'error'});
            return;
        } else {
            setError({...error, type: null});
        }

        if (!login.balance) {
            setError({...error, balance: 'Balance field require'});
            showNotification('Balance field required', {variant: 'error'});
            return;
        } else {
            setError({...error, balance: null});
        }

        if (!login.price) {
            setError({...error, price: 'Price field require'});
            showNotification('Price field required', {variant: 'error'});
            return;
        } else {
            setError({...error, price: null});
        }


        if (!login.country) {
            setError({...error, country: 'Country field require'});
            showNotification('Country field required', {variant: 'error'});
            return;
        } else {
            setError({...error, country: null});
        }

        if (!login.bank) {
            setError({...error, bank: 'Bank field require'});
            showNotification('Bank field required', {variant: 'error'});
            return;
        } else {
            setError({...error, bank: null});
        }

        dispatch(createLogin({...login, includes}, token, showNotification));
        handleBankLoginDialogClose();
    }

    const handleIncludeRemove = include => {
        setIncludes(includes.filter(i => i !== include));
    }

    const handleAddInclude = () => {
        if (include !== "") {
            setIncludes([...includes, include]);
            setInclude("");
        }
    }

    const handleChange = event => {
        setLogin({...login, [event.target.name]: event.target.value});
    }

    return (
        <Dialog open={openBankLoginDialog} onClose={handleBankLoginDialogClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Typography gutterBottom={true} variant="h5" className={classes.title} align="center">
                        Create Bank Login
                    </Typography>

                    <Select
                        variant="outlined"
                        margin="none"
                        value={login.status}
                        name="status"
                        label="Status"
                        fullWidth={true}
                        error={Boolean(error.status)}
                        defaultValue={login.status}
                        className={classes.textField}
                        onChange={handleChange}>
                        <MenuItem value="None">Select Availability</MenuItem>
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Unavailale">Unavailable</MenuItem>
                    </Select>

                    <Typography gutterBottom={true} variant="caption" className={classes.caption} display="block">
                        Type
                    </Typography>
                    <Select
                        variant="outlined"
                        margin="none"
                        value={login.type}
                        name="type"
                        label="Type"
                        fullWidth={true}
                        error={Boolean(error.type)}
                        defaultValue={login.type}
                        className={classes.textField}
                        onChange={handleChange}>
                        <MenuItem value="None">Select Type</MenuItem>
                        <MenuItem value="Checkings">Checkings</MenuItem>
                        <MenuItem value="Savings">Savings</MenuItem>
                    </Select>

                    <Grid container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item={true} xs={12} md={9}>
                            <TextField
                                variant="outlined"
                                label="Include"
                                placeholder="Enter includes"
                                margin="normal"
                                className={classes.textField}
                                value={include}
                                type="text"
                                onChange={handleIncludeChange}
                                fullWidth={true}
                                required={true}
                            />
                        </Grid>
                        <Grid item={true} xs={12} md={3}>
                            <Button
                                onClick={handleAddInclude}
                                fullWidth={true}
                                variant="outlined"
                                className={classes.addButton}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container={true} className={classes.includesGrid} spacing={1}>
                        {includes.length ? (
                            includes.map((include, index) => {
                                return (
                                    <Grid item={true} key={index}>
                                        <Chip
                                            title={include}
                                            label={include}
                                            variant="outlined"
                                            size="medium"
                                            clickable={true}
                                            onClick={() => handleIncludeRemove(include)}
                                            onDelete={() => handleIncludeRemove(include)}
                                            deleteIcon={<DeleteForever className={classes.deleteIcon}/>}
                                        />
                                    </Grid>
                                )
                            })
                        ) : (
                            <Grid item={true} container={true} justifyContent="center">
                                <Typography align="center" variant="body2">
                                    Nothing included
                                </Typography>
                            </Grid>
                        )}
                    </Grid>

                    <TextField
                        variant="outlined"
                        label="Balance"
                        placeholder="Enter balance"
                        margin="normal"
                        className={classes.textField}
                        value={login.balance}
                        type="number"
                        onChange={handleChange}
                        name="balance"
                        fullWidth={true}
                        required={true}
                        error={Boolean(error.balance)}
                        helperText={error.balance}
                    />

                    <TextField
                        variant="outlined"
                        label="Price"
                        placeholder="Enter price"
                        margin="normal"
                        className={classes.textField}
                        value={login.price}
                        type="number"
                        onChange={handleChange}
                        name="price"
                        fullWidth={true}
                        required={true}
                        error={Boolean(error.price)}
                        helperText={error.price}
                    />

                    <TextField
                        variant="outlined"
                        label="Country"
                        placeholder="Enter country"
                        margin="normal"
                        className={classes.textField}
                        value={login.country}
                        type="text"
                        onChange={handleChange}
                        name="country"
                        fullWidth={true}
                        required={true}
                        error={Boolean(error.country)}
                        helperText={error.country}
                    />

                    <Typography gutterBottom={true} variant="caption" className={classes.caption} display="block">
                        Bank
                    </Typography>
                    {loading && <LinearProgress variant='query'/>}
                    <Select
                        variant="outlined"
                        margin="none"
                        value={login.bank}
                        name="bank"
                        label="Bank"
                        fullWidth={true}
                        error={Boolean(error.bank)}
                        defaultValue={login.bank}
                        className={classes.textField}
                        onChange={handleChange}>
                        <MenuItem value="None">Select Bank</MenuItem>
                        {banks && banks.map((bank, index) => {
                            return (
                                <MenuItem key={index} value={bank._id}>{bank.name} ({bank.country})</MenuItem>
                            )
                        })}
                    </Select>

                    <Button onClick={handleSubmit} variant="outlined" fullWidth={true} className={classes.submitButton}>
                        Add Bank Login
                    </Button>
                </form>
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

export default AddBankLoginDialog;
