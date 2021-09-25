import React from "react";
import { Typography } from "@material-ui/core";
// import '@fontsource/roboto';

function HomePage(){
    return (
        <div className="bodycontent">
            <div className="header">
                <Typography variant="h1">WMS</Typography>
            </div>
            <div className="content" align="center">
                Work Management System is a virtual workspace for our employees, which helps to keep track of their daily, weekly, monthly targets for their respective projects.
            </div>
        </div>

    );
}

export default HomePage