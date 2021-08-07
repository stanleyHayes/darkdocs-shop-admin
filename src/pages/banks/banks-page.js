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
import {Add, Delete, Edit} from "@material-ui/icons";
import moment from 'moment';
import {deleteBank, getBanks} from "../../redux/banks/banks-action-creators";
import AddBankDialog from "../../components/modals/bank/add-bank-dialog";
import DeleteDialog from "../../components/shared/delete-dialog";
import UpdateBankDialog from "../../components/modals/bank/update-bank-dialog";
import {useSnackbar} from "notistack";

const BanksPage = () => {

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
            alert: {
                marginTop: 8,
                marginBottom: 8
            },
            active: {
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
            }
        }
    });

    const [country, setCountry] = useState('All');
    const [page, setPage] = useState(0);
    const [openBankDialog, setOpenBankDialog] = useState(false);
    const query = `page=${page + 1}&${country === 'All' ? '' : `country=${country}`}`;

    const handleBankDialogOpen = () => {
        setOpenBankDialog(true);
    }

    const handleBankDialogClose = () => {
        setOpenBankDialog(false);
    }

    const handlePageChange = (event, page) => {
        setPage(page);
    }

    const handleCountryChange = event => {
        setCountry(event.target.value);
    }

    const {token} = useSelector(state => state.auth);
    const {banks, loading, error} = useSelector(state => state.banks);

    const {enqueueSnackbar} = useSnackbar();
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        const showNotification = (message, options) => {
            enqueueSnackbar(message, options);
        }
        dispatch(getBanks(token, query, showNotification));
    }, [dispatch, enqueueSnackbar, token, query]);

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
            dispatch(deleteBank(selectedID, token));
            handleDeleteDialogClose();
        }
    }

    const [openUpdateBankDialog, setOpenUpdateBankDialog] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);
    const handleUpdateSelectedBank = bank => {
        setSelectedBank(bank);
        setOpenUpdateBankDialog(true);
    }
    const handleUpdateBankDialogClose = () => {
        setSelectedBank(null);
        setOpenUpdateBankDialog(false);
    }

    const renderStatus = status => {
        switch (status) {
            case 'Active':
                return <Typography display="inline" variant="body2" className={classes.active}>{status}</Typography>
            case 'Deleted':
                return <Typography display="inline" variant="body2" className={classes.deleted}>{status}</Typography>
            default:
                return <Typography display="inline" variant="body2" className={classes.active}>{status}</Typography>
        }
    }

    console.log(query);
    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert className={classes.alert} severity="error" title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between" spacing={2} alignItems="center">
                    <Grid item={true} xs={12} md={4}>
                        <Typography
                            color="textSecondary"
                            className={classes.title}
                            variant="h5">
                            Bank
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                        <Select
                            onChange={handleCountryChange}
                            fullWidth={true}
                            label={<Typography variant="body2">Country</Typography>}
                            margin="dense"
                            variant="outlined"
                            value={country}>
                            <MenuItem value='All'>Select Country</MenuItem>
                            <MenuItem value="USA">USA</MenuItem>
                            <MenuItem value="UK">UK</MenuItem>
                            <MenuItem value="Canada">Canada</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                        <Button
                            onClick={handleBankDialogOpen}
                            fullWidth={true}
                            className={classes.button}
                            variant="outlined"
                            startIcon={<Add/>}>Add</Button>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider}/>

                {banks && banks.length === 0 ? (
                    <Box>
                        <Typography
                            color="textSecondary"
                            variant="h6"
                            className={classes.emptyText}>
                            No banks available
                        </Typography>
                    </Box>) : (
                    <TableContainer elevation={1} variant="elevation" component={Paper}
                                    className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow hover={true}>
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Country</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Date Created</TableCell>
                                    <TableCell>Date Updated</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    banks && banks.map((bank, index) => {
                                        return (
                                            <TableRow hover={true} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{bank.name}</TableCell>
                                                <TableCell>{bank.country}</TableCell>
                                                <TableCell>
                                                    {renderStatus(bank.status)}
                                                </TableCell>
                                                <TableCell>{moment(bank.createdAt).fromNow()}</TableCell>
                                                <TableCell>{moment(bank.updatedAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true} spacing={1}>
                                                        <Grid item={true}>
                                                            <Edit
                                                                onClick={() => handleUpdateSelectedBank(bank)}
                                                                className={classes.editIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Delete onClick={() => handleDeleteItemClick(bank._id)}
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
                                count={banks.length}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={20}
                            />
                        </Table>
                    </TableContainer>
                )}
            </Container>
            {openBankDialog &&
            <AddBankDialog
                openBankDialog={openBankDialog}
                handleBankDialogClose={handleBankDialogClose}
            />}

            {openDeleteDialog &&
            <DeleteDialog
                openDeleteDialog={openDeleteDialog}
                handleDialogClose={handleDeleteDialogClose}
                message="Are you sure you want to delete this Bank?"
                handleConfirmAction={handleDelete}
            />}

            {selectedBank &&
            <UpdateBankDialog
                openUpdateBankDialog={openUpdateBankDialog}
                handleUpdateDialogClose={handleUpdateBankDialogClose}
                originalBank={selectedBank}
            />}
        </Layout>
    )
}

export default BanksPage;
