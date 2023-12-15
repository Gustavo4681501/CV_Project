# spec/models/social_link_spec.rb
require 'rails_helper'

RSpec.describe SocialLink, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of(:url) }

  it 'has a valid factory' do
    user = create(:user)
    social_link = build(:social_link, user: user)
    expect(social_link).to be_valid
  end
end
