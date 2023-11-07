class InformationToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :name, :string
    add_column :users, :last_name, :string
    add_column :users, :registration_date, :date
    add_column :users, :photo, :string
    add_column :users, :phone_number, :integer
  end
end
