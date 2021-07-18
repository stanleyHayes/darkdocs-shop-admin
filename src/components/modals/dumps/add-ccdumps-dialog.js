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

const AddCCDumpsDialog = ({openCCDumpsDialog, handleCCDumpsDialogClose}) => {

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

    const [dumps, setDumps] = useState({});

    const handleSubmit = event => {
        event.preventDefault();

        handleCCDumpsDialogClose();
    }

    const handleChange = event => {
        setDumps({...dumps, [event.target.name]: event.target.value});
    }

    return (
        <Dialog open={openCCDumpsDialog} onClose={handleCCDumpsDialogClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Typography gutterBottom={true} variant="h5" className={classes.title} align="center">
                        Create CC Dumps + Pins
                    </Typography>
                    <TextField
                        variant="outlined"
                        label="Service"
                        placeholder="Enter service"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.service}
                        type="text"
                        onChange={handleChange}
                        name="service"
                        fullWidth={true}
                        required={true}
                    />

                    <TextField
                        variant="outlined"
                        label="Bin"
                        placeholder="Enter bin"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.bin}
                        type="number"
                        onChange={handleChange}
                        name="bin"
                        fullWidth={true}
                        required={true}
                    />

                    <TextField
                        variant="outlined"
                        label="Type"
                        placeholder="Enter type"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.type}
                        type="text"
                        onChange={handleChange}
                        name="type"
                        fullWidth={true}
                        required={true}
                    />

                    <TextField
                        variant="outlined"
                        label="Country Mark"
                        placeholder="Enter country mark"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.countryMark}
                        type="text"
                        onChange={handleChange}
                        name="countryMark"
                        fullWidth={true}
                        required={true}
                    />


                    <TextField
                        variant="outlined"
                        label="Dumped In"
                        placeholder="Enter dumped in"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.dumpedIn}
                        type="text"
                        onChange={handleChange}
                        name="dumpedIn"
                        fullWidth={true}
                        required={true}
                    />

                    <TextField
                        variant="outlined"
                        label="Bank Base"
                        placeholder="Enter bank base"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.bankBase}
                        type="text"
                        onChange={handleChange}
                        name="bankBase"
                        fullWidth={true}
                        required={true}
                    />

                    <TextField
                        variant="outlined"
                        label="Quantity"
                        placeholder="Enter quantity"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.quantity}
                        type="number"
                        onChange={handleChange}
                        name="quantity"
                        fullWidth={true}
                        required={true}
                    />

                    <TextField
                        variant="outlined"
                        label="Price"
                        placeholder="Enter price"
                        margin="normal"
                        className={classes.textField}
                        value={dumps.price}
                        type="number"
                        onChange={handleChange}
                        name="price"
                        fullWidth={true}
                        required={true}
                    />
                    <Button variant="outlined" fullWidth={true} className={classes.submitButton}>
                        Add CC Dumps
                    </Button>
                </form>
            </DialogContent>
            <Divider variant="fullWidth" className={classes.divider} />
            <DialogActions>
                <Button onClick={handleCCDumpsDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddCCDumpsDialog;
