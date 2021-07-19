import React, {useState} from "react";
import {
    Avatar,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Grid,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import {DeleteForever} from "@material-ui/icons";
import {red} from "@material-ui/core/colors";

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

    const [login, setLogin] = useState({});
    const [include, setInclude] = useState("");
    const [includes, setIncludes] = useState([]);

    const handleIncludeChange = event => {
        setInclude(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

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

                    <TextField
                        variant="outlined"
                        label="Status"
                        placeholder="Enter status"
                        margin="normal"
                        className={classes.textField}
                        value={login.status}
                        type="text"
                        onChange={handleChange}
                        name="status"
                        fullWidth={true}
                        required={true}
                    />

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
                                            deleteIcon={<Avatar><DeleteForever className={classes.deleteIcon} /></Avatar>}
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
                    />

                    <TextField
                        variant="outlined"
                        label="Bank Country"
                        placeholder="Enter bank country"
                        margin="normal"
                        className={classes.textField}
                        value={login.country}
                        type="text"
                        onChange={handleChange}
                        name="country"
                        fullWidth={true}
                        required={true}
                    />
                    <Button variant="outlined" fullWidth={true} className={classes.submitButton}>
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
