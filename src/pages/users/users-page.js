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
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
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
        dispatch(getUsers(token));
    }, [dispatch, token]);

    const {users, loading, error} = useSelector(state => state.users);

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between">
                    <Grid item={true}>
                        <Typography variant="h4" align="center">Users</Typography>
                    </Grid>
                    <Grid item={true}>
                        <Button className={classes.button} variant="outlined" startIcon={<Add/>}>Add</Button>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider}/>

                {users && users.length === 0 ? (
                    <Box>
                        <Typography align="center" variant="h6">No users available</Typography>
                    </Box>) : (
                    <TableContainer component={Paper} elevation={1} className={classes.tableContainer}>
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

export default UsersPage;
