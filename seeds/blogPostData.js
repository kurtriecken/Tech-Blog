const { BlogPost } = require('../models');

const blogPostData = [
    {
        title: "CSS is awesome",
        content: "You should learn CSS. it's the best way to style your page.",
        date_created: "April 20, 2021 07:00:00",
        user_id: 1
    },
    {
        title: "React: what is it?",
        content: "idk but im gonna learn",
        date_created: "April 20, 2021 07:00:00",
        user_id: 2
    },
    {
        title: "How to get a job in this market",
        content: "Network, keep building, code every day.",
        date_created: "April 20, 2021 07:00:00",
        user_id: 3
    },
];

const seedBlogPost = () => BlogPost.bulkCreate(blogPostData);

module.exports = seedBlogPost;