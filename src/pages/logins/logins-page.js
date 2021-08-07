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
import {Alert} from "@material-ui/lab";
import {Add, Delete, Edit, Visibility} from "@material-ui/icons";
import moment from "moment";
import {deleteLogin, getLogins} from "../../redux/logins/logins-action-creators";
import AddBankLoginDialog from "../../components/modals/logins/add-logins-dialog";
import DeleteDialog from "../../components/shared/delete-dialog";
import ViewBankLoginDialog from "../../components/modals/logins/view-login-dialog";
import UpdateBankLoginDialog from "../../components/modals/logins/update-login-dialog";
import {useSnackbar} from "notistack";
import {getBanks} from "../../redux/banks/banks-action-creators";

const LoginsPage = () => {


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
    const {token} = useSelector(state => state.auth);
    const [bank, setBank] = useState('All');
    const [page, setPage] = useState(0);
    const {enqueueSnackbar} = useSnackbar();

    const [country, setCountry] = useState('All');

    const query = `page=${page + 1}&${country === 'All' ? '' : `country=${country}`}${country !== 'All' && bank !== 'All' ? '&' : ''}${bank === 'All' ? '' : `bank=${bank}`}`;

    const classes = useStyles();

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }
    const dispatch = useDispatch();

    const [openBankLoginDialog, setOpenBankLoginDialog] = useState(false);

    const {banks} = useSelector(state => state.banks);

    const handleOpenBankLoginDialog = () => {
        setOpenBankLoginDialog(true);
    }

    const handleBankLoginClose = () => {
        setOpenBankLoginDialog(false);
    }

    const handlePageChange = (event, page) => {
        setPage(page);
    }

    const handleBankChange = event => {
        setBank(event.target.value);
    }

    const {logins, loading, error, loginsCount} = useSelector(state => state.logins);

    useEffect(() => {
        const showNotification = (message, options) => {
            enqueueSnackbar(message, options);
        }
        dispatch(getLogins(token, query, showNotification));
    }, [dispatch, enqueueSnackbar, query, token]);


    useEffect(() => {
        dispatch(getBanks(token));
    }, [dispatch, token]);

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
            dispatch(deleteLogin(selectedID, token, showNotification));
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

    const [openUpdateLoginDialog, setOpenUpdateLoginDialog] = useState(false);
    const [selectedLogin, setSelectedLogin] = useState(null);
    const handleUpdateSelectedLoginClick = login => {
        setSelectedLogin(login);
        setOpenUpdateLoginDialog(true);
    }
    const handleUpdateLoginDialogClose = () => {
        setSelectedLogin(null);
        setOpenUpdateLoginDialog(false);
    }

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    }

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert severity="error" title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item={true} xs={12} md={3}>
                        <Typography
                            color="textSecondary"
                            className={classes.title}
                            variant="h5">
                            Bank Logins
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={3}>
                        <Select
                            onChange={handleCountryChange}
                            fullWidth={true}
                            label={<Typography variant="body2">Country</Typography>}
                            margin="dense"
                            variant="outlined"
                            value={country}>
                            <MenuItem value='All'>Select Country</MenuItem>
                            <MenuItem value="UK">UK</MenuItem>
                            <MenuItem value="USA">USA</MenuItem>
                            <MenuItem value="Canada">Canada</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item={true} xs={12} md={3}>
                        <Select
                            onChange={handleBankChange}
                            fullWidth={true}
                            label={<Typography variant="body2">Bank</Typography>}
                            margin="dense"
                            variant="outlined"
                            value={bank}>
                            <MenuItem value='All'>Select Bank</MenuItem>
                            {banks && banks.map((bank, index) => {
                                return (<MenuItem key={index} value={bank._id}>{bank.name}</MenuItem>)
                            })}
                        </Select>
                    </Grid>
                    <Grid item={true} xs={12} md={3}>
                        <Button
                            onClick={handleOpenBankLoginDialog}
                            fullWidth={true}
                            className={classes.button}
                            variant="outlined"
                            startIcon={<Add/>}>Add</Button>
                    </Grid>
                </Grid>
                {loading && <LinearProgress variant="query"/>}
                <Divider variant="fullWidth" className={classes.divider}/>

                {logins && logins.length === 0 ? (
                    <Box>
                        <Typography
                            color="textSecondary"
                            className={classes.emptyText}
                            variant="h6">
                            No bank logins available
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
                                    <TableCell>Bank</TableCell>
                                    <TableCell>Balance</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Date Created</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    logins && logins.map((login, index) => {
                                        return (
                                            <TableRow hover={true} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{login.bank.name}</TableCell>
                                                <TableCell>${parseFloat(login.balance).toFixed(2)}</TableCell>
                                                <TableCell>${parseFloat(login.price).toFixed(2)}</TableCell>
                                                <TableCell>{moment(login.createdAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true} spacing={1}>
                                                        <Grid item={true}>
                                                            <Visibility onClick={() => handleSelectedItem(login)}
                                                                        className={classes.viewIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Edit
                                                                onClick={() => handleUpdateSelectedLoginClick(login)}
                                                                className={classes.editIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Delete onClick={() => handleDeleteItemClick(login._id)}
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
                                count={loginsCount}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={20}
                            />
                        </Table>
                    </TableContainer>
                )}
            </Container>
            {openBankLoginDialog &&
            <AddBankLoginDialog
                openBankLoginDialog={openBankLoginDialog}
                handleBankLoginDialogClose={handleBankLoginClose}
            />}

            {openDeleteDialog &&
            <DeleteDialog
                openDeleteDialog={openDeleteDialog}
                handleDialogClose={handleDeleteDialogClose}
                message="Are you sure you want to delete this Bank Login?"
                handleConfirmAction={handleDelete}
            />}

            {selectedItem &&
            <ViewBankLoginDialog
                openBankLoginDialog={viewItemDialogOpen}
                handleBankLoginDialogClose={handleViewItemDialogClose}
                bankLogin={selectedItem}
            />}

            {selectedLogin &&
            <UpdateBankLoginDialog
                openUpdateLoginDialog={openUpdateLoginDialog}
                handleUpdateLoginDialogClose={handleUpdateLoginDialogClose}
                originalLogin={selectedLogin}
            />}
        </Layout>
    )
}

export default LoginsPage;
