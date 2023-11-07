class CreateProject < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
    t.string :name
    t.string :description
    t.string :url
      t.timestamps
    end
  end
end
