class CreateComment < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.text :body
      t.datetime :date
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
