# == Schema Information
#
# Table name: educations
#
#  id               :bigint           not null, primary key
#  finish_date      :date
#  institution_name :string(255)
#  location         :string(255)
#  name             :string(255)
#  start_date       :date
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  user_id          :bigint           not null
#
# Indexes
#
#  index_educations_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class Education < ApplicationRecord
    belongs_to :user

end
