# spec/controllers/api/skills_controller_spec.rb
require 'rails_helper'

RSpec.describe Api::SkillsController, type: :controller do
    let(:user) { create(:user) }
    let(:skill) { create(:skill, user: user) }

    describe "GET #index" do
        it "returns a success response" do
        get :index
        expect(response).to be_successful
        end
    end

    describe "GET #show" do
        it "returns a success response" do
        get :show, params: { id: skill.id }
        expect(response).to be_successful
        end
    end

    describe "POST #create" do
        it "creates a new Skill" do
        expect {
            post :create, params: { skill: { name: 'New Skill', user_id: user.id } }
        }.to change(Skill, :count).by(1)
        end
    end

    describe "PUT #update" do
        it "updates the requested skill" do
        put :update, params: { id: skill.id, skill: { name: 'Updated Skill' } }
        skill.reload
        expect(skill.name).to eq('Updated Skill')
        end
    end

    describe "DELETE #destroy" do
        it "destroys the requested skill" do
        skill
        expect {
            delete :destroy, params: { id: skill.id }
        }.to change(Skill, :count).by(-1)
        end
    end
end
