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

const UsersPage = () => {


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

    const [role, setRole] = useState('All');
    const [status, setStatus] = useState('All');
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [page, setPage] = useState(0);
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
        dispatch(getUsers(token));
    }, [dispatch, token]);

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

    const handleDelete = () => {
        if (selectedID !== "") {
            dispatch(deleteUser(selectedID, token));
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
                {error && <Alert title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between" spacing={2}>
                    <Grid item={true} xs={12} md={3}>
                        <Typography
                            color="textSecondary"
                            className={classes.title}
                            variant="h5"
                            gutterBottom={true}>
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
                            variant="outlined"
                            value={role}>
                            <MenuItem value='All'>Select Role</MenuItem>
                            <MenuItem value="Cheque">Admin</MenuItem>
                            <MenuItem value="Dump">Super Admin</MenuItem>
                            <MenuItem value="Login">User</MenuItem>
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

                <Divider variant="fullWidth" className={classes.divider}/>

                {users && users.length === 0 ? (
                    <Box>
                        <Typography align="center" variant="h6">No users available</Typography>
                    </Box>) : (
                    <TableContainer component={Paper} variant="elevation" elevation={1}
                                    className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Role</TableCell>
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
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.role}</TableCell>
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
                                rowsPerPage={10}
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
