import React from "react";
import {Box, Button, Container, Divider, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {
    AccountBalance,
    AttachMoney,
    CreditCard,
    Dashboard, Edit, ExitToApp,
    Info, Input,
    List, LockOpen,
    ShoppingBasket,
    VerifiedUser
} from "@material-ui/icons";

const DrawerContent = () => {

    const useStyles = makeStyles(theme => {
        return {
            container: {
                paddingTop: 32,
                paddingBottom: 32
            },
            title: {
                textTransform: 'uppercase',
                fontWeight: 'bold'
            },
            divider: {
                marginTop: 16,
                marginBottom: 16
            },
            button: {
                textTransform: 'capitalize',
                fontWeight: 500
            },
            link: {
                textDecoration: 'none'
            },
            subDivider: {
                marginTop: 4,
                marginBottom: 4
            },
            box: {
                marginBottom: 32
            }
        }
    });

    const classes = useStyles();

    return (
        <Container className={classes.container}>
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
                    <Button className={classes.button} startIcon={<Dashboard/>} variant="text">Users</Button>
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
                <Button className={classes.button} startIcon={<ExitToApp/>} variant="text">Logout</Button>
            </Box>
        </Container>
    )
}

export default DrawerContent;
