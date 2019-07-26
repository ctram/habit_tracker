class UsersController < ApplicationController
  protect_from_forgery except: :create

  skip_before_action :verify_user_logged_in, only: [:create]

  def create
    email, password = params[:user].values_at :email, :password

    user = User.find_by_email(email)

    if user
      return render(status: 409, json: { message: 'EmailAlreadyTaken' })
    end

    user = User.create(email: email, password: password)

    render(status: 201, json: { user: user.slice(:email, :id) })
  end

  def update
    email, new_password, current_password = user_params.values_at :email, :new_password, :current_password

    user = current_user

    keys = user_params.keys

    if email
      user.email = email
    end

    if new_password
      unless user.authenticate(current_password)
        return render(status: 401, json: { message: 'IncorrectPassword' })
      end

      user.password = new_password
    end

    unless user.save
      message = ''

      user.errors.messages.each do |attr_name, attr_messages|
        message += attr_messages.reduce('') do |acc, _message|
          acc += "#{attr_name} #{_message}\n"
          acc
        end
      end

      return render(status: 400, json: { message: message })
    end

    render(status: 200, json: { user: user.slice(:email, :id) })
  end

  private

  def user_params
    params.require(:user).permit(:password, :current_password, :new_password, :email)
  end
end
