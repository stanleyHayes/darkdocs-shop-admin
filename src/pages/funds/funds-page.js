import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/layout";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    LinearProgress,
    makeStyles, MenuItem,
    Paper, Select,
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
import {Alert} from "@material-ui/lab";
import {Add, Delete, Edit, Visibility} from "@material-ui/icons";
import moment from "moment";
import {getFunds} from "../../redux/funds/funds-action-creators";

const FundsPage = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {},
            button: {
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
        dispatch(getFunds(token));
    }, [dispatch, token]);

    const {funds, loading, error} = useSelector(state => state.funds);

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
                            Funds
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
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item={true} xs={12} md={4} container={true} justifyContent="flex-end">
                        <Button
                            fullWidth={false}
                            className={classes.button}
                            variant="contained"
                            startIcon={<Add/>}>Add</Button>
                    </Grid>
                </Grid>


                <Divider variant="fullWidth" className={classes.divider}/>

                {funds && funds.length === 0 ? (
                    <Box>
                        <Typography align="center" variant="h6">No funds available</Typography>
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
                                    funds && funds.map((fund, index) => {
                                        return (
                                            <TableRow hover={true} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{fund.user.name}</TableCell>
                                                <TableCell>{fund.status}</TableCell>
                                                <TableCell>{fund.address}</TableCell>
                                                <TableCell>${parseFloat(fund.amount).toFixed(2)}</TableCell>
                                                <TableCell>{moment(fund.createdAt).fromNow()}</TableCell>
                                                <TableCell>{moment(fund.updatedAt).fromNow()}</TableCell>
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
                                count={funds.length}
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

export default FundsPage;
