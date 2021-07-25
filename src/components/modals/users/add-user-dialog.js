import React, {useState} from "react";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {createUser} from "../../../redux/users/user-action-creators";
import {useSnackbar} from "notistack";

const AddUserDialog = ({openUserDialog, handleUserDialogClose}) => {

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

    const [user, setUser] = useState({role: "ADMIN"});
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState({});

    const {token} = useSelector(state => state.auth);
    const {enqueueSnackbar} = useSnackbar();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleShowPassword = () => {
        setVisible(!visible);
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (!user.name) {
            setError({...error, name: 'Field required'});
            return;
        } else {
            setError({...error, name: null});
        }

        if (!user.email) {
            setError({...error, email: 'Field required'});
            return;
        } else {
            setError({...error, email: null});
        }

        if (!user.username) {
            setError({...error, username: 'Field required'});
            return;
        } else {
            setError({...error, username: null});
        }

        if (!user.role) {
            setError({...error, role: 'Field required'});
            return;
        } else {
            setError({...error, role: null});
        }

        if (!user.password) {
            setError({...error, password: 'Field required'});
            return;
        } else {
            setError({...error, password: null});
        }
        dispatch(createUser(user, token, showNotification));
        handleUserDialogClose();

    }

    const handleChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    return (
        <Dialog open={openUserDialog} onClose={handleUserDialogClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Typography gutterBottom={true} variant="h5" className={classes.title} align="center">
                        Create User
                    </Typography>
                    <TextField
                        variant="outlined"
                        label="Name"
                        placeholder="Enter name"
                        margin="normal"
                        className={classes.textField}
                        value={user.name}
                        type="text"
                        onChange={handleChange}
                        name="name"
                        fullWidth={true}
                        error={Boolean(error.name)}
                        helperText={error.name}
                    />

                    <TextField
                        variant="outlined"
                        label="Enter email"
                        placeholder="Enter email"
                        margin="normal"
                        className={classes.textField}
                        value={user.email}
                        type="email"
                        onChange={handleChange}
                        name="email"
                        fullWidth={true}
                        error={Boolean(error.email)}
                        helperText={error.email}
                    />

                    <TextField
                        variant="outlined"
                        label="Enter username"
                        placeholder="Enter username"
                        margin="normal"
                        className={classes.textField}
                        value={user.username}
                        type="text"
                        onChange={handleChange}
                        name="username"
                        fullWidth={true}
                        error={Boolean(error.username)}
                        helperText={error.username}
                    />

                    <Select
                        margin="none"
                        variant="outlined"
                        className={classes.textField}
                        name="role"
                        onChange={handleChange}
                        value={user.role}
                        fullWidth={true}
                        defaultValue="ADMIN"
                        error={Boolean(error.role)}
                        label="User Role">
                        <MenuItem value="">Select Role</MenuItem>
                        <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="USER">User</MenuItem>
                    </Select>


                    <TextField
                        variant="outlined"
                        label="Enter password"
                        placeholder="Enter password"
                        margin="normal"
                        className={classes.textField}
                        value={user.password}
                        type={visible ? 'text' : 'password'}
                        onChange={handleChange}
                        name="password"
                        fullWidth={true}
                        error={Boolean(error.password)}
                        helperText={error.password}
                    />

                    <Grid container={true} spacing={2} alignItems="center">
                        <Grid item={true}>
                            <Checkbox checked={visible} onChange={handleShowPassword}/>
                        </Grid>
                        <Grid item={true}>
                            <Typography color="textPrimary" variant="body2" gutterBottom={true}>
                                {visible ? 'Hide' : 'Show'} Password
                            </Typography>
                        </Grid>
                    </Grid>

                    <Button onClick={handleSubmit} variant="outlined" fullWidth={true} className={classes.submitButton}>
                        Add User
                    </Button>
                </form>
            </DialogContent>
            <Divider variant="fullWidth" className={classes.divider}/>
            <DialogActions>
                <Button onClick={handleUserDialogClose} fullWidth={true} variant="outlined"
                        className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddUserDialog;
