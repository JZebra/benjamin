import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment-timezone';

import { FaStar, FaStarO } from 'react-icons/lib/fa';

@observer
export default class VirtueStar extends Component {

  handleClick() {
    this.props.appStore.recordVirtueStar(this.props.appStore.selectedDay.unix(), this.props.virtue_id);
  }

  render() {
    const selectedDay = this.props.appStore.selectedDay;
    const size = 30;
    const starred = this.props.starred_days.filter(VirtueStar => {
      return moment(VirtueStar.date).format('LL') == selectedDay.format('LL')
    })

    return (
      starred.length > 0 ?
      <FaStar size={size} onClick={ this.handleClick.bind(this) } /> :
      <FaStarO size={size} onClick={ this.handleClick.bind(this) } />
    )
  }
}

