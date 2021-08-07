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
import {brown, green, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {deleteDump, getDumps} from "../../redux/dumps/dumps-action-creators";
import {Alert} from "@material-ui/lab";
import {Add, Delete, Edit, Visibility} from "@material-ui/icons";
import moment from "moment";
import AddCCDumpsDialog from "../../components/modals/dumps/add-ccdumps-dialog";
import DeleteDialog from "../../components/shared/delete-dialog";
import ViewDumpsDialog from "../../components/modals/dumps/view-dumps-dialog";
import UpdateDumpsDialog from "../../components/modals/dumps/update-dumps-dialog";
import {useSnackbar} from "notistack";

const DumpsPage = () => {

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
            },
            emptyText: {
                textTransform: 'uppercase'
            }
        }
    });
    const classes = useStyles();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const [page, setPage] = useState(0);

    const query = `page=${page + 1}`;

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const {token} = useSelector(state => state.auth);
    useEffect(() => {
        const showNotification = (message, options) => {
            enqueueSnackbar(message, options);
        }
        dispatch(getDumps(token, query, showNotification));
    }, [dispatch, token, enqueueSnackbar, query]);

    const {dumps, loading, error, ccDumpsCount} = useSelector(state => state.dumps);

    const [openCCDumpsDialog, setOpenCCDumpsDialog] = useState(false);

    const handleCCDumpsDialogOpen = () => {
        setOpenCCDumpsDialog(true);
    }

    const handleCCDumpsDialogClose = () => {
        setOpenCCDumpsDialog(false);
    }

    const handlePageChange = (event, page) => {
        setPage(page);
    }

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
            dispatch(deleteDump(selectedID, token, showNotification));
            handleDeleteDialogClose();
        }
    }

    const [viewItemDialogOpen, setViewItemDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleViewItemDialogOpen = () => {
        setViewItemDialogOpen(true);
    }

    const handleViewItemDialogClose = () => {
        setViewItemDialogOpen(false)
    }
    const handleSelectedItem = item => {
        setSelectedItem(item);
        handleViewItemDialogOpen();
    }

    const [openUpdateDumpsDialog, setOpenUpdateDumpsDialog] = useState(false);
    const [selectedDumps, setSelectedDumps] = useState(null);
    const handleUpdateSelectedDumpsClick = dumps => {
        setSelectedDumps(dumps);
        setOpenUpdateDumpsDialog(true);
    }
    const handleUpdateDumpsDialogClose = () => {
        setSelectedDumps(null);
        setOpenUpdateDumpsDialog(false);
    }

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert severity="error" title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md={8}>
                        <Typography color="textSecondary" className={classes.title} variant="h5">CC Dumps</Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                        <Button
                            onClick={handleCCDumpsDialogOpen}
                            fullWidth={true}
                            className={classes.button}
                            variant="outlined"
                            startIcon={<Add/>}>
                            Add
                        </Button>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider}/>

                {dumps && dumps.length === 0 ? (
                    <Box>
                        <Typography
                            className={classes.emptyText}
                            color="textSecondary"
                            variant="h6">
                            No CC Dumps available
                        </Typography>
                    </Box>) : (
                    <TableContainer elevation={1} variant="elevation" component={Paper}
                                    className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow hover={true}>
                                    <TableCell>#</TableCell>
                                    <TableCell>Service</TableCell>
                                    <TableCell>Country Mark</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Date Created</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    dumps && dumps.map((dump, index) => {
                                        return (
                                            <TableRow hover={true} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{dump.service}</TableCell>
                                                <TableCell>{dump.countryMark}</TableCell>
                                                <TableCell>${parseFloat(dump.price).toFixed(2)}</TableCell>
                                                <TableCell>{dump.quantity}</TableCell>
                                                <TableCell>{moment(dump.createdAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true} spacing={1}>
                                                        <Grid item={true}>
                                                            <Visibility onClick={() => handleSelectedItem(dump)}
                                                                        className={classes.viewIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Edit
                                                                onClick={() => handleUpdateSelectedDumpsClick(dump)}
                                                                className={classes.editIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Delete onClick={() => handleDeleteItemClick(dump._id)}
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
                                count={ccDumpsCount}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={20}
                            />
                        </Table>
                    </TableContainer>
                )}
            </Container>

            {openCCDumpsDialog &&
            <AddCCDumpsDialog
                handleCCDumpsDialogClose={handleCCDumpsDialogClose}
                openCCDumpsDialog={openCCDumpsDialog}
            />}

            {openDeleteDialog &&
            <DeleteDialog
                openDeleteDialog={openDeleteDialog}
                handleDialogClose={handleDeleteDialogClose}
                message="Are you sure you want to delete this CC Dumps?"
                handleConfirmAction={handleDelete}
            />}

            {selectedItem &&
            <ViewDumpsDialog
                openViewCCDumpsDialog={viewItemDialogOpen}
                handleCCDumpsDialogClose={handleViewItemDialogClose}
                ccDump={selectedItem}
            />}

            {selectedDumps &&
            <UpdateDumpsDialog
                openUpdateDumpsDialog={openUpdateDumpsDialog}
                handleUpdateDumpsDialogClose={handleUpdateDumpsDialogClose}
                originalDumps={selectedDumps}
            />}
        </Layout>
    )
}

export default DumpsPage;
