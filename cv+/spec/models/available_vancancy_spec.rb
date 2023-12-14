require 'rails_helper'

RSpec.describe AvailableVacancy, type: :model do
  describe 'associations' do
    it { should belong_to(:company).required }
    it { should have_many(:requirements).dependent(:destroy) }
    it { should have_and_belong_to_many(:users) }
  end


end
