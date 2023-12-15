# == Schema Information
#
# Table name: work_experiences
#
#  id          :bigint           not null, primary key
#  description :text(65535)
#  finish_date :date
#  name        :string(255)
#  start_date  :date
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_work_experiences_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
# spec/factories/work_experiences.rb
FactoryBot.define do
  factory :work_experience do
    name { 'Software Developer' }
    description { 'Example descrpition' }
    start_date { '2022-01-01' }
    finish_date { '2026-01-01' }
    user
  end
end
