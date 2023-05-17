// role-acl permissions configurations. 
// define permissions for review CRUD operations

const AccessControl = require('role-acl'); 
const ac = new AccessControl();

ac.grant('admin').execute('delete').on('review');
ac.grant('admin').execute('view').on('reviews');
ac.grant('admin').execute('update').on('review');
ac.grant('admin').execute('view').on('review');

ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('view')
  .on('review');

  ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('update')
  .on('review');

exports.update = (requester, data) => {
    return ac.can(requester.role)
    .context({requester:requester.ID, owner:data.userID})
    .execute('update').sync().on('review');
}

exports.delete = (requester) => {
    return ac.can(requester.role).execute('delete').sync().on('review');
}

exports.viewALL = (requester) => {
    return ac.can(requester.role).execute('view').sync().on('reviews');
}

exports.view = (requester, data) => {
    return ac.can(requester.role)
    .context({requester:requester.ID, owner:data.userID})
    .execute('view').sync().on('review');
}