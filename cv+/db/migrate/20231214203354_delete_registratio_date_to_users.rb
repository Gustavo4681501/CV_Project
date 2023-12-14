class DeleteRegistratioDateToUsers < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :registration_date, :date
  end
end
