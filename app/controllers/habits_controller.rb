class HabitsController < ApplicationController
  def index
    return render(status: 204, json: {}) unless current_user

    render(status: 200, json: { habits: current_user.habits })
  end
end
