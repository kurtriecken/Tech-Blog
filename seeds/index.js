const sequelize = require('../config/connection');
const seedComment = require('./commentData');
const seedBlogPost = require('./blogPostData');
const seedUser = require('./userData');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUser();
    await seedBlogPost();
    await seedComment();

    process.exit(0);
};

seedAll();