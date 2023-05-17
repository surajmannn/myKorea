// role-acl permissions configurations. 
// only allow admins to alter products

const AccessControl = require('role-acl'); 
const ac = new AccessControl();

ac.grant('admin').execute('delete').on('product');
ac.grant('admin').execute('update').on('product');
ac.grant('admin').execute('create').on('product');
ac.grant('admin').execute('views').on('product');
ac.grant('user').execute('read').on('product');

exports.update = (requester) => {
    return ac.can(requester.role).execute('update').sync().on('product');
}

exports.delete = (requester) => {
    return ac.can(requester.role).execute('delete').sync().on('product');
}

exports.add = (requester) => {
    return ac.can(requester.role).execute('create').sync().on('product');
}

exports.read = (requester) => {
    return ac.can(requester.role).execute('views').sync().on('product');
}
