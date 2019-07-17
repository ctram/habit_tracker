class ApplicationController < ActionController::Base
  helper_method :current_user, :login, :who_is_logged_in?

  def verify_user_logged_in
    return render(status: 401, json: { message: 'UserNotLoggedIn' }) unless current_user
  end

  def current_user
      if session[:user_id]
          @current_user ||= User.find(session[:user_id])
      else
          @current_user = nil
      end
  end

  def login(user)
    session[:user_id] = user.id
    @current_user = user
  end

  def who_is_logged_in?
    @current_user
  end

  def logout
    session[:user_id] = nil
    @current_user = nil
  end
end
