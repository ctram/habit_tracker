class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :create

  def create
    email, password = params[:user].values_at :email, :password

    user = User.find_by_email(email)

    if !user || user.password != password
      return render(status: 401, json: { message: 'IncorrectEmailOrPassword' })
    end

    session[:user_id] = user.id
    render(status: 200, json: { user: user.slice(:id, :email) })
  end

  def show
    binding.pry
  end
end
