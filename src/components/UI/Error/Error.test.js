import React from "react";

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Error from "./Error";

configure({adapter: new Adapter()});

describe('<Error />', () => {
    let wrapper;
    const props = {
        message: 'message'
    };

    beforeEach(() => {
        wrapper = shallow(<Error {...props} />);
    });

    it('render correctly Track component', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
