import configureStore from 'redux-mock-store';
import { EBulldozerDirection } from '../../interfaces';
import React, { JSXElementConstructor } from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Bulldozer from '../../components/Bulldozer';
 
const mockStore = configureStore([]);

describe("Connected Redux Bulldozer Component", () => {

    let store;
    let BulldozerComponent: any;
    beforeEach(() => {
        store = mockStore({
            bulldozerDirection: EBulldozerDirection.east,
        });

        BulldozerComponent = renderer.create(
            <Provider store={store}>
                <Bulldozer />
            </Provider>
        );
    });

    it("should render with given state from Redux store", () => {
        expect(BulldozerComponent.toJSON()).toMatchSnapshot();
    })
});