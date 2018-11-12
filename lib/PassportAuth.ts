/*!
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
'use strict';

import { Profile } from 'passport';

import { promise2Callback, getNewOrUpdatedAccount } from './Util';
import { Account } from '../models/Account';
import { ApiClient } from './Square/ApiClient';

export type VerifyDone = (error: Error | null, user?: Account) => void;
export type VerifyFunction = (token: string, tokenSecret: string, profile: Profile, onDone: VerifyDone) => void;
export type DeserializeDone = VerifyDone;
export type SerializeDone = (error: Error | null, userId?: number) => void;

/**
 * Verifies and returns a User.
 */
export function verifyUser(accessToken: string, refreshToken: string, profile: Profile, onDone: VerifyDone) {
    promise2Callback<Account>(
        new ApiClient(accessToken).getMe().then(merchant => getNewOrUpdatedAccount(accessToken, merchant)),
        onDone
    );
}

/**
 * Serializes a user.
 * @param user The user.
 * @param onDone A function to call once the user is serialized.
 */
export function serializeUser(user: Account, onDone: SerializeDone) {
    onDone(null, user.id as number);
}

/**
 * Deserializes a user.
 * @param id The user's id.
 * @param onDone A function to call once the user is deserialized.
 */
export function deserializeUser(id: number, onDone: DeserializeDone) {
    promise2Callback<Account>(
        Account.findById(id, { rejectOnEmpty: true }),
        onDone
    ).catch();
}
