# == Schema Information
#
# Table name: social_links
#
#  id         :bigint           not null, primary key
#  url        :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_social_links_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class SocialLink < ApplicationRecord
    belongs_to :user
end
