class CreateWorkExperience < ActiveRecord::Migration[7.0]
  def change
    create_table :work_experiences do |t|
      t.string :experience
      t.string :description
      t.date :start_date
      t.date :finish_date
      t.timestamps
    end
  end
end
