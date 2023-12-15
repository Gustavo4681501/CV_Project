# == Schema Information
#
# Table name: available_vacancies
#
#  id          :bigint           not null, primary key
#  description :text(65535)
#  name        :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  company_id  :bigint           not null
#
# Indexes
#
#  index_available_vacancies_on_company_id  (company_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#
# spec/factories/available_vacancies.rb
FactoryBot.define do
  factory :available_vacancy do
    sequence(:name) { |n| "Vacancy Title #{n}" }
    sequence(:description) { |n| "Vacancy Description #{n}" }
    association :company

  end
end
