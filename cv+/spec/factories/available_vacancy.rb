FactoryBot.define do
  factory :available_vacancy do

    name { "Vacancy Name" }
    description { "Vacancy Description" }
    association :company, factory: :company
  end
end
