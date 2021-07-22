import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@material-ui/core";
import {Add, Delete, Edit} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {Alert} from '@material-ui/lab';
import {deleteInstruction, getInstructions} from "../../redux/instructions/instructions-action-creators";
import {brown, green, red} from "@material-ui/core/colors";
import AddInstructionDialog from "../../components/modals/instructions/add-instruction-dialog";
import DeleteDialog from "../../components/shared/delete-dialog";
import UpdateInstructionDialog from "../../components/modals/instructions/update-instrucion-dialog";

const InstructionsPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {},
            button: {
                paddingTop: 8,
                paddingBottom: 8,
                backgroundColor: 'white'
            },
            divider: {
                marginTop: 16,
                marginBottom: 16
            },
            tableContainer: {},
            editIcon: {
                color: brown['600'],
                cursor: 'pointer'
            },
            viewIcon: {
                color: green['600'],
                cursor: 'pointer'
            },
            deleteIcon: {
                color: red['600'],
                cursor: 'pointer'
            },
            title: {
                textTransform: 'uppercase'
            }
        }
    });
    const {token} = useSelector(state => state.auth);
    const classes = useStyles();

    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [openInstructionDialog, setOpenInstructionDialog] = useState(false);

    const handleOpenInstructionDialog = () => {
        setOpenInstructionDialog(true);
    }

    const handleInstructionClose = () => {
        setOpenInstructionDialog(false);
    }

    const handlePageChange = (event, page) => {
        setPage(page);
    }

    useEffect(() => {
        dispatch(getInstructions(token));
    }, [dispatch, token]);

    const {instructions, loading, error} = useSelector(state => state.instructions);

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedID, setSelectedID] = useState(null);

    const handleDeleteDialogOpen = () => {
        setOpenDeleteDialog(true);
    }

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    }

    const handleDeleteItemClick = id => {
        setSelectedID(id);
        handleDeleteDialogOpen();
    }

    const handleDelete = () => {
        if (selectedID !== "") {
            dispatch(deleteInstruction(selectedID, token));
            handleDeleteDialogClose();
        }
    }

    const [openUpdateInstructionDialog, setOpenUpdateInstructionDialog] = useState(false);
    const [selectedInstruction, setSelectedInstruction] = useState(null);
    const handleUpdateSelectedInstructionClick = instruction => {
        setSelectedInstruction(instruction);
        setOpenUpdateInstructionDialog(true);
    }
    const handleUpdateInstructionDialogClose = () => {
        setSelectedInstruction(null);
        setOpenUpdateInstructionDialog(false);
    }

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert severity="error" title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between" spacing={2}>
                    <Grid item={true} xs={12} md={8}>
                        <Typography
                            color="textSecondary"
                            className={classes.title}
                            variant="h5"
                            gutterBottom={true}>
                            Do's & Don't
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                        <Button
                            onClick={handleOpenInstructionDialog}
                            fullWidth={true}
                            className={classes.button}
                            variant="outlined"
                            startIcon={<Add/>}>Add</Button>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider}/>

                {instructions && instructions.length === 0 ? (
                    <Box>
                        <Typography align="center" variant="h6">No instructions available</Typography>
                    </Box>) : (
                    <TableContainer elevation={1} variant="elevation" component={Paper}
                                    className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Instruction Text</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    instructions && instructions.map((instruction, index) => {
                                        return (
                                            <TableRow hover={true} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{instruction.text}</TableCell>
                                                <TableCell>{moment(instruction.updatedAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true} spacing={1}>
                                                        <Grid item={true}>
                                                            <Edit
                                                                onClick={() => handleUpdateSelectedInstructionClick(instruction)}
                                                                className={classes.editIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Delete
                                                                onClick={() => handleDeleteItemClick(instruction._id)}
                                                                className={classes.deleteIcon}/>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                            <TablePagination
                                count={instructions.length}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={10}
                            />
                        </Table>
                    </TableContainer>
                )}
            </Container>
            {openInstructionDialog &&
            <AddInstructionDialog
                openInstructionDialog={openInstructionDialog}
                handleInstructionDialogClose={handleInstructionClose}
            />}

            {openDeleteDialog &&
            <DeleteDialog
                openDeleteDialog={openDeleteDialog}
                handleDialogClose={handleDeleteDialogClose}
                message="Are you sure you want to delete this instruction?"
                handleConfirmAction={handleDelete}
            />}

            {selectedInstruction &&
            <UpdateInstructionDialog
                openUpdateInstructionDialog={openUpdateInstructionDialog}
                handleUpdateInstructionDialogClose={handleUpdateInstructionDialogClose}
                originalInstruction={selectedInstruction}
            />}
        </Layout>
    )
}
export default InstructionsPage;
