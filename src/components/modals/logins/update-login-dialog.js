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
import {useDispatch, useSelector} from "react-redux";
import {updateLogin} from "../../../redux/logins/logins-action-creators";
import {red} from "@material-ui/core/colors";
import {useSnackbar} from "notistack";
import {getBanks} from "../../../redux/banks/banks-action-creators";

const UpdateBankLoginDialog = ({openUpdateLoginDialog, handleUpdateLoginDialogClose, originalLogin}) => {

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
            },
            caption: {
                textTransform: 'uppercase',
                fontWeight: 'bold'
            },
        }
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    const {token} = useSelector(state => state.auth);
    const [login, setLogin] = useState({...originalLogin});
    const [include, setInclude] = useState("");
    const [includes, setIncludes] = useState([...originalLogin.includes]);
    const [error, setError] = useState({});


    const {banks, loading} = useSelector(state => state.banks);

    const {enqueueSnackbar} = useSnackbar();
    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleIncludeChange = event => {
        setInclude(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const updatedLogin = {}

        if (login.type !== originalLogin.type && !login.type) {
            setError({...error, 'type': 'Field required'});
            return;
        } else {
            updatedLogin['type'] = login.type;
            setError({...error, 'type': null});
        }

        if (login.status !== originalLogin.status && !login.status) {
            setError({...error, 'status': 'Field required'});
            return;
        } else {
            updatedLogin['status'] = login.status;
            setError({...error, 'status': null});
        }

        if (login.balance !== originalLogin.balance && !login.balance) {
            setError({...error, 'balance': 'Field required'});
            return;
        } else {
            updatedLogin['balance'] = login.balance;
            setError({...error, 'balance': null});
        }

        if (login.price !== originalLogin.price && !login.price) {
            setError({...error, 'price': 'Field required'});
            return;
        } else {
            updatedLogin['price'] = login.price;
            setError({...error, 'price': null});
        }

        if (login.country !== originalLogin.country && !login.country) {
            setError({...error, 'country': 'Field required'});
            return;
        } else {
            updatedLogin['country'] = login.country;
            setError({...error, 'country': null});
        }

        if (login.bank !== originalLogin.bank && !login.bank) {
            setError({...error, 'bank': 'Field required'});
            return;
        } else {
            updatedLogin['bank'] = login.bank;
            setError({...error, 'bank': null});
        }

        updatedLogin['includes'] = includes;
        dispatch(updateLogin(originalLogin._id, updatedLogin, token, showNotification));

        handleUpdateLoginDialogClose();
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

    useEffect(() => {
        dispatch(getBanks(token));
    }, [dispatch, token]);


    return (
        <Dialog open={openUpdateLoginDialog} onClose={handleUpdateLoginDialogClose}>
            <DialogContent>
                <Typography variant="h5" align="center" className={classes.title}>
                    Update Bank Login
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Typography gutterBottom={true} variant="caption" className={classes.caption} display="block">
                        Status
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
                        <MenuItem value="Deleted">Deleted</MenuItem>
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
                        value={login.bank._id}
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
                        Update Bank Login
                    </Button>
                </form>
            </DialogContent>
            <Divider className={classes.divider} variant="fullWidth"/>
            <DialogActions>
                <Button onClick={handleUpdateLoginDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateBankLoginDialog;
