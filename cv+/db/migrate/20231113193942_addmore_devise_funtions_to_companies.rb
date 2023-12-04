class AddmoreDeviseFuntionsToCompanies < ActiveRecord::Migration[7.0]
  def change
      # Trackable
    add_column :companies, :sign_in_count, :integer, default: 0, null: false
    add_column :companies, :current_sign_in_at, :datetime
    add_column :companies, :last_sign_in_at, :datetime
    add_column :companies, :current_sign_in_ip, :string
    add_column :companies, :last_sign_in_ip, :string

    # Confirmable
    add_column :companies, :confirmation_token, :string
    add_column :companies, :confirmed_at, :datetime
    add_column :companies, :confirmation_sent_at, :datetime
    add_column :companies, :unconfirmed_email, :string # Only if using reconfirmable

    # Lockable
    add_column :companies, :failed_attempts, :integer, default: 0, null: false # Only if lock strategy is :failed_attempts
    add_column :companies, :unlock_token, :string # Only if unlock strategy is :email or :both
    add_column :companies, :locked_at, :datetime

    add_index :companies, :confirmation_token, unique: true
    add_index :companies, :unlock_token, unique: true
  end
end
