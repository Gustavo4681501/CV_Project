require 'rails_helper'

RSpec.describe Requirement, type: :model do
    let(:available_vacancy) { create(:available_vacancy) }
    let(:valid_attributes) do
        {
        requirement: 'Must know Ruby on Rails',
        available_vacancy: available_vacancy
        }
    end

    it 'is valid with valid attributes' do
        requirement = Requirement.new(valid_attributes)
        expect(requirement).to be_valid
    end

    it 'is not valid without a requirement' do
        requirement = Requirement.new(valid_attributes.except(:requirement))
        expect(requirement).not_to be_valid
    end

    it 'is not valid without an available_vacancy' do
        requirement = Requirement.new(valid_attributes.except(:available_vacancy))
        expect(requirement).not_to be_valid
    end
end
