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

const AddInstructionDialog = ({openInstructionDialog, handleInstructionDialogClose}) => {

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

    const [instruction, setInstruction] = useState({});

    const handleSubmit = event => {
        event.preventDefault();
    }

    const handleChange = event => {
        setInstruction({...instruction, [event.target.name]: event.target.value});
    }

    return (
        <Dialog open={openInstructionDialog} onClose={handleInstructionDialogClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Typography gutterBottom={true} variant="h5" className={classes.title} align="center">
                        Create Instruction
                    </Typography>

                    <TextField
                        variant="outlined"
                        label="Instruction"
                        placeholder="Enter instruction"
                        margin="normal"
                        className={classes.textField}
                        value={instruction.text}
                        type="text"
                        multiline={true}
                        rows={4}
                        onChange={handleChange}
                        name="instruction"
                        fullWidth={true}
                        required={true}
                    />
                    <Button variant="outlined" fullWidth={true} className={classes.submitButton}>
                        Add Instruction
                    </Button>
                </form>
            </DialogContent>
            <Divider variant="fullWidth" className={classes.divider} />
            <DialogActions>
                <Button onClick={handleInstructionDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddInstructionDialog;
