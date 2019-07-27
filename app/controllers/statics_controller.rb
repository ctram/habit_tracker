class StaticsController < ApplicationController
  layout 'statics'

  skip_before_action :verify_user_logged_in, only: [:sign_in]

  def index
  end

  def sign_in
    redirect_to '/' if current_user
  end
end
