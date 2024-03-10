const { faker } = require('@faker-js/faker');

function getRandomNumberInRange(range) {
  const min = range[0];
  const max = range[1];
  return Math.floor(Math.random() * (max - min) + min);
}

const createFavoritePosts = () => {
  const favoritePosts = [
    {
      postId: 1, // Лайкнутый пост
      userId: 1, // Кто лайкнул пост
    },
    {
      postId: 1,
      userId: 2
    },
  ]

  return favoritePosts
}

const createSubsribers = () => {
  const subscribers = [
    {
      userId: 1, // На кого подписались
      subscriberId: 1, // Кто подписался
    },
    {
      userId: 1,
      subscriberId: 3,
    },
    {
      userId: 2,
      subscriberId: 3,
    }
  ]

  return subscribers
}

const createUsers = (userCount) => {

  const createRandomUser = (id) => {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });

    return {
      id,
      avatar: faker.image.avatar(),
      birthday: faker.date.birthdate(),
      email,
      firstName,
      lastName,
      sex,
    };
  }

  const users = []

  for (let uID = 1; uID <= userCount; uID++) {
    users.push(createRandomUser(uID))
  }

  return users
}

const createPosts = (userCount, postRangeCount) => {
  const posts = []

  faker.date.recent() // '2022-02-04T02:09:35.077Z'
  faker.date.recent({ days: 10 }) // '2022-01-29T06:12:12.829Z'

  let pID = 1

  for (let uID = 1; uID <= userCount; uID++) {
    const postCount = getRandomNumberInRange(postRangeCount)

    for (let i = 1; i <= postCount; i++, pID++) {
      posts.push({
        id: pID,
        userId: uID,
        title: faker.lorem.sentence({ min: 1, max: 5 }),
        body: faker.lorem.paragraphs({ min: 1, max: 5 }),
        createdAt: faker.date.recent({ days: 30, refDate: new Date() })
      })


    }
  }

  return posts
}



module.exports = () => {
  const userCount = 5
  const postRangeCount = [5, 25]

  const favoritePosts = createFavoritePosts()
  const subscribers = createSubsribers()
  const users = createUsers(userCount)
  const posts = createPosts(userCount, postRangeCount)


  return {
    "favorite-posts": favoritePosts,
    subscribers,
    users,
    posts
  }
}