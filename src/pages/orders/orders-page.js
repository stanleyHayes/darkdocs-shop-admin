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
import {getOrders} from "../../redux/orders/order-action-creators";
import {Alert} from "@material-ui/lab";
import {Delete, Edit, Visibility} from "@material-ui/icons";
import moment from "moment";

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
    const classes = useStyles();

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
        dispatch(getOrders(token));
    }, [dispatch, token]);

    const {orders, loading, error} = useSelector(state => state.orders);

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between">
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
                            fullWidth={false}
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
                            fullWidth={false}
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
                    <TableContainer elevation={1} component={Paper} className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow hover={true}>
                                    <TableCell>#</TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Date Created</TableCell>
                                    <TableCell>Date Updated</TableCell>
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
                                                <TableCell>{order.status}</TableCell>
                                                <TableCell>{order.type}</TableCell>
                                                <TableCell>${parseFloat(order.price).toFixed(2)}</TableCell>
                                                <TableCell>{moment(order.createdAt).fromNow()}</TableCell>
                                                <TableCell>{moment(order.updatedAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true} spacing={1}>
                                                        <Grid item={true}>
                                                            <Visibility className={classes.viewIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Edit className={classes.editIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Delete className={classes.deleteIcon}/>
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
        </Layout>
    )
}

export default OrdersPage;
