# spec/factories/projects.rb
require 'rails_helper'

RSpec.describe Project, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:url) }

  it 'has a valid factory' do
    project = build(:project)
    expect(project).to be_valid
  end
end
