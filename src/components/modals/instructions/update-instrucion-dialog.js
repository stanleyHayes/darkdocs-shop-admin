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
import {useDispatch, useSelector} from "react-redux";
import {updateInstruction} from "../../../redux/instructions/instructions-action-creators";

const UpdateInstructionDialog = ({
                                     openUpdateInstructionDialog,
                                     handleUpdateInstructionDialogClose,
                                     originalInstruction
                                 }) => {

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

    const [instruction, setInstruction] = useState({...originalInstruction});
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const [error, setError] = useState({});

    const handleChange = event => {
        setInstruction({...instruction, [event.target.name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        const updatedInstruction = {}
        if (instruction.text !== originalInstruction.text && !originalInstruction.text) {
            setError({...error, 'text': 'Field required'});
            return;
        } else {
            updatedInstruction['text'] = instruction.text;
            setError({...error, 'text': null});
        }

        dispatch(updateInstruction(originalInstruction._id, updatedInstruction, token));
        handleUpdateInstructionDialogClose();
    }

    return (
        <Dialog open={openUpdateInstructionDialog} onClose={handleUpdateInstructionDialogClose}>
            <DialogContent>
                <Typography variant="h5" align="center" className={classes.title}>
                    Update Instruction
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        label="Instruction"
                        placeholder="Enter instruction"
                        margin="normal"
                        className={classes.textField}
                        value={instruction.text}
                        type="text"
                        onChange={handleChange}
                        name="country"
                        multiline={true}
                        rows={5}
                        fullWidth={true}
                        error={Boolean(error.country)}
                        helperText={error.country}
                    />

                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        variant="outlined"
                        fullWidth={true}
                        className={classes.submitButton}>
                        Update Instruction
                    </Button>
                </form>
            </DialogContent>
            <Divider className={classes.divider} variant="fullWidth"/>
            <DialogActions>
                <Button onClick={handleUpdateInstructionDialogClose} variant="outlined" className={classes.closeButton}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateInstructionDialog;
