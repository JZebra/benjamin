// @flow

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { FaStar, FaStarO } from 'react-icons/lib/fa';

@observer
export default class VirtueStar extends Component {

  handleClick(): void {
    this.props.appStore.recordVirtueStar(this.props.appStore.selectedDay, this.props.virtueId);
  }

  render(): React$Element<any> {
    const selectedDay = this.props.appStore.selectedDay;
    const size = 30;
    const virtueStars = this.props.appStore.virtueStars;
    const starred = virtueStars.filter(VirtueStar => {
      return VirtueStar.date === selectedDay && VirtueStar.virtue_id === this.props.virtueId
    })

    return (
      starred.length > 0 ?
      <FaStar size={size} onClick={ this.handleClick.bind(this) } /> :
      <FaStarO size={size} onClick={ this.handleClick.bind(this) } />
    )
  }
}

