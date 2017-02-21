'use strict';

import {Dispatcher} from 'reduce-flux';

const instance = new Dispatcher();
export default instance;

export const userDispatch = instance.dispatch.bind(instance);
