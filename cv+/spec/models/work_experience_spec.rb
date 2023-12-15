RSpec.describe WorkExperience, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:start_date) }
  it { should validate_presence_of(:finish_date) }

  it 'has a valid factory' do
    user = create(:user)
    work_experience = build(:work_experience, user: user)
    expect(work_experience).to be_valid
  end
end
