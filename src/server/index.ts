#!/usr/bin/env node
/*!
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
'use strict';

import { App } from './lib/app/App';
import { Config } from './lib/Config';

const app = new App(Config);
