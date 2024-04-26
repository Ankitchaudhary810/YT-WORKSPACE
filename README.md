## Introduction

UploadFast is a revolutionary workspace environment designed to enhance the YouTube content management system. It enables YouTube channel owners to manage video uploads more securely by integrating an approval system for editors.

### Problem

YouTube currently allows channel owners to assign editors who can upload videos directly to the channel without requiring the owner's consent for each video. This can lead to unauthorized or undesirable content being published under the owner's name without their approval.

### Solution

UploadFast resolves this issue by creating a collaborative platform where editors can upload videos, but these videos only go live on YouTube after the owner's approval. This system ensures that all content reflects the owner's standards and preferences.

## Features

- **Editor Management:** Owners can create and manage multiple editors.
- **Approval Workflow:** Videos require owner approval before being uploaded to YouTube.
- **Secure Workspace:** Editors upload videos to a secure workspace that only transmits approved content to YouTube.

## Tech Stack

- **Frontend:** React, Next.js, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT for secure login processes
- **APIs:** Google APIs for YouTube integration
- **Storage:** AWS S3 for video storage
- **Future Implementations:** Planning to integrate Redis for enhanced server-side caching.

## Planned Improvements

- **Email Notifications:** Developing a service to notify owners when a video is ready for review.
- **Enhanced Authentication:** Implementing more robust authentication mechanisms to secure user access and data privacy.

## Current Issues

- **Protected Routes:** There are issues with the protected routes not functioning as intended.
- **API Reliability:** Occasional failures in API communication during video uploads.

## Feedback and Contributions

Feel free to provide feedback and suggest improvements. Contributions to the project are welcome!

## Looking for Opportunities

I am currently seeking full-time roles that can benefit from my skills and experience. If you have or know of relevant opportunities, please feel free to get in touch!

### Contact Me

- **LinkedIn:** [LinkedIn](https://www.linkedin.com/in/ankit-chaudhary-a08ba1239/)
- **Twitter:** [Twitter](https://twitter.com/Ankit__tw)

# Set Up the Project Locally

Run the following command:

1. At `root` folder:

```sh
npm install
```

2. Go to `apps/client`

```sh
npm install
```

3. Go to `apps/server`

```sh
npm install
```

4. At `root` folder Run this command

```sh
npm run dev
```
