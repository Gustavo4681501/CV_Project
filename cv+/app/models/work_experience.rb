# == Schema Information
#
# Table name: work_experiences
#
#  id          :bigint           not null, primary key
#  description :text(65535)
#  finish_date :date
#  name        :string(255)
#  start_date  :date
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_work_experiences_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class WorkExperience < ApplicationRecord
    belongs_to :user

    # Validation
    validates :name, :description, :start_date, :finish_date, presence: true
end
