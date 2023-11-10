# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  last_name              :string(255)
#  name                   :string(255)
#  phone_number           :integer
#  photo                  :string(255)
#  registration_date      :date
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  role                   :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  has_many :comments
  has_many :curriculums
  has_many :educations
  has_many :projects
  has_many :skills
  has_many :social_links
  has_many :work_experiences
  has_and_belongs_to_many :companies


  # enum role: [:regular, :admin]

  # # Include default devise modules. Others available are:
  # # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise  :database_authenticatable, :registerable,
  #         :recoverable, :rememberable, :validatable
end
