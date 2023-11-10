class CreateCompaniesUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :companies_users, id: false do |t|
      t.references :company
      t.references :user
    end

    add_index :companies_users, [:company_id, :user_id], unique: true
  end
end
