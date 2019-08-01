class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]
  skip_before_action :verify_user_logged_in, only: [:create, :authenticate]

  def create
    email, password = user_params.values_at :email, :password

    user = User.find_by_email(email)

    unless user && user.authenticate(password)
      return render(status: 401, json: {
        message: 'incorrect_email_or_password'
      })
    end

    login(user)

    render(status: 200, json: {
      user: user.slice(:id, :email),
      message: 'session_creation_successful'
    })
  end

  def authenticate
    return render(status: 200, json: { message: 'user_not_signed_in' }) unless current_user

    render(status: 200, json: {
      user: current_user.slice(:email, :id),
      message: 'user_signed_in'
    })
  end

  def destroy
    return render(status: 401, json: { message: 'user_not_signed_in' }) unless current_user

    logout

    unless current_user
      return render(status: 200, json: { message: 'user_sign_out_successful' })
    end

    render(status: 500, json: {
      message: 'user_sign_out_error'
    })
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
