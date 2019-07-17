class HabitsController < ApplicationController
  before_action :verify_user_logged_in

  def index
    render(status: 200, json: { habits: current_user.habits })
  end

  def create
    habit = current_user.habits.create(habit_params)

    render(status: 201, json: { habit: habit })
  end

  # TODO: check that these actions are reached
  def complete


  end

  def uncomplete

  end

  private

  def habit_params
    params.require(:habit).permit(:title)
  end
end
