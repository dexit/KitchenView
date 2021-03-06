/*!
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
'use strict';

import { STRING } from 'sequelize';
import { Table, Column, Model, BelongsTo, AllowNull, ForeignKey, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Account } from './Account';
import { QueueItem } from './QueueItem';
import { Item } from './Item';
import { Screen } from './Screen';

/**
 * An queue.
 */
@Table
export class Queue extends Model<Queue> {

    id!: number;

    /** The Queue Name */
    @AllowNull(false)
    @Column(STRING(255))
    public name!: string;

    /** The Filter */
    @AllowNull(true)
    @Column(STRING(2048))
    public filter!: string;

    /** The Account Id */
    @AllowNull(false)
    @ForeignKey(() => Account)
    @Column
    public accountId!: number;

    /** The Account */
    @BelongsTo(() => Account)
    public account!: Account;

    /** The QueuesItems. */
    @HasMany(() => QueueItem)
    public queueItems!: QueueItem[];

    /** The Items this Queue has. */
    @BelongsToMany(() => Item, () => QueueItem)
    public items!: Item[];

    /** The Screens. */
    @HasMany(() => Screen)
    public screens!: Screen[];


}
