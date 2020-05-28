import React from "react";

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render four <NavigationItems /> elements', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    });

    it('should render four <NavigationItems /> elements', () => {
        wrapper.setProps({visible: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    });

    it('should an exact Burger Builder button', () => {
        expect(wrapper.contains(<NavigationItem link="/">Burger Builder</NavigationItem>)).toEqual(true);
    });
});