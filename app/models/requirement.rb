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
class Requirement < ApplicationRecord
    belongs_to :available_vacancy
end
