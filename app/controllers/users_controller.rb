class UsersController < ApplicationController
  protect_from_forgery except: :create

  skip_before_action :verify_user_logged_in, only: [:create]

  def create
    email, password = params[:user].values_at :email, :password

    user = User.find_by_email(email)

    if user
      return render(status: 409, json: { message: 'email_already_taken' })
    end

    user = User.create(email: email, password: password)

    if user.valid?
      return render(
        status: 201,
        json: {
          user: user.slice(:email, :id),
          message: 'user_created'
        }
      )
    end

    render(status: 500, json: { message: 'user_creation_error', errors: user.errors.messages })
  end

  def update
    email, new_password, current_password = user_params.values_at :email, :new_password, :current_password
    user = current_user
    keys = user_params.keys

    if current_user.role == 'admin'
      return render(status: 403, json: { message: 'action_not_allowed_for_user' })
    end

    if email
      user.email = email
    end

    if new_password
      unless user.authenticate(current_password)
        return render(status: 401, json: { message: 'incorrect_password' })
      end

      user.password = new_password
    end

    unless user.save
      return render(status: 400, json: {
        message: 'user_update_error',
        errors: user.errors.messages
      })
    end

    render(status: 200, json: {
      user: user.slice(:email, :id),
      message: 'user_update_successful'
    })
  end

  private

  def user_params
    params.require(:user).permit(:password, :current_password, :new_password, :email)
  end
end
