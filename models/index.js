const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
    foreignKey: '',
});

BlogPost.belongsTo(User, {
    foreignKey: '',
});

module.exports = { User, BlogPost, Comment };