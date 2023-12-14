# == Schema Information
#
# Table name: curriculums
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_curriculums_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Curriculum, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
  end
end
