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
import {brown, green, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {deleteOrder, getOrders} from "../../redux/orders/order-action-creators";
import {Alert} from "@material-ui/lab";
import {Delete, Visibility} from "@material-ui/icons";
import moment from "moment";
import DeleteDialog from "../../components/shared/delete-dialog";
import ViewOrderDialog from "../../components/modals/orders/view-order-dialog";
import {useSnackbar} from "notistack";

const OrdersPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {},
            button: {
                backgroundColor: theme.palette.primary.main
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
    const {enqueueSnackbar} = useSnackbar();
    const classes = useStyles();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const dispatch = useDispatch();

    const [type, setType] = useState('All');
    const [status, setStatus] = useState('All');
    const [page, setPage] = useState(0);
    const handlePageChange = (event, page) => {
        setPage(page);
    }

    const handleTypeChange = event => {
        setType(event.target.value);
    }

    const handleStatusChange = event => {
        setStatus(event.target.value);
    }


    useEffect(() => {
        const showNotification = (message, options) => {
            enqueueSnackbar(message, options);
        }
        dispatch(getOrders(token, showNotification));
    }, [dispatch, token, enqueueSnackbar]);

    const {orders, loading, error} = useSelector(state => state.orders);

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
            dispatch(deleteOrder(selectedID, token, showNotification));
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

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between" spacing={2}>
                    <Grid item={true} xs={12} md={4}>
                        <Typography
                            color="textSecondary"
                            className={classes.title}
                            variant="h5"
                            gutterBottom={true}>
                            Orders
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
                            <MenuItem value="Active">Completed</MenuItem>
                            <MenuItem value="Suspended">Pending</MenuItem>
                            <MenuItem value="Deleted">Cancelled</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item={true} xs={12} md={4}>
                        <Select
                            onChange={handleTypeChange}
                            fullWidth={true}
                            label={<Typography variant="body2">Type</Typography>}
                            margin="dense"
                            variant="outlined"
                            value={type}>
                            <MenuItem value='All'>Select Type</MenuItem>
                            <MenuItem value="Login">Bank Login</MenuItem>
                            <MenuItem value="Dumps">CC Dumps</MenuItem>
                            <MenuItem value="Cheque">Cheque</MenuItem>
                        </Select>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider}/>

                {orders && orders.length === 0 ? (
                    <Box>
                        <Typography align="center" variant="h6">No orders available</Typography>
                    </Box>) : (
                    <TableContainer elevation={1} variant="elevation" component={Paper}
                                    className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow hover={true}>
                                    <TableCell>#</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Date Created</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    orders && orders.map((order, index) => {
                                        return (
                                            <TableRow hover={true} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{order.user.name}</TableCell>
                                                <TableCell>{order.type}</TableCell>
                                                <TableCell>${parseFloat(order.price).toFixed(2)}</TableCell>
                                                <TableCell>{moment(order.createdAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true} spacing={1}>
                                                        <Grid item={true}>
                                                            <Visibility onClick={() => handleSelectedItem(order)}
                                                                        className={classes.viewIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Delete onClick={() => handleDeleteItemClick(order._id)}
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
                                count={orders.length}
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
                message="Are you sure you want to delete this order?"
                handleConfirmAction={handleDelete}
            />}

            {selectedItem &&
            <ViewOrderDialog
                openOrderDialog={viewItemDialogOpen}
                handleOrderDialogClose={handleViewItemDialogClose}
                order={selectedItem}
            />}
        </Layout>
    )
}

export default OrdersPage;
