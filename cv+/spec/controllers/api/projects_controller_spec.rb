# spec/controllers/projects_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::ProjectsController, type: :controller do
  let(:user) { create(:user) }
  let(:valid_attributes) do
    {
      name: 'Test Project',
      description: 'This is a test project',
      url: 'http://example.com',
      user_id: user.id
    }
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      it 'creates a new Project' do
        expect {
          post :create, params: { project: valid_attributes }
        }.to change(Project, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(Project.last.name).to eq('Test Project')
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Project' do
        expect {
          post :create, params: { project: { name: nil, user_id: nil } }
        }.to change(Project, :count).by(0)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
