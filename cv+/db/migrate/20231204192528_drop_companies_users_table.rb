class DropCompaniesUsersTable < ActiveRecord::Migration[7.0]
  def up
    drop_table :companies_users, if_exists: true
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
