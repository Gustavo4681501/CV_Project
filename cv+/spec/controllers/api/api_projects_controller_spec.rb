
# require 'rails_helper'

# RSpec.describe Api::ProjectsController, type: :controller do
#   describe 'GET #index' do
#     it 'devuelve una lista de proyectos' do
#       project = Project.create(name: 'Proyecto 1', description: 'Descripción 1', url: 'https://ejemplo.com', user_id: 1)
#       get :index
#       expect(response).to have_http_status(:ok)
#       expect(JSON.parse(response.body)).to include(JSON.parse(project.to_json))
#     end
#   end
# end
#   describe 'GET #show' do
#     it 'devuelve un proyecto específico' do
#       project = Project.create(name: 'Proyecto 2', description: 'Descripción 2', url: 'https://ejemplo.com', user_id: 2)
#       get :show, params: { id: project.id }
#       expect(response).to have_http_status(:ok)
#       expect(JSON.parse(response.body)).to eq(JSON.parse(project.to_json))
#     end
#   end

#   describe 'POST #create' do
#     it 'crea un nuevo proyecto' do
#       project_params = { name: 'Nuevo Proyecto', description: 'Descripción', url: 'https://nuevoproyecto.com', user_id: 3 }
#       post :create, params: { project: project_params }
#       expect(response).to have_http_status(:created)
#       expect(JSON.parse(response.body)['name']).to eq(project_params[:name])
#     end
#   end

#   describe 'PATCH #update' do
#     it 'actualiza un proyecto existente' do
#       project = Project.create(name: 'Proyecto a actualizar', description: 'Descripción original', url: 'https://original.com', user_id: 4)
#       new_name = 'Nuevo nombre'
#       patch :update, params: { id: project.id, project: { name: new_name } }
#       expect(response).to have_http_status(:ok)
#       expect(JSON.parse(response.body)['name']).to eq(new_name)
#     end
#   end

#   describe 'DELETE #destroy' do
#     it 'elimina un proyecto existente' do
#       project = Project.create(name: 'Proyecto a eliminar', description: 'Descripción a eliminar', url: 'https://eliminar.com', user_id: 5)
#       delete :destroy, params: { id: project.id }
#       expect(response).to have_http_status(:no_content)
#       expect(Project.exists?(project.id)).to be_falsey
#     end
#   end
# end
