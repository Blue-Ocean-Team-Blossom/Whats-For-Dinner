import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../../client/src/App';
import Pantry from '../../client/src/components/Pantry_Page/index';
import Nav from '../../client/src/components/Home_Page/navigation';
import Home from '../../client/src/components/Home_Page/index';

describe('App Component', () => {
  test('Initial Render of App Component shows correct view', () => {
    const wrapper = shallow(<App />);
    // console.log(wrapper.debug()); // shows html inside rendered component
  });
});
