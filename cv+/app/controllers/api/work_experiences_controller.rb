class Api::WorkExperiencesController < ApplicationController
    before_action :set_work_experience, only: [:show, :update, :destroy]

    # GET /api/work_experiences
    # Retrieves all work experiences
    def index
        @work_experiences = WorkExperience.all
        render json: @work_experiences
    end

    # GET /api/work_experiences/:id
    # Retrieves a specific work experience by its ID
    def show
        render json: @work_experience
    end

    # POST /api/work_experiences
    # Creates a new work experience
    def create
        @work_experience = WorkExperience.new(work_experience_params)

        if @work_experience.save
        render json: @work_experience, status: :created
        else
        render json: @work_experience.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/work_experiences/:id
    # Updates an existing work experience by its ID
    def update
        if @work_experience.update(work_experience_params)
        render json: @work_experience
        else
        render json: @work_experience.errors, status: :unprocessable_entity
        end
    end

    # DELETE /api/work_experiences/:id
    # Deletes a work experience by its ID
    def destroy
        @work_experience.destroy
    end

    private

    # Sets the work experience for specific actions
    def set_work_experience
        @work_experience = WorkExperience.find(params[:id])
    end

    # Permitted parameters for a work experience
    def work_experience_params
        params.require(:work_experience).permit(:name, :description, :start_date, :finish_date, :user_id)
    end
end
