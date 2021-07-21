import React from "react";
import {Avatar, Box, Button, Container, Divider, Grid, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {
    AccountBalance,
    AttachMoney,
    CreditCard,
    Dashboard,
    Edit,
    ExitToApp,
    Info,
    Input,
    List,
    LockOpen,
    People,
    Receipt,
    ShoppingBasket,
    VerifiedUser
} from "@material-ui/icons";
import {grey} from "@material-ui/core/colors";

const DrawerContent = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 84,
                paddingBottom: 32,
                backgroundColor: 'white',
                [theme.breakpoints.down('sm')]: {
                    paddingTop: 32
                }
            },
            title: {
                textTransform: 'uppercase',
                fontWeight: 'bold',
            },
            divider: {
                marginTop: 8,
                marginBottom: 8
            },
            button: {
                textTransform: 'capitalize',
                fontWeight: 500
            },
            logoutButton: {
                fontWeight: 500,
                textTransform: 'capitalize',
            },
            link: {
                textDecoration: 'none',
                display: 'block',
                transition: 'all 300ms 50ms ease-in-out',
                width: '100%',
                paddingTop: 4,
                paddingBottom: 4,
                '&:hover': {
                    backgroundColor: grey['100']
                }
            },
            subDivider: {},
            box: {
                marginBottom: 32
            },
            initials: {},
            avatar: {
                width: 70,
                height: 70
            }
        }
    });

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container={true} direction="column" alignItems="center" justifyContent="center"
                  className={classes.box}>
                <Grid item={true}>
                    <Avatar className={classes.avatar}>
                        <Typography className={classes.initials} variant="h5" align="center">SH</Typography>
                    </Avatar>
                </Grid>
                <Grid item={true}>
                    <Typography className={classes.initials} variant="h5" align="center">
                        Stanley Hayford
                    </Typography>
                </Grid>
            </Grid>
            <Box className={classes.box}>
                <Typography variant="body2" className={classes.title}>
                    Main
                </Typography>
                <Divider variant="fullWidth" className={classes.divider}/>
                <Link to="/" className={classes.link}>
                    <Button className={classes.button} startIcon={<Dashboard/>} variant="text">Dashboard</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Link to="/users" className={classes.link}>
                    <Button className={classes.button} startIcon={<People/>} variant="text">Users</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Link to="/banks" className={classes.link}>
                    <Button className={classes.button} startIcon={<AccountBalance/>} variant="text">Banks</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Link to="/funds" className={classes.link}>
                    <Button className={classes.button} startIcon={<AttachMoney/>} variant="text">Funds</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Link to="/logins" className={classes.link}>
                    <Button className={classes.button} startIcon={<Input/>} variant="text">Bank Logins</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Link to="/dumps" className={classes.link}>
                    <Button className={classes.button} startIcon={<CreditCard/>} variant="text">CC Dumps</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Link to="/cheques" className={classes.link}>
                    <Button className={classes.button} startIcon={<Receipt/>} variant="text">Cheques</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Link to="/orders" className={classes.link}>
                    <Button className={classes.button} startIcon={<ShoppingBasket/>} variant="text">Orders</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Link to="/information" className={classes.link}>
                    <Button className={classes.button} startIcon={<Info/>} variant="text">Information</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Link to="/instructions" className={classes.link}>
                    <Button className={classes.button} startIcon={<List/>} variant="text">Instructions</Button>
                </Link>
            </Box>
            <Box>
                <Typography variant="body2" className={classes.title}>
                    Account
                </Typography>
                <Divider variant="fullWidth" className={classes.divider}/>
                <Link to="/profile" className={classes.link}>
                    <Button className={classes.button} startIcon={<VerifiedUser/>} variant="text">Profile</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Link to="/edit-profile" className={classes.link}>
                    <Button className={classes.button} startIcon={<Edit/>} variant="text">Edit Profile</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Link to="/auth/change-password" className={classes.link}>
                    <Button className={classes.button} startIcon={<LockOpen/>} variant="text">Change Password</Button>
                </Link>
                <Divider variant="fullWidth" className={classes.subDivider}/>
                <Button className={classes.logoutButton} startIcon={<ExitToApp/>} variant="text">Logout</Button>
            </Box>
        </Container>
    )
}

export default DrawerContent;
