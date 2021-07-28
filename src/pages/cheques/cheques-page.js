import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Box,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@material-ui/core";
import {brown, green, grey, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "@material-ui/lab";
import {Delete, Edit, Visibility} from "@material-ui/icons";
import moment from "moment";
import DeleteDialog from "../../components/shared/delete-dialog";
import {deleteCheque, getCheques} from "../../redux/cheques/cheques-action-creators";
import ViewChequeDialog from "../../components/modals/cheques/view-cheque-dialog";
import UpdateChequeDialog from "../../components/modals/cheques/update-cheque-dialog";

const ChequesPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {},
            button: {},
            divider: {
                marginTop: 16,
                marginBottom: 16
            },
            tableContainer: {},
            editIcon: {
                color: brown['600'],
                cursor: 'pointer'
            },
            deleteIcon: {
                color: red['600'],
                cursor: 'pointer'
            },
            title: {
                textTransform: 'uppercase'
            },
            viewIcon: {
                color: green['600'],
                cursor: 'pointer'
            },
            emptyText: {
                textTransform: 'uppercase'
            },
            completed: {
                color: 'white',
                backgroundColor: green['600'],
                borderRadius: 32,
                padding: 8
            },
            deleted: {
                color: 'white',
                backgroundColor: red['600'],
                borderRadius: 32,
                padding: 8
            },
            pending: {
                color: 'white',
                backgroundColor: grey['600'],
                borderRadius: 32,
                padding: 8
            }
        }
    });
    const {token} = useSelector(state => state.auth);
    const classes = useStyles();

    const [status, setStatus] = useState('All');
    const [page, setPage] = useState(0);
    const handlePageChange = (event, page) => {
        setPage(page);
    }

    const handleStatusChange = event => {
        setStatus(event.target.value);
    }


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCheques(token));
    }, [dispatch, token]);

    const {cheques, loading, error} = useSelector(state => state.cheques);

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
            dispatch(deleteCheque(selectedID, token));
            handleDeleteDialogClose();
        }
    }

    const [openViewChequeDialog, setViewChequeDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleViewItemDialogOpen = () => {
        setViewChequeDialogOpen(true);
    }

    const handleViewChequeDialogClose = () => {
        setViewChequeDialogOpen(false)
    }

    const handleSelectedItem = cheque => {
        setSelectedItem(cheque);
        handleViewItemDialogOpen();
    }


    const [openUpdateChequeDialog, setOpenUpdateChequeDialog] = useState(false);
    const [selectedCheque, setSelectedCheque] = useState(null);
    const handleUpdateSelectedChequeClick = cheque => {
        setSelectedCheque(cheque);
        setOpenUpdateChequeDialog(true);
    }
    const handleUpdateChequeDialogClose = () => {
        setSelectedCheque(null);
        setOpenUpdateChequeDialog(false);
    }

    const renderStatus = status => {
        switch (status) {
            case 'Pending':
                return <Typography display="inline" variant="body2" className={classes.pending}>{status}</Typography>
            case 'Completed':
                return <Typography display="inline" variant="body2" className={classes.completed}>{status}</Typography>
            case 'Deleted':
                return <Typography display="inline" variant="body2" className={classes.deleted}>{status}</Typography>
            default:
                return <Typography display="inline" variant="body2" className={classes.pending}>{status}</Typography>
        }
    }

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between" spacing={2} alignItems="center">
                    <Grid item={true} xs={12} md={8}>
                        <Typography
                            color="textSecondary"
                            className={classes.title}
                            variant="h5">
                            Cheques
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                        <Select
                            onChange={handleStatusChange}
                            fullWidth={true}
                            label={<Typography variant="body2">Status</Typography>}
                            margin="dense"
                            variant="outlined"
                            value={status}>
                            <MenuItem value='All'>Select Status</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                        </Select>
                    </Grid>
                </Grid>


                <Divider variant="fullWidth" className={classes.divider}/>

                {cheques && cheques.length === 0 ? (
                    <Box>
                        <Typography
                            color="textSecondary"
                            className={classes.emptyText}
                            variant="h6">
                            No cheques available
                        </Typography>
                    </Box>) : (
                    <TableContainer elevation={1} variant="elevation" component={Paper}
                                    className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow hover={true}>
                                    <TableCell>#</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Balance</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Date Created</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    cheques && cheques.map((cheque, index) => {
                                        return (
                                            <TableRow hover={true} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{cheque.user.name}</TableCell>
                                                <TableCell>{renderStatus(cheque.status)}</TableCell>
                                                <TableCell>{cheque.address}</TableCell>
                                                <TableCell>{cheque.balance}</TableCell>
                                                <TableCell>${parseFloat(cheque.price).toFixed(2)}</TableCell>
                                                <TableCell>{moment(cheque.createdAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true} spacing={1} alignItems="center">
                                                        <Grid item={true}>
                                                            <Visibility onClick={() => handleSelectedItem(cheque)}
                                                                        className={classes.viewIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Edit
                                                                onClick={() => handleUpdateSelectedChequeClick(cheque)}
                                                                className={classes.editIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Delete onClick={() => handleDeleteItemClick(cheque._id)}
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
                                count={cheques.length}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={10}
                            />
                        </Table>
                    </TableContainer>
                )}
            </Container>

            {openDeleteDialog &&
            <DeleteDialog
                openDeleteDialog={openDeleteDialog}
                handleDialogClose={handleDeleteDialogClose}
                message="Are you sure you want to delete this Cheque?"
                handleConfirmAction={handleDelete}
            />}

            {selectedItem &&
            <ViewChequeDialog
                openViewChequeDialog={openViewChequeDialog}
                handleViewChequeDialogClose={handleViewChequeDialogClose}
                cheque={selectedItem}
            />}

            {selectedCheque &&
            <UpdateChequeDialog
                openUpdateChequeDialog={openUpdateChequeDialog}
                handleUpdateChequeDialogClose={handleUpdateChequeDialogClose}
                originalCheque={selectedCheque}
            />}
        </Layout>
    )
}

export default ChequesPage;
