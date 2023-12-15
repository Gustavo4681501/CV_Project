class Api::RequirementsController < ApplicationController
    before_action :set_requirement, only: [:show, :update, :destroy]

    # GET /api/available_vacancies/:available_vacancy_id/requirements
    # Retrieves requirements associated with a specific available vacancy
    def index
        @requirements = AvailableVacancy.find(params[:available_vacancy_id]).requirements
        render json: @requirements
    end

    # POST /api/requirements
    # Creates a new requirement
    def create
        @requirement = Requirement.new(requirement_params)

        if @requirement.save
        render json: @requirement, status: :created
        else
        render json: @requirement.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/requirements/:id
    # Updates an existing requirement by its ID
    def update
        if @requirement.update(requirement_params)
        render json: @requirement
        else
        render json: @requirement.errors, status: :unprocessable_entity
        end
    end

    # DELETE /api/requirements/:id
    # Deletes a requirement by its ID
    def destroy
        @requirement.destroy
    end

    private

    # Sets the requirement for specific actions
    def set_requirement
        @requirement = Requirement.find(params[:id])
    end

    # Permitted parameters for a requirement
    def requirement_params
        params.require(:requirement).permit(:requirement, :available_vacancy_id)
    end
end
