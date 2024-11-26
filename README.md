Project Name - PairProgram

# PairProgram 

## Overview

A browser based code editor with web-browsing and chatgpt/llms built into it. I wanted an IDE where I can run code and see the results along side my figma diagram. A single source of truth for all things frontend web development wise (I hate having to switch tabs on my laptop).

# Dev Build Process
1. Start Tailwind
`npx tailwindcss -i ./input.css -o ./static/output.css --watch`
2. Start Server - command runs nodemon
`npm start`

## Data Model

### Models/Relationships

```
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
```


## [Schema]([db.mjs](https://github.com/nyu-csci-ua-0467-001-002-spring-2024/final-project-ArjunRajpal123/blob/master/gitonline/src/app/utils/models.ts)) 

## Wireframes - not accurate visit website to see everything

/
![image](https://github.com/nyu-csci-ua-0467-001-002-spring-2024/final-project-ArjunRajpal123/assets/81884929/ea7764bf-ae2d-4960-964d-524083761bd8)

/home
![image](https://github.com/nyu-csci-ua-0467-001-002-spring-2024/final-project-ArjunRajpal123/assets/81884929/b71f9565-77f6-4557-9cfb-3e982ff5080c)


/username/{usename}/workspace/{workspaces} - page to edit code
![image](https://github.com/nyu-csci-ua-0467-001-002-spring-2024/final-project-ArjunRajpal123/assets/81884929/45e7a629-daea-4e78-947e-e1bdd8601676)


## Site map

/->  /login via auth0 -> /home -> /username/{usename}/workspace/{workspaces}



## User Stories or Use Cases

1. as non-registered user, I can visit landing page
2. as a user, I can log in to the site
3. as a user, I can create and view my git repos
4. as a user, I can open a code editor/online ide
5. as a user, I can save my code
6. as a user, I can edit my code
7. as a user, I can interact with vm via a console

## Research Topics


* (3 points) SSO - through Auth0
    * I'm going to use Auth0 to enable things like SSO
    * This will enable users to use their github to login to the workspace thus making the onboarding process super duper easy
    * See <code>https://marketplace.auth0.com/integrations/github-social-connection</code>
    * Should be somewhat easy to integrate but, I am sure it will come with its own quirks - hence a 3 is justified 
* (2 points) Styling using tailwind 
  * Enables me to style components/elements/views only using classnames 
  * Speeds up process of styling all 
  * See <code>https://tailwindcss.com/</code>
  * This is pretty easy to integrate hence why the effort score is 2
* (1 point) Prebuilt components via daisy ui
  * Going off tailwind, I will be using prebuilt components from daisyui so that I can focus on the more difficult tasks at hand
  * I am going to 
* (5 points) Online code editing software (I have several options - Custom)
    * The hard part of this project will be developing my own online code editing software 
    * Plus managing multi-tenancy between different clients
    * Still haven't quite figured out how I want to do this
    * https://github.com/ajaxorg/ace - this might be worthwhile
* (5 points) Next Js App
* (5 points) GCP VM creation/management
* (3 points) Deployment via vercel
  

11 points total out of 8 required points  - I didn't want to do the math but, I bet I am over 8 points at this point.


## [Basic Structure] - since this is a next.js app with routing done via the app router - see file paths under gitonline/src 

## Annotations / References Used

1. [Auth0](https://marketplace.auth0.com/integrations/github-social-connection)
2. [Tailwind](https://tailwindcss.com/)
3. [Daisy Ui](https://tailwindcss.com/)
4. [Online Code Editors] - https://github.com/ajaxorg/ace
5. [Next.js](https://nextjs.org/)
6. [GCP Compute API](https://cloud.google.com/compute/docs/reference/rest/v1)
7. [xterm.js](https://xtermjs.org/)
8. [monaco editor from microsoft](https://github.com/microsoft/monaco-editor)

