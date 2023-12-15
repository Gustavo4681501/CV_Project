
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
