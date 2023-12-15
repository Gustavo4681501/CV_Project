# spec/controllers/educations_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::EducationsController, type: :controller do
  let(:user) { create(:user) }
  let(:valid_attributes) do
    {
      name: 'Computer Science',
      institution_name: 'Example University',
      location: 'Example City',
      start_date: '2022-01-01',
      finish_date: '2026-01-01',
      user_id: user.id
    }
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      it 'creates a new Education' do
        expect {
          post :create, params: { education: valid_attributes }
        }.to change(Education, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(Education.last.name).to eq('Computer Science')
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Education' do
        expect {
          post :create, params: { education: { name: nil, user_id: user.id } }
        }.to change(Education, :count).by(0)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
