class CreateHabits < ActiveRecord::Migration[5.2]
  def change
    create_table :habits do |t|
      t.string :title
      t.integer :user_id
      t.string :dates, array: true, default: '{}'

      t.timestamps
    end
  end
end
