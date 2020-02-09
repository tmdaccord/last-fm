import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({adapter: new Adapter()});

test('renders learn react link', () => {
    const component = shallow(<App/>);
    expect(component.exists()).toBeTruthy();
});
