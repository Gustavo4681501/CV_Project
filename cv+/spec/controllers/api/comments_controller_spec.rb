# # spec/controllers/comments_controller_spec.rb
# require 'rails_helper'

# RSpec.describe CommentsController, type: :controller do
#   let(:company) { create(:company) }
#   let(:valid_attributes) { { content: 'This is a comment', commentable_id: company.id, commentable_type: 'Company' } }
#   let(:invalid_attributes) { { content: '', commentable_id: company.id, commentable_type: 'Company' } }

#   describe "POST #create" do
#     context "with valid params" do
#       it "creates a new Comment" do
#         expect {
#           post :create, params: { comment: valid_attributes }
#         }.to change(Comment, :count).by(1)
#       end

#       it "renders a JSON response with the new comment" do
#         post :create, params: { comment: valid_attributes }
#         expect(response).to have_http_status(:created)
#         expect(response.content_type).to eq('application/json')
#       end
#     end

#     context "with invalid params" do
#       it "renders a JSON response with errors for the new comment" do
#         post :create, params: { comment: invalid_attributes }
#         expect(response).to have_http_status(:unprocessable_entity)
#         expect(response.content_type).to eq('application/json')
#       end
#     end
#   end

#   describe "PATCH #update" do
#     let(:comment) { create(:comment, commentable: company) }

#     context "with valid params" do
#       let(:new_attributes) { { content: 'This is a new comment' } }

#       it "updates the requested comment" do
#         patch :update, params: { id: comment.id, comment: new_attributes }
#         comment.reload
#         expect(comment.content).to eq('This is a new comment')
#       end

#       it "renders a JSON response with the comment" do
#         patch :update, params: { id: comment.id, comment: new_attributes }
#         expect(response).to have_http_status(:ok)
#         expect(response.content_type).to eq('application/json')
#       end
#     end

#     context "with invalid params" do
#       it "renders a JSON response with errors for the comment" do
#         patch :update, params: { id: comment.id, comment: invalid_attributes }
#         expect(response).to have_http_status(:unprocessable_entity)
#         expect(response.content_type).to eq('application/json')
#       end
#     end
#   end
# end
