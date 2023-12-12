

# require 'rails_helper'

# RSpec.describe Api::RequirementsController, type: :controller do
#   describe 'GET #index' do
#     let(:available_vacancy) { create(:available_vacancy) }
#     let!(:requirement) { create(:requirement, available_vacancy: available_vacancy) }

#     it 'returns a list of requirements for a specific available_vacancy' do
#       get :index, params: { available_vacancy_id: available_vacancy.id }
#       expect(response).to have_http_status(:success)
#       expect(JSON.parse(response.body)).to eq([requirement.as_json])
#     end

#     it 'returns 404 if available_vacancy is not found' do
#       get :index, params: { available_vacancy_id: 'invalid_id' }
#       expect(response).to have_http_status(:not_found)
#     end
#   end

#   describe 'POST #create' do
#     let(:available_vacancy) { create(:available_vacancy) }

#     it 'creates a new requirement' do
#       expect do
#         post :create, params: { requirement: { requirement: 'Some requirement', available_vacancy_id: available_vacancy.id } }
#       end.to change(Requirement, :count).by(1)
#       expect(response).to have_http_status(:created)
#     end

#     it 'returns unprocessable_entity if requirement creation fails' do
#       post :create, params: { requirement: { requirement: '', available_vacancy_id: available_vacancy.id } }
#       expect(response).to have_http_status(:unprocessable_entity)
#     end
#   end

#   describe 'PATCH #update' do
#     let!(:requirement) { create(:requirement) }

#     it 'updates an existing requirement' do
#       patch :update, params: { id: requirement.id, requirement: { requirement: 'Updated requirement' } }
#       expect(response).to have_http_status(:success)
#       requirement.reload
#       expect(requirement.requirement).to eq('Updated requirement')
#     end

#     it 'returns unprocessable_entity if requirement update fails' do
#       patch :update, params: { id: requirement.id, requirement: { requirement: '' } }
#       expect(response).to have_http_status(:unprocessable_entity)
#     end
#   end

#   describe 'DELETE #destroy' do
#     let!(:requirement) { create(:requirement) }

#     it 'deletes an existing requirement' do
#       expect do
#         delete :destroy, params: { id: requirement.id }
#       end.to change(Requirement, :count).by(-1)
#       expect(response).to have_http_status(:no_content)
#     end
#   end
# end
