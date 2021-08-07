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
import {deleteUser, getUsers} from "../../redux/users/user-action-creators";
import {Alert} from "@material-ui/lab";
import {Add, Delete, Edit, Visibility} from "@material-ui/icons";
import moment from "moment";
import AddUserDialog from "../../components/modals/users/add-user-dialog";
import DeleteDialog from "../../components/shared/delete-dialog";
import ViewUserDialog from "../../components/modals/users/view-user-dialog";
import UpdateUserDialog from "../../components/modals/users/update-user-dialog";
import {useSnackbar} from "notistack";

const UsersPage = () => {


    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32
            },
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
    const {enqueueSnackbar} = useSnackbar();
    const classes = useStyles();

    const dispatch = useDispatch();

    const [role, setRole] = useState('All');
    const [status, setStatus] = useState('All');
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [page, setPage] = useState(0);
    const query = `page=${page + 1}&${role === 'All' ? '' : `role=${role}`}${role !== 'All' && status !== 'All' ? '&' : ''}${status === 'All' ? '' : `status=${status}`}`;

    const handlePageChange = (event, page) => {
        setPage(page);
    }
    const handleOpenUserDialog = () => {
        setOpenUserDialog(true);
    }

    const handleUserDialogClose = () => {
        setOpenUserDialog(false);
    }

    const handleRoleChange = event => {
        setRole(event.target.value);
    }

    const handleStatusChange = event => {
        setStatus(event.target.value);
    }


    useEffect(() => {
        const showNotification = (message, options) => {
            enqueueSnackbar(message, options);
        }
        dispatch(getUsers(token, query, showNotification));
    }, [dispatch, enqueueSnackbar, query, token]);

    const {users, loading, error} = useSelector(state => state.users);

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

    const showNotification = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleDelete = () => {
        if (selectedID !== "") {
            dispatch(deleteUser(selectedID, token, showNotification));
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

    const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const handleUpdateSelectedUserClick = user => {
        setSelectedUser(user);
        setOpenUpdateUserDialog(true);
    }
    const handleUpdateUserDialogClose = () => {
        setSelectedUser(null);
        setOpenUpdateUserDialog(false);
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
                            Users
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={3}>
                        <Select
                            onChange={handleStatusChange}
                            fullWidth={true}
                            label={<Typography variant="body2">Status</Typography>}
                            margin="dense"
                            variant="outlined"
                            value={status}>
                            <MenuItem value='All'>Select Status</MenuItem>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Suspended">Suspended</MenuItem>
                            <MenuItem value="Deleted">Deleted</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item={true} xs={12} md={3}>
                        <Select
                            onChange={handleRoleChange}
                            fullWidth={true}
                            label={<Typography variant="body2">Role</Typography>}
                            margin="dense"
                            name="role"
                            variant="outlined"
                            value={role}>
                            <MenuItem value='All'>Select Role</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
                            <MenuItem value="USER">User</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item={true} xs={12} md={3}>
                        <Button
                            onClick={handleOpenUserDialog}
                            fullWidth={true}
                            className={classes.button}
                            variant="outlined"
                            startIcon={<Add/>}>Add</Button>
                    </Grid>
                </Grid>

                {loading && <LinearProgress variant="query"/>}
                <Divider variant="fullWidth" className={classes.divider}/>

                {users && users.length === 0 ? (
                    <Box>
                        <Typography className={classes.emptyText} variant="h6">No users available</Typography>
                    </Box>) : (
                    <TableContainer component={Paper} variant="elevation" elevation={1}
                                    className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Balance</TableCell>
                                    <TableCell>Date Joined</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    users && users.map((user, index) => {
                                        return (
                                            <TableRow hover={true} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{user.username}</TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.role === 'SUPER_ADMIN' ? 'SUPER ADMIN' : user.role}</TableCell>
                                                <TableCell>{user.status}</TableCell>
                                                <TableCell>${parseFloat(user.balance).toFixed(2)}</TableCell>
                                                <TableCell>{moment(user.createdAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true} spacing={1}>
                                                        <Grid item={true}>
                                                            <Visibility onClick={() => handleSelectedItem(user)}
                                                                        className={classes.viewIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Edit
                                                                onClick={() => handleUpdateSelectedUserClick(user)}
                                                                className={classes.editIcon}/>
                                                        </Grid>
                                                        <Grid item={true}>
                                                            <Delete onClick={() => handleDeleteItemClick(user._id)}
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
                                count={users.length}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={20}
                            />
                        </Table>
                    </TableContainer>
                )}
            </Container>
            {openUserDialog &&
            <AddUserDialog
                openUserDialog={openUserDialog}
                handleUserDialogClose={handleUserDialogClose}
            />}

            {openDeleteDialog &&
            <DeleteDialog
                openDeleteDialog={openDeleteDialog}
                handleDialogClose={handleDeleteDialogClose}
                message="Are you sure you want to delete this user?"
                handleConfirmAction={handleDelete}
            />}

            {selectedItem &&
            <ViewUserDialog
                openUserDialog={viewItemDialogOpen}
                handleUserDialogClose={handleViewItemDialogClose}
                user={selectedItem}
            />}

            {selectedUser &&
            <UpdateUserDialog
                openUpdateUserDialog={openUpdateUserDialog}
                handleUpdateUserDialogClose={handleUpdateUserDialogClose}
                originalUser={selectedUser}
            />}

        </Layout>
    )
}

export default UsersPage;
