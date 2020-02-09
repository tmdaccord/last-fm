import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';

import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Track from "./Track";

configure({adapter: new Adapter()});

describe('<Track />', () => {
    let component;
    const props = {
        name: 'name',
        imageUrl: 'imageUrl',
        artistName: 'artistName',
        artistUrl: 'artistUrl'
    };

    beforeEach(() => {
        component = mount(<Router><Track {...props} /></Router>)
    });

    it('render correctly Track component', () => {
        expect(component).toMatchSnapshot();
    });

    it('should render artist link if available', function () {
        expect(component.find('a')).toHaveLength(2);
    });

    it('should not render artist link if artistUrl not available', function () {
        const component = mount(<Router><Track name='name' imageUrl='imageUrl' artistName='artistName' /></Router>);
        expect(component.find('a')).toHaveLength(1);
    });
});
