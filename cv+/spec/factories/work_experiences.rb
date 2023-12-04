
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
