# # spec/controllers/companies_controller_spec.rb
# require 'rails_helper'

# RSpec.describe CompaniesController, type: :controller do
#   let(:company) { create(:company) }
#   let(:valid_attributes) { attributes_for(:company) }
#   let(:invalid_attributes) { { name: '', email: '', password: '' } }

#   describe "DELETE #destroy_avatar" do
#     context "when company has an avatar" do
#       before do
#         company.avatar.attach(io: File.open(Rails.root.join('spec', 'support', 'test.png')), filename: 'test.png', content_type: 'image/png')
#       end

#       it "deletes the avatar" do
#         delete :destroy_avatar, params: { id: company.id }
#         company.reload
#         expect(company.avatar).not_to be_attached
#       end
#     end

#     context "when company does not have an avatar" do
#       it "returns an error" do
#         delete :destroy_avatar, params: { id: company.id }
#         expect(response).to have_http_status(:unprocessable_entity)
#       end
#     end
#   end

#   describe "POST #create" do
#     context "with valid params" do
#       it "creates a new Company" do
#         expect {
#           post :create, params: { company: valid_attributes }
#         }.to change(Company, :count).by(1)
#       end
#     end

#     context "with invalid params" do
#       it "does not create a new Company" do
#         expect {
#           post :create, params: { company: invalid_attributes }
#         }.not_to change(Company, :count)
#       end
#     end
#   end
# end
