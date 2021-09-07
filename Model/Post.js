const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    author: {
      authorId: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      name: String,
      username: String,
      image: String,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    privacy: {
      type: String,
      default: "public",
    },
    likes: [
      {
        authorId: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    comments: [
      {
        author: {
          authorId: {
            type: Schema.Types.ObjectId,
            ref: "user",
          },
          name: String,
          image: String,
        },
        body: String,
        replyComments: [
          {
            author: {
              authorId: {
                type: Schema.Types.ObjectId,
                ref: "user",
              },
              name: String,
              image: String,
            },
            body: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const postModel = new model("post", postSchema);

module.exports = postModel;
