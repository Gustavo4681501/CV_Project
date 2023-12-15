# == Schema Information
#
# Table name: educations
#
#  id               :bigint           not null, primary key
#  finish_date      :date
#  institution_name :string(255)
#  location         :string(255)
#  name             :string(255)
#  start_date       :date
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :bigint           not null
#
# Indexes
#
#  index_educations_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
# spec/factories/educations.rb
FactoryBot.define do
  factory :education do
    name { 'Computer Science' }
    institution_name { 'Example University' }
    location { 'Example City' }
    start_date { '2022-01-01' }
    finish_date { '2026-01-01' }
    user
  end
end
