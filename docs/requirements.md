# Requirements

## Business problem

At Astalty, we focus on solving problems. Typically, features are not initially scoped out in technical terms, but instead they are scoped out in terms of the real-world problems we are solving.

### The context

In the NDIS and in other industries, there is often a requirement to keep track of documents for various reasons. A document may be a contract, a policy, a procedure or a certificate - for example, a Working With Children Check.

Often, these documents have an expiry date, and it is important to know when a document is about to expire so that it can be renewed or archived.

In this particular example, we will be focusing on the problem of keeping track of documents that have an expiry date and belong to users. We are not concerned about why the document has an expiry date, or what the document is for but interested in the problem of keeping track of these documents. Of course, in a commercial application, these documents would likely be linked to a client, organisation or staff member.

### Assumptions

- You can assume that users are currently solving this problem with a combination of something like Google Drive, spreadsheets and calendar reminders
  - The details of the current solution is not important, but it assists in understanding the problem
- You can assume that all users within this application belong to the same organisation
  - Typically, we would have another model called `Organisation` and users would belong to an organisation
- You do not need to write front end tests

:::tip
You should focus on solutions that solve the _Business Problem_ in the simplest way possible.

There is always room for improvement, but we are looking for a solution that is simple, easy to use and solves the problem.

You can take note of things that you would improve if you had more time, but you should not spend too much time on these things. Feel free to add these as comments throughout your code.
:::

### Information about a document

- Documents have names - often this is different to the filename
- Documents have an expiry date and this date is generally anywhere from 1 week to 5 years in the future
- In this example, the only documents we are concerned about are PDFs

### The problem

The points below have been listed in order of priority.

- It's important that users can only view their own documents for privacy reasons - Google Drives are often shared across an organisation
- You can't restrict uploads to Google Drive to just PDFs
- It's hard to rename a file when uploading to Google Drive
- It is difficult to view documents that will expire soon (within 7 days)
- Calendar events are often created to remind users that a document is expiring soon, but it is difficult to keep track of these events
  - an email notification each morning with documents expiring soon would be much better
- It is difficult to view documents that have expired, but we have not yet done anything with them - i.e. archived them
- There is no easy way to archive documents that are expired without deleting them
- It's hard to see all documents and their expiry dates at a glance

## Technical details

These routes have already been created for you:

- `/home` - for viewing all documents
- `/documents/:documentId` - for viewing a document
- `/documents/create` - for creating a document

You will find an example PDF in the `src` directory of this repository.

### Authentication

- You should not need to create or edit any authentication API routes. You can log in by posting to the `/login` endpoint which is provided by Laravel Fortify.

The login payload should look like this:

```json
{
  "email": "user@astalty.com.au",
  "password": "password"
}
```

This user is created when seeding the database.

### Creating a Document

- Please refer to [the problem](#the-problem)
- Please use the `local` driver - in reality, we would have a cloud storage driver such as S3

### Viewing Documents

- Please refer to [the problem](#the-problem)
- There is no need to render the PDF in the browser

### Notifications

- Each morning, a notification should be sent to all Document owners with information about;
  - Documents that are expiring within the next 7 days
  - Documents that have expired but have not yet been archived
- The notification should be sent via email
  - You may use the [log driver](https://laravel.com/docs/10.x/mail#log-driver) for simplicity
- The email does not need any custom styling - please stick to a plaintext/markdown email

### Updating Documents

- There is no requirement to be able to update documents once created (other than archiving them if they are expired)
