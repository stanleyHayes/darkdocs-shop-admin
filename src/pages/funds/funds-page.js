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
import {Delete, Edit} from "@material-ui/icons";
import moment from "moment";
import {deleteFund, getFunds} from "../../redux/funds/funds-action-creators";
import DeleteDialog from "../../components/shared/delete-dialog";
import UpdateFundDialog from "../../components/modals/funds/update-funds-dialog";
import {useSnackbar} from "notistack";

const FundsPage = () => {

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
            emptyText: {
                textTransform: 'uppercase'
            },
            completed: {
                color: 'white',
                backgroundColor: green['600'],
                borderRadius: 32,
                padding: 8,
                fontWeight:'bold'
            },
            deleted: {
                color: 'white',
                backgroundColor: red['600'],
                borderRadius: 32,
                padding: 8,
                fontWeight:'bold'
            },
            pending: {
                color: 'white',
                backgroundColor: grey['600'],
                borderRadius: 32,
                padding: 8,
                fontWeight:'bold'
            }
        }
    });
    const {token} = useSelector(state => state.auth);
    const {funds, loading, error, fundsCount} = useSelector(state => state.funds);

    const classes = useStyles();

    const [status, setStatus] = useState('All');
    const [page, setPage] = useState(0);

    const query = `page=${page + 1}&${status === 'All' ? '' : `status=${status}`}`;

    const handlePageChange = (event, page) => {
        setPage(page);
    }

    const handleStatusChange = event => {
        setStatus(event.target.value);
    }


    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        const showNotification = (message, options) => {
            enqueueSnackbar(message, options);
        }
        dispatch(getFunds(token, query, showNotification));
    }, [dispatch, enqueueSnackbar, query, token]);

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
            dispatch(deleteFund(selectedID, token));
            handleDeleteDialogClose();
        }
    }

    const [openUpdateFundDialog, setOpenUpdateFundDialog] = useState(false);
    const [selectedFund, setSelectedFund] = useState(null);
    const handleUpdateSelectedFundClick = fund => {
        setSelectedFund(fund);
        setOpenUpdateFundDialog(true);
    }
    const handleUpdateFundDialogClose = () => {
        setSelectedFund(null);
        setOpenUpdateFundDialog(false);
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
                <Grid container={true} justifyContent="space-between" spacing={2}>
                    <Grid item={true} xs={12} md={8}>
                        <Typography
                            color="textSecondary"
                            className={classes.title}
                            variant="h5"
                            gutterBottom={true}>
                            Funds
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

                {funds && funds.length === 0 ? (
                    <Box>
                        <Typography
                            className={classes.emptyText}
                            color="textSecondary"
                            variant="h6">
                            No funds available
                        </Typography>
                    </Box>) : (
                    <TableContainer
                        elevation={1} variant="elevation"
                        component={Paper}
                        className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow hover={true}>
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Date Created</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    funds && funds.map((fund, index) => {
                                        return (
                                            <TableRow hover={true} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{fund.user.name}</TableCell>
                                                <TableCell>{renderStatus(fund.status)}</TableCell>
                                                <TableCell>{fund.address}</TableCell>
                                                <TableCell>${parseFloat(fund.amount).toFixed(2)}</TableCell>
                                                <TableCell>{moment(fund.createdAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true} spacing={1}>
                                                        <Grid item={true}>
                                                            <Edit onClick={() => handleUpdateSelectedFundClick(fund)}
                                                                  className={classes.editIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Delete onClick={() => handleDeleteItemClick(fund._id)}
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
                                count={fundsCount}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={20}
                            />
                        </Table>
                    </TableContainer>
                )}
            </Container>

            {openDeleteDialog &&
            <DeleteDialog
                openDeleteDialog={openDeleteDialog}
                handleDialogClose={handleDeleteDialogClose}
                message="Are you sure you want to delete this Fund?"
                handleConfirmAction={handleDelete}
            />}

            {selectedFund &&
            <UpdateFundDialog
                openUpdateFundsDialog={openUpdateFundDialog}
                handleUpdateFundDialogClose={handleUpdateFundDialogClose}
                originalFund={selectedFund}
            />}

        </Layout>
    )
}

export default FundsPage;
