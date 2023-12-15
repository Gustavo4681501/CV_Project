class Api::EducationsController < ApplicationController
    before_action :set_education, only: [:show, :update, :destroy]

    # GET /api/educations
    # Retrieves all educations
    def index
        @educations = Education.all
        render json: @educations
    end

    # GET /api/educations/:id
    # Retrieves a specific education by its ID
    def show
        render json: @education
    end

    # POST /api/educations
    # Creates a new education
    def create
        @education = Education.new(education_params)

        if @education.save
            render json: @education, status: :created
        else
            render json: @education.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /api/educations/:id
    # Updates an existing education by its ID
    def update
        if @education.update(education_params)
            render json: @education
        else
            render json: @education.errors, status: :unprocessable_entity
        end
    end

    # DELETE /api/educations/:id
    # Deletes an education by its ID
    def destroy
        @education.destroy
    end

    private

    # Sets the education for specific actions
    def set_education
        @education = Education.find(params[:id])
    end

    # Permitted parameters for an education
    def education_params
        params.require(:education).permit(:name, :institution_name, :location, :start_date, :finish_date, :user_id)
    end
end
