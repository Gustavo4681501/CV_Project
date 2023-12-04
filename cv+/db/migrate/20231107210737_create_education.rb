class CreateEducation < ActiveRecord::Migration[7.0]
  def change
    create_table :educations do |t|
      t.string :name
      t.string :institution_name
      t.string :location
      t.date :start_date
      t.date :finish_date
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
