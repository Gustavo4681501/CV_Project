
FactoryBot.define do
  factory :requirement do
    requirement { "Requirement Description" }
    available_vacancy_id
    association :available_vacancy
  end
end
