import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserControls from '../../main/components/UserControls';
import { AddUserCommand } from '../../main/redux/actions/actions'
import { ADD_USER_COMMAND } from '../../main/redux/constants/action-types'
import { IUserCommand, EUserCommand } from '../../main/interfaces';
import { mount } from '../enzyme';

const mockStore = configureStore([]);

describe('UserCommands',()=>{
    const initialState = {};
    const mockStore = configureStore();
    let store: any;
    let wrapper : any;
    let callbackFunc = jest.fn();


    beforeEach(()=>{
        store = mockStore(initialState)
        wrapper = mount( <Provider store={store}><UserControls HandleUserCommandCallback={callbackFunc} /></Provider> )
    })


    it('render the connected component', () => {
       expect(wrapper.find(UserControls).length).toEqual(1)
    });

    it('checks action on dispatching ', () => {
        let action;
        let userCommand: IUserCommand = {
            command: EUserCommand.advance,
            value: 1
        }
        store.dispatch(AddUserCommand(userCommand));
        action = store.getActions();
        expect(action[0].type).toBe(ADD_USER_COMMAND);
        expect(action[0].payload).toEqual(userCommand);
    });

});