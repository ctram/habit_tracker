class HabitsController < ApplicationController
  before_action :verify_user_logged_in

  def index
    timezone_offset = request.headers['X-Timezone-Offset']

    render(status: 200, json: {
      habits: habits_plus_info(timezone_offset),
      message: 'habits_fetch_successful'
    })
  end

  def create
    habit = current_user.habits.create(habit_params)

    if habit.valid?
      return render(status: 201, json: {
        habit: habit,
        message: 'habit_creation_successful'
      })
    end

    render(status: 500, json: {
      habit: habit,
      message: 'habit_creation_error',
      errors: habit.errors.messages
    })
  end

  def update
    habit = current_user.habits.find_by_id(habit_params[:id])

    unless habit
      return render(status: 404, json: {
          message: 'habit_not_found'
      })
    end

    # only able to update title for now.
    habit.title = habit_params[:title]

    if habit.save
      return render(status: 200, json: {
        habit: habit
        message: 'habit_update_successful'
      })
    end

    render(status: 500, json: {
      message: 'habit_update_error',
      errors: habit.errors.messages
    })
  end

  def destroy
    habit = current_user.habits.find(params[:id])
    habit.destroy

    if habit.destroyed?
      return render(status: 200, json: { message: 'habit_destroy_successful' })
    end

    render(status: 500, json: { message: 'habit_destroy_error' })
  end

  def update_habit_completed_for_date
    id, date, completed = habit_params.values_at :id, :date, :completed

    habit = current_user.habits.find_by_id(id)

    return render(status: 400, json: { message: 'habit_not_found' }) unless habit

    if completed
      habit.dates[date] = true
    else
      habit.dates.delete(date)
    end

    if habit.save
      return render(status: 200, json: {
        habit: habit,
        message: 'habit_update_successful'
      })
    end

    render(status: 500, json: {
      message: 'habit_update_error',
      errors: habit.errors.messages
    })
  end

  private

  def habit_params
    params.require(:habit).permit(:title, :date, :completed, :id)
  end

  # TODO: we can expose this using entity gem
  def habits_plus_info(timezone_offset)
    current_user.habits.sort do |a,b|
      a.title <=> b.title
    end.map do |habit|
      habit.as_json.merge(
        num_days_longest_streak: habit.num_days_longest_streak,
        num_days_current_streak: habit.num_days_current_streak(timezone_offset)
      )
    end
  end
end
