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
require 'rails_helper'

RSpec.describe Education, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:institution_name) }
    it { should validate_presence_of(:start_date) }
    it { should validate_presence_of(:finish_date) }
    it { should validate_presence_of(:location) }
  end
end
