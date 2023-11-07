class CreateCompany < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :gmail
      t.string :description
      t.integer :phone_number
      t.timestamps
    end
  end
end
