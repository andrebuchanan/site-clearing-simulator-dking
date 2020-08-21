import configureStore from 'redux-mock-store';
import React from 'react';
import { Provider } from 'react-redux';
import Bulldozer from '../../main/components/Bulldozer';
import { mount } from '../enzyme';
 
const mockStore = configureStore([]);

describe("Connected Redux Bulldozer Component", () => {
    const initialState = {};
    const mockStore = configureStore();
    let store: any;
    let wrapper : any;

    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = mount( <Provider store={store}><Bulldozer/></Provider> )
    })

    it('render the connected component', () => {
        expect(wrapper.find(Bulldozer).length).toEqual(1);
     });
});