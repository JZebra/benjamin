import React from 'react';
import { shallow } from 'enzyme';

import Navbar from './Navbar';

describe('<Navbar />', () => {
    it('renders a link to todays virtue entries', () => {
        const wrapper = shallow(<Navbar />);
        expect(wrapper.find('#navbar-today-button').length).toBe(1);
    });

    it('renders a link to an overview of past virtue entries', () => {
        const wrapper = shallow(<Navbar />);
        expect(wrapper.find('#navbar-overview-button').length).toBe(1);
    });
});
