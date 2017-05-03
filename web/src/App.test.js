import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('<App />', () => {
    beforeEach(function() {
        this.appStore = { isLoading: false };
        this.viewStore = { currentView: { chainView: true, dayView: false }};
    });

    it('renders without crashing', function() {
        const wrapper = shallow(<App appStore={this.appStore} viewStore={this.viewStore}/>)
    });
});
