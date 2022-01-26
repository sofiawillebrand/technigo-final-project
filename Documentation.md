# Documentation

## Start endpoint

/

## Sign-up

Sign-up as a new user
post
/sign-up

## Login

Log in to personal profile
post
/login

## /user

Handles all user-related endpoints

### Profile page

Show profile information for logged in user
get
/user/:userId

### User score

Update user-score
patch
/user/:userId/score

### Delete user account

Delete user account
delete
/user/:userId

## Add roles

Add a role to the role-collection (ex admin/user)
post
/roles

### All tasks

Show all tasks
get
/tasks/all-tasks

### Check task

Mark a task as done
post
/task/checked-tasks

### Delete task

Delete a task that a user has checked as done
delete
/task/checked-tasks

### Leaderboard

Leaderboard showing top users
get
/leaderboard

### Information

Information page
get
/information