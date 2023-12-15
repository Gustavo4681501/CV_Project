# spec/controllers/work_experiences_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::WorkExperiencesController, type: :controller do
    let(:user) { create(:user) }
    let(:valid_attributes) do
        {
        name: 'Software Developer',
        description: 'Developing software for clients',
        start_date: '2022-01-01',
        finish_date: '2026-01-01',
        user_id: user.id
        }
    end

    describe 'POST #create' do
        context 'with valid parameters' do
        it 'creates a new WorkExperience' do
            expect {
            post :create, params: { work_experience: valid_attributes }
            }.to change(WorkExperience, :count).by(1)

            expect(response).to have_http_status(:created)
            expect(WorkExperience.last.name).to eq('Software Developer')
        end
        end

        context 'with invalid parameters' do
            it 'does not create a new WorkExperience' do
              expect {
                post :create, params: { work_experience: { name: nil, description: nil, start_date: nil, finish_date: nil, user_id: nil } }
              }.to change(WorkExperience, :count).by(0)

              expect(response).to have_http_status(:unprocessable_entity)
            end
          end
    end
end
