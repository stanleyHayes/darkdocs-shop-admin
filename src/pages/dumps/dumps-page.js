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
    Paper,
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
import {getDumps} from "../../redux/dumps/dumps-action-creators";
import {Alert} from "@material-ui/lab";
import {Add, Delete, Edit, Visibility} from "@material-ui/icons";
import moment from "moment";
import AddCCDumpsDialog from "../../components/modals/dumps/add-ccdumps-dialog";

const DumpsPage = () => {

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

    const [page, setPage] = useState(0);
    const [openCCDumpsDialog, setOpenCCDumpsDialog] = useState(false);

    const handleCCDumpsDialogOpen = () => {
        setOpenCCDumpsDialog(true);
    }

    const handleCCDumpsDialogClose = () => {
        setOpenCCDumpsDialog(false);
    }

    const handlePageChange = (event, page) => {
        setPage(page);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDumps(token));
    }, [dispatch, token]);

    const {dumps, loading, error} = useSelector(state => state.dumps);

    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between" spacing={2}>
                    <Grid item={true} xs={12} md={8}>
                        <Typography color="textSecondary" className={classes.title} variant="h5">CC Dumps</Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                        <Button
                            onClick={handleCCDumpsDialogOpen}
                            fullWidth={true}
                            className={classes.button}
                            variant="outlined"
                            startIcon={<Add/>}>
                            Add
                        </Button>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider}/>

                {dumps && dumps.length === 0 ? (
                    <Box>
                        <Typography align="center" variant="h6">No CC Dumps available</Typography>
                    </Box>) : (
                    <TableContainer elevation={1} variant="outlined" component={Paper}
                                    className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow hover={true}>
                                    <TableCell>#</TableCell>
                                    <TableCell>Service</TableCell>
                                    <TableCell>Country Mark</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Date Created</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    dumps && dumps.map((dump, index) => {
                                        return (
                                            <TableRow hover={true} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{dump.service}</TableCell>
                                                <TableCell>{dump.countryMark}</TableCell>
                                                <TableCell>${parseFloat(dump.price).toFixed(2)}</TableCell>
                                                <TableCell>{dump.quantity}</TableCell>
                                                <TableCell>{moment(dump.createdAt).fromNow()}</TableCell>
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
                                count={dumps.length}
                                page={page}
                                onPageChange={handlePageChange}
                                rowsPerPage={10}
                            />
                        </Table>
                    </TableContainer>
                )}
            </Container>

            {openCCDumpsDialog &&
            <AddCCDumpsDialog
                handleCCDumpsDialogClose={handleCCDumpsDialogClose}
                openCCDumpsDialog={openCCDumpsDialog}
            />}
        </Layout>
    )
}

export default DumpsPage;
