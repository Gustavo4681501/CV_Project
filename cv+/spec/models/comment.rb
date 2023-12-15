# spec/factories/comments.rb
RSpec.describe Skill, type: :model do
  it { should belong_to(:user) }

  it 'has a valid factory' do
    user = create(:user)
    skill = build(:skill, user: user)
    expect(skill).to be_valid
  end
end
