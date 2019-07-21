class Habit < ApplicationRecord

  validates :title, presence: true, uniqueness: true
  validates :user_id, presence: true

  belongs_to :user

  def num_days_of_longest_streak
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
