require 'rails_helper'

RSpec.describe Skill, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of(:name) }

  it 'has a valid factory' do
    user = create(:user)
    skill = build(:skill, user: user)
    expect(skill).to be_valid
  end
end
