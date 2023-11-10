# == Schema Information
#
# Table name: companies
#
#  id                     :bigint           not null, primary key
#  description            :text(65535)
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  name                   :string(255)
#  phone_number           :integer
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_companies_on_email                 (email) UNIQUE
#  index_companies_on_reset_password_token  (reset_password_token) UNIQUE
#
class Company < ApplicationRecord
    has_many :available_vacancies
    has_and_belongs_to_many :users


    # # Include default devise modules. Others available are:
    # # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    # devise  :database_authenticatable, :registerable,
    #         :recoverable, :rememberable, :validatable
end
