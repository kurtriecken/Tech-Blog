const { Comment } = require('../models');

const commentData = [
    {
        content: "This sia  great post!",
        date_created: "April 20, 2021 07:00:00",
        user_id: 1,
        blog_post_id: 1,
    },
    {
        content: "This sia  great post!",
        date_created: "May 24, 2021 07:23:00",
        user_id: 2,
        blog_post_id: 1,
    },
    {
        content: "first",
        date_created: "January 2, 2020 12:00:00",
        user_id: 2,
        blog_post_id: 2,
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;