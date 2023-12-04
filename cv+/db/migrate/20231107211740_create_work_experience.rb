class CreateWorkExperience < ActiveRecord::Migration[7.0]
  def change
    create_table :work_experiences do |t|
      t.string :name
      t.text :description
      t.date :start_date
      t.date :finish_date
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
