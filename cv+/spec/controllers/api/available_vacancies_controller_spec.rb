# # spec/controllers/api/available_vacancies_controller_spec.rb
# require 'rails_helper'

# RSpec.describe Api::AvailableVacanciesController, type: :controller do
#   let(:available_vacancy) { create(:available_vacancy) }
#   let(:requirement) { create(:requirement, available_vacancy: available_vacancy) }

#   # Existing tests...

#   describe "GET #show_requirements" do
#     it "returns a success response" do
#       get :show_requirements, params: { id: available_vacancy.id }
#       expect(response).to be_successful
#     end

#     it "returns the correct requirements for the vacancy" do
#       requirement
#       get :show_requirements, params: { id: available_vacancy.id }
#       expect(JSON.parse(response.body)).to include(JSON.parse(requirement.to_json))
#     end
#   end
# end
