import BlogPostModel from '../models/blog-post-model';
import UserModel from '../models/user-model';

export default async function seeder() {
    const fakeData = [
        {
           title: `Deadly Premonition Creator's Next Game Is A Slice-Of-Life Cat RPG`,
           description: `Can't wait to play it!`,
           category: 'videogames',
           content: `Hidetaka “Swery” Suehiro’s upcoming mystery slice-of-life cat role-playing game`
        },
        {
          title: `Twenty Years Later, StarCraft's Story is Still an Engrossing Take on Space Opera`,
          description: `The story begins with the Terrans`,
          category: 'videogames',
          content: `it’s become a legendary fixture of the competitive gaming scene. Which makes it easy to forget that it’s also a fantastic space opera.`
        },
        {
          title: `Nintendo Switch Bending Problems Are Still A Thing`,
          description: `I hope not mine`,
          category: 'videogames',
          content: `Earlier this year, there were English language reports of the Nintendo Switch warping and bending.`
        }
      ];
    await fakeData.forEach((post) => {
        BlogPostModel.create({
        title: post.title,
        description: post.description,
        type: post.type,
        category: post.category,
        content: post.content
        });
    })
    UserModel.create({
        username: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        admin: true
    });
}
