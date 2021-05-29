import React, { useEffect, useContext, useState } from 'react';
import { shallow, mount, render } from 'enzyme';
import Pantry from '../../../../client/src/components/Pantry_Page/index';
import PantryForm from '../../../../client/src/components/Pantry_Page/PantryForm';
import PantryList from '../../../../client/src/components/Pantry_Page/PantryList/PantryList';
import { RootProvider } from '../../../../client/src/state_&_contexts/RootContext';

describe('Pantry Form', () => {
  test('Pantry Form in Pantry View', () => {
    const Test = () => (
      <RootProvider>
        <Pantry />
      </RootProvider>
    );
    const wrapper = mount(<Test />);
    expect(wrapper.find(PantryForm)).toHaveLength(1);
    expect(wrapper.find(PantryList)).toHaveLength(1);
    expect(wrapper.find('.pantrySection')).toHaveLength(1);
    expect(wrapper.find('#pantryTitle')).toHaveLength(1);
  });
});
