
# require 'rails_helper'

# RSpec.describe Api::UsersController, type: :controller do
#     describe 'GET #index' do
#       it 'returns a list of users' do
#         user1 = User.create(name: 'name', email: 'name@gmail.com')
#         user2 = User.create(name: nil, email: 'valebrenes2003@gmail.com')

#         get :index
#         expect(response).to have_http_status(:ok)
#         expect(JSON.parse(response.body)).to match_array([user1.as_json, user2.as_json])
#       end
#     end

#     describe 'GET #show' do
#       it 'returns a specific user' do
#         user = User.create(name: 'John Doe', email: 'john@example.com')

#         get :show, params: { id: user.id }
#         expect(response).to have_http_status(:ok)
#         expect(JSON.parse(response.body)['id']).to eq(user.id)
#       end
#     end

#     describe 'POST #create' do
#       it 'creates a new user with valid attributes' do
#         valid_attributes = { name: 'New User', email: 'newuser@example.com', encrypted_password: 'password' }

#         post :create, params: { user: valid_attributes }
#         expect(response).to have_http_status(:created)
#         expect(User.last.email).to eq('newuser@example.com')
#       end

#       it 'does not create a user with invalid attributes' do
#         invalid_attributes = { name: 'Invalid User' } # Add invalid attributes

#         post :create, params: { user: invalid_attributes }
#         expect(response).to have_http_status(:unprocessable_entity)
#         expect(User.last).to be_nil
#       end
#     end

#     describe 'PATCH #update' do
#       it 'updates an existing user with valid attributes' do
#         user = User.create(name: 'Old Name')

#         patch :update, params: { id: user.id, user: { name: 'Updated Name' } }
#         expect(response).to have_http_status(:ok)
#         expect(User.find(user.id).name).to eq('Updated Name')
#       end

#       it 'does not update a user with invalid attributes' do
#         user = User.create(name: 'Old Name')

#         patch :update, params: { id: user.id, user: { email: nil } } # Add invalid update params
#         expect(response).to have_http_status(:unprocessable_entity)
#         expect(User.find(user.id).email).not_to be_nil
#       end
#     end

#     describe 'DELETE #destroy' do
#       it 'deletes an existing user' do
#         user = User.create(name: 'John Doe', email: 'john@example.com')

#         delete :destroy, params: { id: user.id }
#         expect(response).to have_http_status(:no_content)
#         expect(User.find_by(id: user.id)).to be_nil
#       end
#     end
#   end
