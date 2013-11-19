// Validate username, without a specific error message.
Accounts.validateNewUser(function (user) {
  return user.username == "demerys";
});