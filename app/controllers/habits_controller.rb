class HabitsController < ApplicationController
  before_action :verify_user_logged_in

  def index
    render(status: 200, json: { habits: current_user.habits })
  end

  def create
    habit = current_user.habits.create(habit_params)

    render(status: 201, json: { habit: habit })
  end

  private

  def habit_params
    params.require(:habit).permit(:title)
  end
end
