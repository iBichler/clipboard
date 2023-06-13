import { Meteor } from 'meteor/meteor';
import { Migrations } from 'meteor/percolate:migrations';
import { Accounts } from 'meteor/accounts-base';
import { Tasks } from '../tasks/tasks';

Migrations.add({
  version: 1,
  name: 'Add a seed username and password.',
  up: Meteor.wrapAsync(async (_, next) => {
    await Accounts.createUserAsync({
      username: 'idabichler',
      password: 'fhb987',
    });
    next();
  }),
});

Migrations.add({
  version: 2,
  name: 'Add a few sample tasks.',
  up: Meteor.wrapAsync(async (_, next) => {
    const createdAt = new Date();
    const { _id: userId } = Accounts.findUserByUsername('idabichler');
    await Tasks.insertAsync({
      description: 'Install Node@14',
      userId,
      createdAt,
    });
    await Tasks.insertAsync({
      description: 'Install MeteorJS',
      userId,
      createdAt,
    });
    await Tasks.insertAsync({
      description: 'Clone this repository',
      userId,
      createdAt,
    });
    next();
  }),
});
