class ProvideDefaultForDatesOfHabits < ActiveRecord::Migration[5.2]
  def change
    change_column :habits, :dates, :json, default: {}
  end
end
