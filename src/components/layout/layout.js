import React, {useState} from "react";
import {Box, Grid, Hidden, makeStyles, SwipeableDrawer} from "@material-ui/core";
import DrawerContent from "../drawer/drawer-content";
import Header from "../header/header";

const Layout = ({children}) => {

    const useStyles = makeStyles(theme => {
        return {
            gridContainer: {
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
            },
            sidenav: {
                backgroundColor: 'white'
            },
            content: {
                backgroundColor: theme.palette.background.default,
                paddingTop: 32,
                paddingBottom: 32
            }
        }
    });

    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleCloseDrawer = () => {
        setDrawerOpen(false);
    }

    const handleOpenDrawer = () => {
        setDrawerOpen(true);
    }


    return (
        <div>
            <Grid container={true} className={classes.gridContainer}>
                <Hidden smDown={true}>
                    <Grid item={true} md={3} lg={2} className={classes.sidenav}>
                        <DrawerContent handleCloseDrawer={handleCloseDrawer}/>
                    </Grid>
                </Hidden>
                <Grid item={true} xs={12} md={9} lg={10}>
                    <Header handleDrawerOpen={handleOpenDrawer} />
                    <Box  className={classes.content}>
                        {children}
                    </Box>
                </Grid>
            </Grid>
            <SwipeableDrawer onClose={handleCloseDrawer} onOpen={handleOpenDrawer} open={drawerOpen}>
                <DrawerContent handleCloseDrawer={handleCloseDrawer}/>
            </SwipeableDrawer>
        </div>
    )
}

export default Layout;
