import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import NavFatherMenu from "./NavFatherMenu";

class NavFatherMenuContainer extends React.PureComponent{
    render() {
        return <NavFatherMenu {...this.props} />
    }
}

export default compose(
    connect(
        null,
        null
    )
)(NavFatherMenuContainer)