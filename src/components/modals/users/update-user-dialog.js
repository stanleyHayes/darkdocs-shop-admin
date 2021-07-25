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
import {updateUser} from "../../../redux/users/user-action-creators";
import {useSnackbar} from "notistack";

const UpdateUserDialog = ({openUpdateUserDialog, handleUpdateUserDialogClose, originalUser}) => {

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
                textTransform: 'uppercase',
                fontWeight: 'bold'
            }
        }
    });

    const classes = useStyles();
    const dispatch = useDispatch();

    const [user, setUser] = useState({...originalUser});
    const [error, setError] = useState({});

    const {token} = useSelector(state => state.auth);
    const {enqueueSnackbar} = useSnackbar();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const updatedUser = {}
        if (user.name !== originalUser.name && !user.name) {
            setError({...error, 'name': 'Field required'});
            return;
        } else {
            updatedUser['name'] = user.name;
            setError({...error, 'name': null});
        }

        if (user.email !== originalUser.email && !user.email) {
            setError({...error, 'email': 'Field required'});
            return;
        } else {
            updatedUser['email'] = user.email;
            setError({...error, 'email': null});
        }

        if (user.username !== originalUser.username && !user.username) {
            setError({...error, 'username': 'Field required'});
            return;
        } else {
            updatedUser['username'] = user.username;
            setError({...error, 'username': null});
        }

        if (user.role !== originalUser.role && !user.role) {
            setError({...error, 'role': 'Field required'});
            return;
        } else {
            updatedUser['role'] = user.role;
            setError({...error, 'role': null});
        }

        if (user.status !== originalUser.status && !user.status) {
            setError({...error, 'status': 'Field required'});
            return;
        } else {
            updatedUser['status'] = user.status;
            setError({...error, 'status': null});
        }

        console.log(updatedUser)
        dispatch(updateUser(originalUser._id, updatedUser, token, showNotification));
        handleUpdateUserDialogClose();
    }

    const handleChange = event => {
        setUser({...user, [event.target.name]: event.target.value});
    }
    return (
        <Dialog open={openUpdateUserDialog} onClose={handleUpdateUserDialogClose}>
            <DialogContent>
                <Typography variant="h5" align="center" className={classes.title}>
                    Update User
                </Typography>

                <form onSubmit={handleSubmit}>
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
                        label="Email"
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
                        label="Username"
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

                    <Typography gutterBottom={true} variant="caption" className={classes.caption} display="block">
                        Role
                    </Typography>
                    <Select
                        variant="outlined"
                        margin="none"
                        value={user.role}
                        name="role"
                        label="Role"
                        fullWidth={true}
                        defaultValue={user.role}
                        className={classes.textField}
                        onChange={handleChange}>
                        <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="USER">User</MenuItem>
                    </Select>

                    <Typography gutterBottom={true} variant="caption" className={classes.caption} display="block">
                        Status
                    </Typography>
                    <Select
                        variant="outlined"
                        margin="none"
                        value={user.status}
                        name="status"
                        fullWidth={true}
                        label="Status"
                        defaultValue={user.status}
                        className={classes.textField}
                        onChange={handleChange}>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Blocked">Block</MenuItem>
                    </Select>

                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        variant="outlined"
                        fullWidth={true}
                        className={classes.submitButton}>
                        Update User
                    </Button>

                </form>
            </DialogContent>
            <Divider className={classes.divider} variant="fullWidth"/>
            <DialogActions>
                <Button
                    onClick={handleUpdateUserDialogClose}
                    variant="outlined"
                    className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateUserDialog;
