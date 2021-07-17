import React, {useEffect} from "react";
import Layout from "../../components/layout/layout";
import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import {brown, green, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "../../redux/orders/order-action-creators";
import {Alert} from "@material-ui/lab";
import {Add, Delete, Edit, Visibility} from "@material-ui/icons";
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
                color: brown['600']
            },
            viewIcon: {
                color: green['600']
            },
            deleteIcon: {
                color: red['600']
            }
        }
    });
    const {token} = useSelector(state => state.auth);
    const classes = useStyles();

    const dispatch = useDispatch();

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
                    <Grid item={true}>
                        <Typography variant="h4" align="center">Orders</Typography>
                    </Grid>
                    <Grid item={true}>
                        <Button className={classes.button} variant="outlined" startIcon={<Add/>}>Add</Button>
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
                                    <TableCell>Name</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Amount</TableCell>
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
                                                <TableCell>{order.address}</TableCell>
                                                <TableCell>${parseFloat(order.amount).toFixed(2)}</TableCell>
                                                <TableCell>{moment(order.createdAt).fromNow()}</TableCell>
                                                <TableCell>{moment(order.updatedAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true} spacing={1}>
                                                        <Grid item={true}>
                                                            <Avatar>
                                                                <Visibility className={classes.viewIcon}/>
                                                            </Avatar>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Avatar>
                                                                <Edit className={classes.editIcon}/>
                                                            </Avatar>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Avatar>
                                                                <Delete className={classes.deleteIcon}/>
                                                            </Avatar>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
        </Layout>
    )
}

export default OrdersPage;
