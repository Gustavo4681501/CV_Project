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
FactoryBot.define do
  factory :work_experience do
    name { 'Ejemplo de experiencia laboral' }
    description { 'Descripción de la experiencia laboral' }
    start_date { Date.today - 1.year }
    finish_date { Date.today }
    user_id
    user
  end
end
