// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import benjamin_portrait from '../public/benjamin_portrait.jpg';


@observer
export default class SplashScreen extends Component {


    render(): React$Element<any> {
        const style = {
            "background": `url('${benjamin_portrait}') no-repeat center/20%`,
            "backgroundColor": "green",
            "height": "100vh",
            "width": "100vw",
            "textAlign": "center",
            "transition": "",
            "opacity": "1",
            "visibility": "visible",
            "position": "fixed",
            "zIndex": "2"
        };

        if (!this.props.isLoading) {
            style.visibility = 'hidden';
            style.opacity = '0';
            style.transition = 'visibility 0s 2s, opacity 2s ease-in';
        }

        return (
            <div style={style}></div>
        )
    }
}
