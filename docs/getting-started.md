## Viewing Documents

- Users should only be able to view their own documents
- Users should be able to easily view documents that will expire within 7 days
- Users should be able to easily view expired documents
  - Archived documents should not be visible in the main view
- Users should be able to archive expired documents

## Updating Documents

- There is no requirement to be able to update documents once uploaded

## Creating a Document

- Documents can not be created with an expiry date in the past

## Notifications

- Each morning, a notification should be sent to all Document owners with information about;
  - Documents that will expire within 7 days
  - Documents that have expired and are not archived
- The notification should be sent via email
  - You may use the [log driver](https://laravel.com/docs/10.x/mail#log-driver) for simplicity
