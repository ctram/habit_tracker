class HabitsController < ApplicationController
  before_action :verify_user_logged_in

  def index
    render(status: 200, json: { habits: current_user.habits })
  end

  def create
    habit = current_user.habits.create(habit_params)

    render(status: 201, json: { habit: habit })
  end

  def destroy
    habit = Habit.find(params[:id])
    habit.destroy

    render(status: 204, json: {})
  end

  def update_habit_completed_for_date
    id, date, completed = habit_params.values_at :id, :date, :completed

    habit = Habit.find(id)

    return render(status: 400, json: { message: 'HabitNotFound' }) unless habit

    if completed
      habit.dates[date] = true
    else
      habit.dates.delete(date)
    end

    habit.save
    render(status: 200, json: { habit: habit })
  end

  private

  def habit_params
    params.require(:habit).permit(:title, :date, :completed, :id)
  end
end
