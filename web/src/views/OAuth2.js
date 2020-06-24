import React from "react";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

class OAuth2 extends React.Component {
    componentDidMount() {
        const data = this.props.location.search.split("?")[1].split("code=")[1].split("&scope=");
        const code = data[0];
        const scope = data[1];
        this.sendCode(code, scope);
    }

    async sendCode(code, scope) {
        try {
            await axios.get(`/api/v1/gapi/oauth2?code=${code}&scope=${scope}`);
            window.close();
            //this.props.history.push("/");
        } catch (e) {
            console.log('ouath2 error');
            console.log(e);
            window.close();
        }
    }

    render() {
        return (
            <div>
                <Backdrop open={true} style={{zIndex: 10000}}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        );
    }
};

export default (OAuth2);