class Habit < ApplicationRecord

  validates :title, presence: true, uniqueness: { scope: :user_id }
  validates :user_id, presence: true

  belongs_to :user

  def num_days_current_streak(timezone_offset = '+0')
    return 0 if dates.empty?

    sorted_dates = dates.keys.sort
    cur_date = to_date_obj(sorted_dates.pop)

    today = DateTime.now.utc.to_datetime.new_offset(timezone_offset).to_date

    return 0 if cur_date != today

    cur_streak = 1

    while !sorted_dates.empty?
      prev_date = to_date_obj(sorted_dates.pop)

      if prev_date == cur_date - 1
        cur_streak += 1
      else
        break
      end

      cur_date = prev_date
    end

    cur_streak
  end

  def num_days_longest_streak
    return 0 if dates.empty?

    return 1 if dates.length == 1

    max = 1
    cur_streak = 1

    sorted_dates = dates.keys.sort
    cur_date = to_date_obj(sorted_dates.pop)

    while !sorted_dates.empty?
      prev_date = to_date_obj(sorted_dates.pop)

      if prev_date == cur_date - 1
        cur_streak += 1

        if cur_streak > max
          max = cur_streak
        end
      else
        cur_streak = 1
      end

      cur_date = prev_date
    end

    max
  end

  private

  def to_date_obj(str)
    arr = str.split('-').map { |el| el.to_i }
    Date.new(arr[0], arr[1], arr[2])
  end
end
