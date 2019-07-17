class ChangeDatesToJsonOfTableHabits < ActiveRecord::Migration[5.2]
  def change
    remove_column :habits, :dates
    add_column :habits, :dates, :json
  end
end
