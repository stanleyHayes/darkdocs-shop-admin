import React, {useState} from "react";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    Divider, Grid,
    makeStyles, MenuItem, Select,
    TextField,
    Typography
} from "@material-ui/core";

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

    const [user, setUser] = useState({role: "ADMIN"});
    const [visible, setVisible] = useState(false);

    const handleShowPassword = () => {
        setVisible(!visible);
    }

    const handleSubmit = event => {
        event.preventDefault();


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
                        type="text"
                        onChange={handleChange}
                        name="password"
                        fullWidth={true}
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

                    <Button variant="outlined" fullWidth={true} className={classes.submitButton}>
                        Add User
                    </Button>
                </form>
            </DialogContent>
            <Divider variant="fullWidth" className={classes.divider}/>
            <DialogActions>
                <Button onClick={handleUserDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddUserDialog;
