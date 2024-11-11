import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  login: String,
  id: Number,
  node_id: String,
  avatar_url: String,
  gravatar_id: String,
  url: String,
  html_url: String,
  followers_url: String,
  following_url: String,
  gists_url: String,
  starred_url: String,
  subscriptions_url: String,
  organizations_url: String,
  repos_url: String,
  events_url: String,
  received_events_url: String,
  type: String,
  site_admin: Boolean,
  name: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  hireable: Boolean,
  bio: String,
  twitter_username: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: Date,
  updated_at: Date,
});

const workspace = new mongoose.Schema({
  work_id: { type: String, required: true },
  repo_url: { type: String, required: true },
  languages: [{ type: String }],
});

const instance = new mongoose.Schema({
  instanceName: { type: String, required: true },
  userId: { type: String, required: true },
  workspace: { type: String, required: true },
  sourceImage: { type: String, required: true },
  networkName: { type: String, required: true },
  serverIP: { type: String, required: true },
  TimeCreated: { type: Date, default: Date.now },
  username: { type: String, required: true },
});


const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  feature: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.models.Feedback ||mongoose.model('Feedback', feedbackSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);
const Workspace = mongoose.models.Workspace || mongoose.model("Workspace", workspace);
const Instance = mongoose.models.Instance || mongoose.model("Instance", instance);

export { User, Workspace, Instance, Feedback};