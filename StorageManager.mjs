import UserSchema from "./models/user.mjs";
import PostSchema from "./models/post.mjs";

const { createHmac } = await import('node:crypto');

class StorageManager {
  static #instance;

  constructor() {
    if (!StorageManager.#instance) {
      StorageManager.#instance = this;
    }

    return StorageManager.#instance;
  }

  async createUser(email, username, password) {
    let results = null;

    const emailFormatted = email.toLowerCase();
    //const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = createHmac('sha256', password).digest('hex');

    const users = await UserSchema.find({ username: username });
    //console.log(users);

    try {
      if (users.length !== 0) {
        console.log("user found");
      } else {
        const user = new UserSchema({
          username: username,
          email: emailFormatted,
          password: hashedPassword,
        });
  
        const newUser = await user.save();
        results = newUser;
      }
    } catch (err) {
      console.log(err);
      results = err;
    }

    return results;
  }

  async retrieveUser(email, password) {
    let results = null;

    const passwordFormatted = password;
    let encryptedPasswordInput = createHmac('sha256', passwordFormatted).digest('hex');

    const emailFormatted = email.toLowerCase();
    const users = await UserSchema.find({ email: emailFormatted });
    const user = users[0];

    try {
      if (user === null || user === undefined) {
        results = "User not found";
        console.log("not found");
      } else if (encryptedPasswordInput === user.password) {
        results = user;
      } else {
        results = "Not allowed";
      }
    } catch (err) {
      console.log(err);
      results = 500;
    }

    return results;
  }

  async createPost(user, text, id) {
    let results = null;

    const userFormatted = user;
    const textFormatted = text;
    const idFormatted = id;

    try {
      if (textFormatted === null || textFormatted === undefined) {
        results = "No text input";
        console.log("No text");
      } else {
        const post = new PostSchema({
          id: idFormatted,
          user: userFormatted,
          text: textFormatted,
        });

        const newPost = await post.save();
        results = newPost;
      }
    } catch (err) {
      console.log(err);
      results = err;
    }

    return results;
  }

  async retrievePosts(user, id) {
    let results = null;
    //console.log("Retrieve", user);

    try {
      const userFormatted = user || undefined;
      const idFormatted = id || undefined;

      if (userFormatted !== undefined) {
        const posts = await PostSchema.find({ user: userFormatted });
        results = posts;
      } else if(idFormatted !== undefined) {
        const posts = await PostSchema.find({ id: idFormatted });
        results = posts;
      } else {
        const posts = await PostSchema.find({});
        results = posts;
      }
    } catch (err) {
      console.log(err);
      results = err;
    }

    return results;
  }

  async deletePost(id) {
    let results = null;

    try {
      results = await PostSchema.deleteOne({ id: id });
    } catch (err) {
      console.log(err);
      results = err;
    }

    return results;
  }

  async editPost(id, text) {
    let results = null;

    try {
      const idFormatted = id;
      const textFormatted = text;

      const post = await PostSchema.updateOne(
        { id: idFormatted },
        { text: textFormatted }
      );
      results = post;
    } catch (err) {
      console.log(err);
      results = err;
    }

    return results;
  }
}

export default StorageManager;
