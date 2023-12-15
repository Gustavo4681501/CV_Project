# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string(255)
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string(255)
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  failed_attempts        :integer          default(0), not null
#  jti                    :string(255)
#  last_name              :string(255)
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string(255)
#  locked_at              :datetime
#  name                   :string(255)
#  phone_number           :integer
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  role                   :integer
#  sign_in_count          :integer          default(0), not null
#  unconfirmed_email      :string(255)
#  unlock_token           :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_jti                   (jti)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_unlock_token          (unlock_token) UNIQUE
#
# spec/factories/users.rb
FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "Test User #{n}" }
    sequence(:last_name) { |n| "Last Name #{n}" }
    sequence(:phone_number) { |n| "123456#{n}" }
    sequence(:email) { |n| "test#{n}@example.com" }
    sequence(:jti) { |n| "jti#{n}" }
    password { 'password123' }
    encrypted_password { 'password123' }
    created_at { Time.now }
    updated_at { Time.now }
    current_sign_in_at { Time.now }
    last_sign_in_at { Time.now }
    current_sign_in_ip { '127.0.0.1' }
    last_sign_in_ip { '127.0.0.1' }
    # Añade otros atributos según sea necesario
  end
end