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
    makeStyles, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
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
        dispatch(getInstructions(token));
    }, [dispatch, token]);

    const {instructions, loading, error} = useSelector(state => state.instructions);
    console.log(instructions, token);
    return (
        <Layout>
            <Container className={classes.container}>
                {loading && <LinearProgress variant="query"/>}
                {error && <Alert title="Error">{error}</Alert>}
                <Grid container={true} justifyContent="space-between">
                    <Grid item={true}>
                        <Typography variant="h4" align="center">Instructions</Typography>
                    </Grid>
                    <Grid item={true}>
                        <Button className={classes.button} variant="outlined" startIcon={<Add/>}>Add</Button>
                    </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider}/>

                {instructions && instructions.length === 0 ? (
                    <Box>
                        <Typography align="center" variant="h6">No instructions available</Typography>
                    </Box>) : (
                    <TableContainer component={Paper} className={classes.tableContainer}>
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
export default InstructionsPage;
