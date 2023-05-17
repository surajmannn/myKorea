// role-acl permissions configurations. 
// define permissions for order CRUD operations

const AccessControl = require('role-acl'); 
const ac = new AccessControl();

ac.grant('admin').execute('delete').on('order');
ac.grant('admin').execute('view').on('orders');
ac.grant('admin').execute('update').on('order');
ac.grant('admin').execute('view').on('order');

ac
  .grant('user')
  .condition({Fn:'EQUALS', args: {'requester':'$.owner'}})
  .execute('view')
  .on('order');

exports.update = (requester) => {
    return ac.can(requester.role).execute('update').sync().on('order');
}

exports.delete = (requester) => {
    return ac.can(requester.role).execute('delete').sync().on('order');
}

exports.viewALL = (requester) => {
    return ac.can(requester.role).execute('view').sync().on('orders');
}

exports.view = (requester, data) => {
    return ac.can(requester.role)
    .context({requester:requester.ID, owner:data.userID})
    .execute('view').sync().on('order');
}