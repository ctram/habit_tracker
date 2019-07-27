const MAP = {
  email_already_taken: 'email already taken',
  user_created: 'user created successfully',
  user_creation_error: 'user creation failed',
  action_not_allowed_for_user: 'action now allowed for user',
  incorrect_password: 'incorrect password',
  user_update_error: 'user could not update',
  user_update_successful: 'user update successful',
  habits_fetch_successful: 'habits successfully fetched',
  habit_creation_successful: 'habit successfully created',
  habit_creation_error: 'habit creation failed',
  habit_destroy_successful: 'habit deleted',
  habit_destroy_error: 'habit deletion failed',
  habit_not_found: 'habit not found',
  habit_update_successful: 'habit update successful',
  habit_update_error: 'habit update failed',
  incorrect_email_or_password: 'incorrect email or password',
  session_creation_successful: 'sign in successful',
  user_not_signed_in: 'user not signed in',
  user_signed_in: 'user signed in',
  user_sign_out_successful: 'successfully signed out',
  user_sign_out_error: 'sign out failed'
};

export function translateResponseMessage(message) {
  if (MAP[message]) {
    return MAP[message];
  }

  console.error('Response message not recognized. You probably need to update the map in "response-helpers"');

  return 'untranslated message, whoops';
}

export function parseErrors(errors) {
  if (Object.getPrototypeOf(errors) !== Object.prototype) {
    throw('"errors" argument should be an object');
  }

  let res = []

  for (let attr in errors) {
    let arr = errors[attr];

    for (let error of arr) {
      res.push(`${attr} ${error}`);
    }
  }

  return res;
}
