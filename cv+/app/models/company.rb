
# == Schema Information
#
# Table name: companies
#
#  id                     :bigint           not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string(255)
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string(255)
#  description            :text(65535)
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  failed_attempts        :integer          default(0), not null
#  jti                    :string(255)      not null
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string(255)
#  locked_at              :datetime
#  name                   :string(255)
#  phone_number           :integer
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  sign_in_count          :integer          default(0), not null
#  unconfirmed_email      :string(255)
#  unlock_token           :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_companies_on_confirmation_token    (confirmation_token) UNIQUE
#  index_companies_on_email                 (email) UNIQUE
#  index_companies_on_reset_password_token  (reset_password_token) UNIQUE
#  index_companies_on_unlock_token          (unlock_token) UNIQUE
#
class Company < ApplicationRecord
    # Devise Configuration
    include Devise::JWT::RevocationStrategies::JTIMatcher
    devise :database_authenticatable, :registerable,
            :recoverable, :rememberable, :trackable, :validatable,
            :omniauthable, :jwt_authenticatable,
            jwt_revocation_strategy: JwtDenylist

    #Associations
    has_many :available_vacancies
    has_many :comments, as: :commentable

    # Active Storage Attachment
    has_one_attached :avatar

    # Validations
    validates :name, :email, :encrypted_password, :encrypted_password, :jti, :sign_in_count,
    :current_sign_in_at, :current_sign_in_ip, :last_sign_in_at, :last_sign_in_ip,
    :failed_attempts, presence: true
end
