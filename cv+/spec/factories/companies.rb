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
# spec/factories/companies.rb
FactoryBot.define do
  factory :company do
    sequence(:name) { |n| "Company #{n}" }
    sequence(:email) { |n| "company#{n}@example.com" }
    password { 'password123' }
    password_confirmation { 'password123' }
    sequence(:jti) { |n| "jti#{n}" }
    sign_in_count { 1 }
    current_sign_in_at { Time.now }
    last_sign_in_at { Time.now }
    current_sign_in_ip { '127.0.0.1' }
    last_sign_in_ip { '127.0.0.1' }
    failed_attempts { 0 }
    # Add other attributes as needed
  end
end
