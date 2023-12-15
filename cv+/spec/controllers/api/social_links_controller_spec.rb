# spec/controllers/social_links_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::SocialLinksController, type: :controller do
    let(:user) { create(:user) }
    let(:valid_attributes) { { url: 'http://example.com', user_id: user.id } }

    describe 'POST #create' do
        context 'with valid parameters' do
        it 'creates a new SocialLink' do
            expect {
            post :create, params: { social_link: valid_attributes }
            }.to change(SocialLink, :count).by(1)

            expect(response).to have_http_status(:created)
            expect(SocialLink.last.url).to eq('http://example.com')
        end
        end

        context 'with invalid parameters' do
        it 'does not create a new SocialLink' do
            expect {
            post :create, params: { social_link: { url: nil, user_id: user.id } }
            }.to change(SocialLink, :count).by(0)

            expect(response).to have_http_status(:unprocessable_entity)
        end
        end
    end
end
