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
import {getInstructions} from "../../redux/instructions/instructions-action-creators";
import {Alert} from "@material-ui/lab";
import {Add, Delete, Edit, Visibility} from "@material-ui/icons";
import moment from 'moment';
import {getBanks} from "../../redux/banks/banks-action-creators";

const BanksPage = () => {

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
        dispatch(getBanks(token));
    }, [dispatch, token]);

    const {banks, loading, error} = useSelector(state => state.banks);

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between">
                    <Grid item={true}>
                        <Typography variant="h4" align="center">Banks</Typography>
                    </Grid>
                    <Grid item={true}>
                        <Button className={classes.button} variant="outlined" startIcon={<Add/>}>Add</Button>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider}/>

                {banks && banks.length === 0 ? (
                    <Box>
                        <Typography align="center" variant="h6">No banks available</Typography>
                    </Box>) : (
                    <TableContainer elevation={1} component={Paper} className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow hover={true}>
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Country</TableCell>
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
                                                <TableCell>{bank.text}</TableCell>
                                                <TableCell>{bank.country}</TableCell>
                                                <TableCell>{moment(bank.createdAt).fromNow()}</TableCell>
                                                <TableCell>{moment(bank.updatedAt).fromNow()}</TableCell>
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

export default BanksPage;
