# == Schema Information
#
# Table name: requirements
#
#  id                   :bigint           not null, primary key
#  requirement          :string(255)
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  available_vacancy_id :bigint           not null
#
# Indexes
#
#  index_requirements_on_available_vacancy_id  (available_vacancy_id)
#
# Foreign Keys
#
#  fk_rails_...  (available_vacancy_id => available_vacancies.id)
#
# spec/factories/requirements.rb
FactoryBot.define do
  factory :requirement do
    requirement { "Must know Ruby on Rails" }
    association :available_vacancy
  end
end
