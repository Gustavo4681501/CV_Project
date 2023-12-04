class Api::RequirementsController < ApplicationController

    before_action :set_requirement, only: [:show, :update, :destroy]

    def index
        @requirements = AvailableVacancy.find(params[:available_vacancy_id]).requirements
        render json: @requirements
    end

    def create
        @requirement = Requirement.new(requirement_params)

        if @requirement.save
            render json: @requirement, status: :created
        else
            render json: @requirement.errors, status: :unprocessable_entity
        end
    end

    def update
        if @requirement.update(requirement_params)
            render json: @requirement
        else
            render json: @requirement.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @requirement.destroy
    end

    private

    def set_requirement
        @requirement = Requirement.find(params[:id])
    end

    def requirement_params
        params.require(:requirement).permit(:requirement, :available_vacancy_id)
    end

end
