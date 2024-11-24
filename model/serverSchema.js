import mongoose from 'mongoose';

const serverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Server name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String, 
      default: '',
    },
    members: [
      {
        memberId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        role: {
          type: String,
          enum: ['owner', 'admin', 'moderator', 'member'],
          default: 'member',
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    joinCode: {
      type: String,
      required:[true, "join code is required"]
    },
    inviteLinks: [
      {
        type: String,
        required:[true,'invite link required']
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    isPrivate: {
      type: Boolean, 
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    settings: {
      maxMembers: {
        type: Number,
        default: 1000, 
      }
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const Server = mongoose.model('Server', serverSchema);

export default Server;
