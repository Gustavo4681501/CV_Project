class AddCompanyIdToComments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :company_id, :integer
    add_index :comments, :company_id


    change_column_null :comments, :company_id, true
    change_column_null :comments, :user_id, true
  end
end
