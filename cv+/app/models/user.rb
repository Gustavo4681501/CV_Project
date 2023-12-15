# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  confirmation_sent_at   :datetime
#  confirmation_token     :string(255)
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string(255)
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  failed_attempts        :integer          default(0), not null
#  jti                    :string(255)
#  last_name              :string(255)
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string(255)
#  locked_at              :datetime
#  name                   :string(255)
#  phone_number           :integer
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string(255)
#  role                   :integer
#  sign_in_count          :integer          default(0), not null
#  unconfirmed_email      :string(255)
#  unlock_token           :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_jti                   (jti)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_unlock_token          (unlock_token) UNIQUE
#
class User < ApplicationRecord
        # Devise Configuration
        include Devise::JWT::RevocationStrategies::JTIMatcher
        devise :database_authenticatable, :registerable,
                :recoverable, :rememberable, :trackable, :validatable,
                :omniauthable, :jwt_authenticatable,
                jwt_revocation_strategy: JwtDenylist

        # Associations
        has_many :comments, as: :commentable, dependent: :destroy
        has_many :curriculums, dependent: :destroy
        has_many :educations, dependent: :destroy
        has_many :projects, dependent: :destroy
        has_many :skills, dependent: :destroy
        has_many :social_links, dependent: :destroy
        has_many :work_experiences, dependent: :destroy
        has_and_belongs_to_many :available_vacancies, dependent: :destroy

        # Active Storage associations
        has_one_attached :avatar
        has_many :attachments, as: :record, class_name: "ActiveStorage::Attachment", dependent: :destroy
        has_many :blobs, through: :attachments, class_name: "ActiveStorage::Blob"

end
