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
class AvailableVacancy < ApplicationRecord
    belongs_to :company
    has_many :requirements, dependent: :destroy
    has_and_belongs_to_many :users
end
