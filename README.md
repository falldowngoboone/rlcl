1. AppProvider mounts and bootstraps the app and gets the user
2. The user and user token, if they exist, are passed into the client hook
3. The client hook is used to fetch resource data (books and list items)
4. The fetching is controlled by `react-query` in order to cache responses and optimistically update client UI

Don't remember the reason behind onSettled.