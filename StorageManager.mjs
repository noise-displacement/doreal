import UserSchema from "./models/user.mjs";
import bcrypt from "bcrypt";
import PostSchema from "./models/post.mjs";

class StorageManager {
    static #instance;

    constructor() {
        if(!StorageManager.#instance) {
            StorageManager.#instance = this;
        }

        return StorageManager.#instance;
    }

    async createUser(email, username, password) {
        let results = null;

        const emailFormatted = email.toLowerCase();
        const hashedPassword = await bcrypt.hash(password, 10);

        const users = await UserSchema.find({username: username});

        try{
            if(!users.length === 0) {
                console.log("user found")
            }
            const user = new UserSchema({
                username: username,
                email: emailFormatted,
                password: hashedPassword,
            });
    
            const newUser = await user.save();
            results = newUser;
        } catch (err) {
            console.log(err);
            results = err;
        }

        return results;
    }

    async retrieveUser(email, password) {
        let results = null;

        const passwordFormatted = password;
        const emailFormatted = email.toLowerCase();
        const users = await UserSchema.find({email: emailFormatted});
        const user = users[0];

        try {
            if(user === null || user === undefined) {
                results = "User not found";
                console.log("not found")
            } else if(await bcrypt.compare(passwordFormatted, user.password)) {
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

    async createPost(user, text) {
        let results = null;

        const userFormatted = user;
        const textFormatted = text;

        try {
            if(textFormatted === null || textFormatted === undefined) {
                results = "No text input";
                console.log("No text");
            } else {
                const post = new PostSchema({
                    user: userFormatted, 
                    text: textFormatted
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
}

export default StorageManager;