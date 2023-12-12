# == Schema Information
#
# Table name: work_experiences
#
#  id          :bigint           not null, primary key
#  description :text(65535)
#  finish_date :date
#  name        :string(255)
#  start_date  :date
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_work_experiences_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

# RSpec.describe Api::WorkExperiencesController, type: :controller do
#   describe 'GET #index' do
#     it 'returns a list of work experiences' do
#       FactoryBot.create(:work_experience)
#       get :index
#       expect(response).to have_http_status(:ok)
#       expect(JSON.parse(response.body)).not_to be_empty
#     end
#   end

#   describe 'GET #show' do
#     it 'returns a specific work experience' do
#       work_experience = FactoryBot.create(:work_experience)
#       get :show, params: { id: work_experience.id }
#       expect(response).to have_http_status(:ok)
#       expect(JSON.parse(response.body)['id']).to eq(work_experience.id)
#     end
#   end

#   describe 'POST #create' do
#     it 'creates a new work experience' do
#       work_experience_params = FactoryBot.attributes_for(:work_experience)
#       post :create, params: { work_experience: work_experience_params }
#       expect(response).to have_http_status(:created)
#       expect(JSON.parse(response.body)['name']).to eq(work_experience_params[:name])
#     end
#   end

#   describe 'PATCH #update' do
#     it 'updates an existing work experience' do
#       work_experience = FactoryBot.create(:work_experience)
#       new_name = 'New Name'
#       patch :update, params: { id: work_experience.id, work_experience: { name: new_name } }
#       expect(response).to have_http_status(:ok)
#       expect(JSON.parse(response.body)['name']).to eq(new_name)
#     end
#   end

#   describe 'DELETE #destroy' do
#     it 'deletes an existing work experience' do
#       work_experience = FactoryBot.create(:work_experience)
#       delete :destroy, params: { id: work_experience.id }
#       expect(response).to have_http_status(:no_content)
#       expect(WorkExperience.exists?(work_experience.id)).to be_falsey
#     end
#   end
# end
