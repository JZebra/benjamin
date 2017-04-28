import React, { Component } from 'react';
import { observer } from 'mobx-react';

import benjamin_portrait from '../public/benjamin_portrait.jpg';


@observer
export default class SplashScreen extends Component {

    render() {
        const style = {
            "background": `url('${benjamin_portrait}') no-repeat center/10%`,
            "background-color": "green",
            "height": "100vh",
            "width": "100vw",
            "text-align": "center",
            "transition": "opacity 2s linear"
        };

        if (!this.props.isLoading) {
            style.visibility = 'hidden';
            style.opacity = '0';
            style.transition = 'visibility 0s 2s, opacity 2s linear';
        }

        return (
            <div style={style}></div>
        )
    }
}
