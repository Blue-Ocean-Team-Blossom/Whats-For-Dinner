import React, { useEffect, useContext, useState } from 'react';
import { shallow, mount, render } from 'enzyme';
import PantryForm from '../../../../client/src/components/Pantry_Page/PantryForm';
import Pantry from '../../../../client/src/components/Pantry_Page/index';
import App from '../../../../client/src/App';
import PantryItem from '../../../../client/src/components/Pantry_Page/PantryList/PantryItem';
import { RootProvider } from '../../../../client/src/state_&_contexts/RootContext';
// import {
//  PantryContext,
//  PantryProvider
// } from '../../../../client/src/state_&_contexts/PantryContext';

describe('PantryForm', () => {
  test('PantryForm renders form with correct inputs and submit button: ', () => {
    const Test = () => (
      <RootProvider>
        <PantryForm />
      </RootProvider>
    );

    const wrapper = mount(<Test />);
    expect(wrapper.find('#pantryForm')).toHaveLength(1);
    expect(wrapper.find('#pantryFormItem')).toHaveLength(1);
    expect(wrapper.find('#pantryFormUnit')).toHaveLength(1);
    expect(wrapper.find('#pantryFormQuantity')).toHaveLength(1);
    expect(wrapper.find('#pantryFormSubmit')).toHaveLength(1);
    expect(wrapper.find('#pantryInputSelect')).toHaveLength(1);
    expect(wrapper.find('#pantryForm').type()).toEqual('form');
    expect(wrapper.find('#pantryFormItem').type()).toEqual('input');
    expect(wrapper.find('#pantryFormUnit').type()).toEqual('input');
    expect(wrapper.find('#pantryFormQuantity').type()).toEqual('input');
    expect(wrapper.find('#pantryFormSubmit').type()).toEqual('button');
    expect(wrapper.find('#pantryInputSelect').type()).toEqual('datalist');
  });

  // test(
  //  'PantryForm submit of one item will increase amount of PantryItems by one: ', async () => {
  //   const wrapper = mount(
  //     <RootProvider>
  //       <App />
  //     </RootProvider>
  //   );
  //   console.log(wrapper.debug());
  // });
});
