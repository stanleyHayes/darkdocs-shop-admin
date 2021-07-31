import React from "react";
import {AppBar, Hidden} from "@material-ui/core";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";
import TabletHeader from "./tablet-header";


const Header = ({handleDrawerOpen}) => {
    return (
        <AppBar variant="elevation" elevation={1}>
            <Hidden mdDown={true}>
                <DesktopHeader/>
            </Hidden>
            <Hidden mdUp={true}>
                <MobileHeader handleDrawerOpen={handleDrawerOpen}/>
            </Hidden>
            <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                <TabletHeader/>
            </Hidden>
        </AppBar>
    )
}

export default Header;
