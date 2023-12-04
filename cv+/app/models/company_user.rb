# == Schema Information
#
# Table name: user_companies
#
#  company_id :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_user_companies_on_company_id              (company_id)
#  index_user_companies_on_user_id                 (user_id)
#  index_user_companies_on_user_id_and_company_id  (user_id,company_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (user_id => users.id)
#
class CompanyUser < ApplicationRecord
    belongs_to :user
    belongs_to :company
end
