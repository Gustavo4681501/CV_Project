class Api::WorkExperiencesController < ApplicationController

    before_action :set_work_experiencie, only: [:show, :update, :destroy]

    def index
        @work_experiences = WorkExperience.all
        render json: @work_experiences
    end

    def show
        render json: @work_experience
    end

    def create
        @work_experience = WorkExperience.new(work_experience_params)

        if @work_experience.save
            render json: @work_experience, status: :created
        else
            render json: @work_experience.errors, status: :unprocessable_entity
        end
    end

    def update
        if @work_experience.update(work_experience_params)
            render json: @work_experience
        else
            render json: @work_experience.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @work_experience.destroy
    end

    private

    def set_work_experiencie
        @work_experience = WorkExperience.find(params[:id])
    end

    def work_experience_params
        params.require(:work_experiences).permit(:name, :description, :start_date, :finish_date, :user_id)
    end

end
