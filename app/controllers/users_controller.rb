class UsersController < ApplicationController
  protect_from_forgery except: :create


  def create
    puts 'just testings log'
    email, password = params[:user].values_at :email, :password

    user = User.find_by_email(email)

    if user
      return render(status: 409, json: { message: 'EmailAlreadyTaken' })
    end

    user = User.create(email: email, password: password)

    render(status: 201, json: { user: user.slice(:email, :id) })
  end
end
