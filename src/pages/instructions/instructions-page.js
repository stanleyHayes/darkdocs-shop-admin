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
import {Add, Delete, Edit, Visibility} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {Alert} from '@material-ui/lab';
import {getInstructions} from "../../redux/instructions/instructions-action-creators";
import {brown, green, red} from "@material-ui/core/colors";

const InstructionsPage = () => {

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

    const [page, setPage] = useState(0);
    const handlePageChange = (event, page) => {
        setPage(page);
    }

    useEffect(() => {
        dispatch(getInstructions(token));
    }, [dispatch, token]);

    const {instructions, loading, error} = useSelector(state => state.instructions);

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
                            Do's & Don't
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} md={4}>
                        <Button
                            fullWidth={true}
                            className={classes.button}
                            variant="contained"
                            startIcon={<Add/>}>Add</Button>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider}/>

                {instructions && instructions.length === 0 ? (
                    <Box>
                        <Typography align="center" variant="h6">No instructions available</Typography>
                    </Box>) : (
                    <TableContainer elevation={1} variant="outlined" component={Paper} className={classes.tableContainer}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Instruction Text</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    instructions && instructions.map((instruction, index) => {
                                        return (
                                            <TableRow hover={true} key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{instruction.text}</TableCell>
                                                <TableCell>{moment(instruction.updatedAt).fromNow()}</TableCell>
                                                <TableCell>
                                                    <Grid container={true}>
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
                                count={instructions.length}
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
export default InstructionsPage;
