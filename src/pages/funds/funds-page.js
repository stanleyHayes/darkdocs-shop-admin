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
import {brown, red} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "@material-ui/lab";
import {Delete, Edit} from "@material-ui/icons";
import moment from "moment";
import {deleteFund, getFunds} from "../../redux/funds/funds-action-creators";
import DeleteDialog from "../../components/shared/delete-dialog";

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
                        <Typography align="center" variant="h6">No funds available</Typography>
                    </Box>) : (
                    <TableContainer elevation={1} variant="elevation" component={Paper}
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
                                                <TableCell>{fund.status}</TableCell>
                                                <TableCell>{fund.address}</TableCell>
                                                <TableCell>${parseFloat(fund.amount).toFixed(2)}</TableCell>
                                                <TableCell>{moment(fund.createdAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true} spacing={1}>
                                                        <Grid item={true}>
                                                            <Edit className={classes.editIcon}/>
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
                                count={funds.length}
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
                message="Are you sure you want to delete this Fund?"
                handleConfirmAction={handleDelete}
            />}

        </Layout>
    )
}

export default FundsPage;
