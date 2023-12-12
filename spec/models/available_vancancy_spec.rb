# require 'rails_helper'
# RSpec.describe AvailableVacancy, type: :model do
#     describe 'associations' do
#       it { should belong_to(:company) }
#       it { should have_many(:requirements).dependent(:destroy) }
#     end


# end

#   describe 'validations' do
#     let(:available_vacancy) { AvailableVacancy.new }

#     it 'validates presence of name' do
#       available_vacancy.description = 'Sample description'
#       available_vacancy.valid?
#       expect(available_vacancy.errors[:name]).to include("can't be blank")
#     end

#     it 'validates presence of description' do
#       available_vacancy.name = 'Sample name'
#       available_vacancy.valid?
#       expect(available_vacancy.errors[:description]).to include("can't be blank")
#     end
#   end

#   describe 'destruction of associated records' do
#     let(:available_vacancy) { AvailableVacancy.create(name: 'Vacancy', description: 'Description') }

#     it 'destroys associated requirements when destroyed' do
#       requirement = Requirement.create(requirement: 'Requirement description', available_vacancy_id: available_vacancy.id)

#       expect { available_vacancy.destroy }.to change { Requirement.count }.by(-1)
#     end
