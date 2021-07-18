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
import {getUsers} from "../../redux/users/user-action-creators";
import {Alert} from "@material-ui/lab";
import {Add, Delete, Edit, Visibility} from "@material-ui/icons";
import moment from "moment";

const UsersPage = () => {


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

    const dispatch = useDispatch();

    const [role, setRole] = useState('All');
    const [status, setStatus] = useState('All');
    const [page, setPage] = useState(0);
    const handlePageChange = (event, page) => {
        setPage(page);
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
                        <Button fullWidth={true} className={classes.button} variant="contained" startIcon={<Add/>}>Add</Button>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider}/>

                {users && users.length === 0 ? (
                    <Box>
                        <Typography align="center" variant="h6">No users available</Typography>
                    </Box>) : (
                    <TableContainer component={Paper} variant="outlined" elevation={1} className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Status</TableCell>
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
                                                <TableCell>{user.status}</TableCell>
                                                <TableCell>{user.role}</TableCell>
                                                <TableCell>${parseFloat(user.balance).toFixed(2)}</TableCell>
                                                <TableCell>{moment(user.createdAt).fromNow()}</TableCell>
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
                                count={users.length}
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

export default UsersPage;
