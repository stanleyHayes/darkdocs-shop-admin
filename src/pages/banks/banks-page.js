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
import moment from 'moment';
import {getBanks} from "../../redux/banks/banks-action-creators";

const BanksPage = () => {

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

    const [country, setCountry] = useState('All');
    const [page, setPage] = useState(0);
    const handlePageChange = (event, page) => {
        setPage(page);
    }

    const handleCountryChange = event => {
        setCountry(event.target.value);
    }

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
                    <Grid item={true} xs={12} md={4}>
                        <Typography
                            color="textSecondary"
                            className={classes.title}
                            variant="h5"
                            gutterBottom={true}>
                            Bank Logins
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                        <Select
                            onChange={handleCountryChange}
                            fullWidth={false}
                            label={<Typography variant="body2">Country</Typography>}
                            margin="dense"
                            variant="outlined"
                            value={country}>
                            <MenuItem value='All'>Select Country</MenuItem>
                            <MenuItem value="Active">USA</MenuItem>
                            <MenuItem value="Suspended">UK</MenuItem>
                            <MenuItem value="Deleted">Canada</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item={true} xs={12} md={4} container={true} justifyContent="flex-end">
                        <Button
                            fullWidth={false}
                            className={classes.button}
                            variant="outlined"
                            startIcon={<Add/>}>Add</Button>
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
                                                <TableCell>{bank.name}</TableCell>
                                                <TableCell>{bank.country}</TableCell>
                                                <TableCell>{moment(bank.createdAt).fromNow()}</TableCell>
                                                <TableCell>{moment(bank.updatedAt).fromNow()}</TableCell>
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
                                count={banks.length}
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

export default BanksPage;
