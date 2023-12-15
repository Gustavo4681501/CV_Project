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
# #
# require 'rails_helper'

# RSpec.describe User, type: :model do
#     describe 'associations' do
#         it { should have_many(:comments).dependent(:destroy) }
#         it { should have_many(:curriculums).dependent(:destroy) }
#         it { should have_many(:educations).dependent(:destroy) }
#         it { should have_many(:projects).dependent(:destroy) }
#         it { should have_many(:skills).dependent(:destroy) }
#         it { should have_many(:social_links).dependent(:destroy) }
#         it { should have_many(:work_experiences).dependent(:destroy) }
#         it { should have_and_belong_to_many(:available_vacancies).dependent(:destroy) }
#         it { should have_many(:attachments).dependent(:destroy) }
#         it { should have_many(:blobs).through(:attachments) }
#     end

#     describe 'validations' do
#         it { should validate_presence_of(:name) }
#         it { should validate_presence_of(:last_name) }
#         it { should validate_presence_of(:encrypted_password) }
#         it { should validate_presence_of(:jti) }
#         it { should validate_presence_of(:email) }
#         it { should validate_presence_of(:sign_in_count) }
#         it { should validate_presence_of(:created_at) }
#         it { should validate_presence_of(:updated_at) }
#         it { should validate_presence_of(:sign_in_count) }
#         it { should validate_presence_of(:current_sign_in_at) }
#         it { should validate_presence_of(:last_sign_in_at) }
#         it { should validate_presence_of(:current_sign_in_ip) }
#         it { should validate_presence_of(:last_sign_in_ip) }
#         it { should validate_presence_of(:failed_attempts) }
#         end
# end
