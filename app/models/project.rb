# == Schema Information
#
# Table name: projects
#
#  id          :bigint           not null, primary key
#  description :text(65535)
#  name        :string(255)
#  url         :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_projects_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Project < ApplicationRecord
    belongs_to :user
end
