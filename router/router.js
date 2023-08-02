import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import Post from "../db/post.js";
import myNumber from "../db/number.js";
import myUser from "../db/user.js";
import Photo from "../db/photo.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  },
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const allPost = await Post.find();
    res.json(allPost);
  } catch (error) {
    console.log(error);
  }
});

router.get("/photo", async (req, res) => {
  try {
    const photo = await Photo.find();
    res.json(photo);
  } catch (error) {
    console.log(error);
  }
});

router.post("/photo", async (req, res) => {
  try {
    const photo = req.body;
    const createdPhoto = await Photo.create(photo);
    res.status(201).json(createdPhoto);
  } catch (error) {
    console.log(error);
  }
});

router.get("/user", async (req, res) => {
  try {
    const user = await myUser.find();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});
router.post("/user", async (req, res) => {
  try {
    const theuser = req.body;
    const createduser = await myUser.create(theuser);
    res.status(201).json(createduser);
  } catch (error) {
    console.log(error);
  }
});
router.put("/user", async (req, res) => {
  try {
    const updatedUsers = req.body;

    // Loop through the updatedUsers array and update each user individually
    const updatedUsersPromises = updatedUsers.map(async (updatedUser) => {
      const { _id, email, password, photo, friends, posts, messages, image } =
        updatedUser;

      // Find the user by their unique identifier
      const user = await myUser.findById(_id);

      if (!user) {
        // Handle the case where the user is not found
        throw new Error(`User with ID ${_id} not found`);
      }

      // Update the user properties
      user.email = email;
      user.password = password;
      user.photo = photo;
      user.friends = friends;
      user.posts = posts;
      user.messages = messages;
      user.image = image;

      // Save the updated user in the database
      await user.save();

      return user;
    });

    // Wait for all users to be updated
    const updatedUsersResult = await Promise.all(updatedUsersPromises);

    res.json(updatedUsersResult);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const theuser = await myUser.findById(id);
    console.log("object");
    if (!theuser) {
      return;
    }
    res.status(200).json(theuser);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await myUser.findByIdAndRemove(id);
    res.json({ message: "User Silindi" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, friends, posts, messages, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("user bulunamadı");
    }
    const updatedUser = {
      email,
      password,
      posts,
      friends,
      messages,
      image,
      _id: id,
    };
    await myUser.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
});
router.put("/n/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { mynumber } = req.body;
    res.json(mynumber);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("post bulunamadı");
    }
    const updatedNum = { mynumber, _id: id };
    await myNumber.findByIdAndUpdate(id, updatedNum, { new: true });

    res.json(updatedNum);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const post = req.body;
    const createdPost = await Post.create(post);
    res.status(201).json(createdPost);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, creator } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("post bulunamadı");
    }
    const updatedPost = { title, content, creator, _id: id };
    await Post.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndRemove(id);
    res.json({ message: "Post Silindi" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
